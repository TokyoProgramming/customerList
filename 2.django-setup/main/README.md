# Setting Up a Django Crud Project in Windows

### 1. Django first set up
#### 1. basic set up

```
mkdir django-project
cd django-project
```

```
 pip install virtualenv
 virtualenv env
./env/Scripts/activate
```

```
pip install Django, django-environ, psycopg2
(env) ..> django-admin startproject main
(env) ..> cd main
(env) ...\main> mkdir templates, static, media
(env) ...\main> type nul > .gitignore, .env
```


### 2. settings.py

#### 1. initial import

```
from pathlib import Path
import os
import environ

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Initialise environment variables
env = environ.Env()
env.read_env(os.path.join(BASE_DIR, '.env'))
```

#### .env

```
SECRET_KEY=yourKey
DATABASE_NAME=yourDatabaseName
DATABASE_USER=yourDatabaseUser
DATABASE_PASS=yourDatabasePassword
DATABASE_HOST=yourHOST
DATABASE_PORT=yourPORT
```

```
SECRET_KEY = env('SECRET_KEY')
```

#### 2. templates

```
TEMPLATES = [
    {
        'BACKEND': ...,
        'DIRS': [os.path.join(BASE_DIR ,'templates')],
        'APP_DIRS': ...,
        'OPTIONS': {
			...
            ],
        },
    },
]
```

#### 4. database



```
DATABASES = {
'default': {
    'ENGINE': 'django.db.backends.postgresql_psycopg2',
    'NAME':  env('DATABASE_NAME'),
    'USER': env('DATABASE_USER'),
    'PASSWORD': env('DATABASE_PASS'),
    'HOST': env('DATABASE_HOST'),
    'PORT': env('DATABASE_PORT'),
    }
}
```

```
python manage.py makemigrations
python manage.py migrate

python manage.py createsuperuser
```

#### 5. Static files(CSS, JavaScript, Images)

```settings.py
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR ,'static')
]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

```

```main/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', include('customer.urls')) <!-- add this later -->
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

```

#### 6. gitignore

```
# from gitignore.io

### Django ###
*.log
*.pot
*.pyc
__pycache__/
local_settings.py
db.sqlite3
db.sqlite3-journal
/media
venv
/static
.env
```

### 3. start First App

#### 1. create app

```
python manage.py startapp customer
```

#### 2. add to app to settings.py

``` main/settings.py
# Application definition
INSTALLED_APPS = [
    ...,
    'customer',
]
```

#### 3. views.py

```
from django.http import 
from django.shortcuts import render

def index(request):
    return render(request, 'index.html', {})
```

#### 4. urls.py

```

from django.urls import path, include
from . import views
# from .views import customerList

urlpatterns = [
    path('', views.index, name='index'),
    # path('', customerList.as_view(), name='index'),
]
```


#### 5. templates

```
{% extends 'base.html' %} 
{% block content %}
write code here
{% endblock %}
```

#### 6. models

```
from django.db import models

class Customer(models.Model):
    name     = models.CharField(max_length=20)
    email    = models.EmailField()
    location = models.CharField(max_length=20)
    age      = models.IntegerField()

    def __str__(self):
        return self.name

```

```
admin.py

from django.contrib import admin
from .models import Customer

admin.site.register(Customer)
```



### 4. Create Crud App

#### 1. views.py


##### 1. list and post view

```
from django.views.generic import View
from .models import Customer

class customerList(View):
    def post(self, request):
        if request.method == 'POST':
            name  = request.POST.get('name')
            email  = request.POST.get('email')
            location  = request.POST.get('location')
            age  = request.POST.get('age')
            
            Customer.objects.create(
                name = name,
                email = email,
                location = location,
                age = age
            )
            
            return redirect('/')
            
    def get(self, request):
        context = {}
        context['customers'] = Customer.objects.all()
        return render(request, 'index.html', context)
    

```


##### 2. update

```
def update(request,pk):
        
    if request.method == 'GET':

        obj = get_object_or_404(Customer, pk = pk)
        context = {}
        context['customer'] = obj
        context['customers'] = Customer.objects.all()

        return render(request, 'index.html', context)
        
    elif request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        location = request.POST.get('location')
        age = request.POST.get('age')
        
        obj = get_object_or_404(Customer, pk=pk)
            
        obj.name = name
        obj.email = email
        obj.location = location
        obj.age = age
            
        obj.save()
            
        return redirect('/')
        
    return
```

##### 3. delete

```
def delete(request, pk):
    if request.method == 'GET':
        obj = get_object_or_404(Customer, pk=pk)
        obj.delete()
        return redirect('/')
    return
```

#### 2. urls.py

