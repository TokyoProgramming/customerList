from django.contrib import admin
from django.urls import path, include
from .views import CustomerList
from . import views


urlpatterns = [
    path('', CustomerList.as_view(), name='customer-list'),
    path('delete/', views.delete, name='customer-delete'),
    path('update/', views.update, name='customer-update'),
]
