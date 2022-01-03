
from django.urls import path, include
from . import views
from .views import customerList

urlpatterns = [
    # path('', views.index, name='index'),
    path('', customerList.as_view(), name='index'),
    path('update/<int:pk>', views.update, name='update'),
    path('delete/<int:pk>', views.delete, name='delete'),
]