```
from django.urls import path, include
from . import views
from .views import customerList

urlpatterns = [
    # path('', views.index, name='index'),
    path('', customerList.as_view(), name='index'),
    path('update/<int:pk>', views.update, name='update'),
    path('delete/<int:pk>', views.delete, name='delete'),
]

```


#### 3. template
##### 1. form

```
{% block content %}

        ...

<form  method="POST"> 
  {% csrf_token %}
                ...
    <label for="name">Name</label>
    <input  type="text" name='name' />
                ...
    <label for="email">Email</label>
    <input type="email" name='email'/>
                ...
    <label for="location">Location</label>
    <input type="text" name='location' />
                ...
    <label for="age">Age</label>
    <input type="number"  name='age' />
                ...
    <input type="submit" value="Save" />

</form>

<table>
    ...
</table>

        ...

{% endblock %}

```

##### 2. table

```
<table>
  <tbody>
    {% for customer in customers %}
		<tr>
		  <td name="name">{{customer.name}}</td>
		  <td >{{customer.email}}</td>
		  <td>{{customer.location}}</td>
		  <td>{{customer.age}}</td>
		  <td>
        <button>
          <a href="{% url 'delete' pk=customer.id %}">Delete</a>
        </button>
		  </td> 
		  <td>
			<button>
        <a href="{% url 'update' pk=customer.id %}">Update</a>
			</button>
		 </td>
		</tr>
	{% endfor %}
  </tbody>
</table>

```

##### 3. index.html full code


```
{% extends 'base.html' %} 
{% block content %}
<div class="container">
<h1>Customer List</h1>
{% if customer %}
<form id="add-customer-form" method="POST"> 
  {% csrf_token %}
  <div class="row">
  <div class="six columns">
    <label for="name">Name</label>
    <input class="u-full-width" type="text" id="name" name='name' value={{customer.name}} />
  </div>
  <div class="six columns">
    <label for="email">Email</label>
    <input
    class="u-full-width"
    type="email"
    id="email"
    name='email'
    value={{customer.email}}
    />
  </div>
  </div>
  <div class="row">
  <div class="eight columns">
    <label for="location">Location</label>
    <input
    class="u-full-width"
    type="text"
    id="location"
    name='location'
    value={{customer.location}}
    />
  </div>
  <div class="four columns">
    <label for="age">Age</label>
    <input type="number" id="age" name='age' value={{customer.age}} />
  </div>
  </div>
  <div class="submit">
  <input class="u-full-width" data-id='submitForm' type="submit" value="Update" />
  </div>
</form>
{% else %}
<form id="add-customer-form" method="POST"> 
  {% csrf_token %}
  <div class="row">
  <div class="six columns">
    <label for="name">Name</label>
    <input class="u-full-width" type="text" id="name" name='name' />
  </div>
  <div class="six columns">
    <label for="email">Email</label>
    <input
    class="u-full-width"
    type="email"
    id="email"
    name='email'
    />
  </div>
  </div>
  <div class="row">
  <div class="eight columns">
    <label for="location">Location</label>
    <input
    class="u-full-width"
    type="text"
    id="location"
    name='location'
    />
  </div>
  <div class="four columns">
    <label for="age">Age</label>
    <input type="number" id="age"  name='age' />
  </div>
  </div>
  <div class="submit">
  <input class="u-full-width" data-id='submitForm' type="submit" value="Save" />
  </div>
</form>
{% endif %}
<table class="u-full-width">
  <thead>
    {% if customers %}
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Age</th>
      <th>Location</th>
      <th>Delete</th>
      <th>Update</th>
    </tr>
    {% elif customer %}
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Age</th>
      <th>Location</th>
      <th>Delete</th>
      <th>Update</th>
    </tr>
    {% else %}
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Age</th>
      <th>Location</th>

    </tr>
    {% endif %}
  </thead>

  <tbody id="customer-list">
    {% for customer in customers %}
		<tr data-id ="customer-{{customer.id}}" >
		  <td data-id='customerName{{customer.id}}' name="name">{{customer.name}}</td>
		  <td data-id='customerEmail{{customer.id}}'>{{customer.email}}</td>
		  <td data-id='customerLocation{{customer.id}}'>{{customer.location}}</td>
		  <td data-id='customerAge{{customer.id}}'>{{customer.age}}</td>
		  <td>
        <button>
          <a href="{% url 'delete' pk=customer.id %}">Delete</a>
        </button>
		  </td> 
		  <td>
			<button>
        <a href="{% url 'update' pk=customer.id %}">Update</a>
			</button>
		 </td>
		</tr>
		{% endfor %}
  </tbody>
</table>
</div>
{% endblock %}

```
