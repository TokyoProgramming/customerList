from django.urls import path
from .import views

urlpatterns = [
    path('', views.customerList, name='customers'),
    path('create', views.customerCreate, name='create'),
    path('update/<str:pk>', views.customerUpdate, name='update'),
    path('delete/<str:pk>', views.customerDelete, name='delete')
]