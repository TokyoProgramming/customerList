from contextlib import closing
from django.http import request
from django.shortcuts import get_object_or_404, render
from django.views.generic import View
from .models import Customer
from django.shortcuts import redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


@method_decorator(csrf_exempt, name='dispatch')
class CustomerList(View):
    
    def post(self, request):
        if request.method == 'POST':
            name       = request.POST.get("name")
            email      = request.POST.get("email")
            location   = request.POST.get("location")
            age        = request.POST.get("age")
            obj =Customer.objects.create(
                name=name, 
                email=email, 
                location=location, 
                age=age
            )
            customer = {
                'id' : obj.id, 
                "name": obj.name, 
                "email" : obj.email, 
                'location': obj.location, 
                'age': obj.age
            }
            data = {
                'customer': customer
            }            
            return JsonResponse(data)

    def get(self, request):
        context ={}
        context['customers']= Customer.objects.all()
        return render (request, 'index.html', context) 

        
    
    
    
@method_decorator(csrf_exempt, name='dispatch')
def delete(request):
  
    if request.method == 'GET':

        customerId       = request.GET.get("id")
        obj = get_object_or_404(Customer, id=customerId)
        obj.delete()
        data = {
            'deleted': True
        }
        return JsonResponse(data)
    print('error')
    return

    




@method_decorator(csrf_exempt, name='dispatch')
def update(request):

    if request.method == 'GET':
        customerId       = request.POST.get("id")
        obj = get_object_or_404(Customer, id=customerId)
        context = {}
        context['customer'] = obj
        context['customers']= Customer.objects.all()         
        return render(request, 'base.html', context)
    elif request.method == 'POST':
        customerId       = request.POST.get("id")
        name       = request.POST.get("name")
        email      = request.POST.get("email")
        location   = request.POST.get("location")
        age        = request.POST.get("age")
        
        obj = get_object_or_404(Customer, id=customerId)
        
        print(obj)
    

        obj.name = name
        obj.email = email
        obj.location = location
        obj.age = age 
        
        obj.save()
        
        customer = {
            'id' : obj.id, 
            "name": obj.name, 
            "email" : obj.email, 
            'location': obj.location, 
            'age': obj.age
        }
        data = {
            'customer': customer
        }            
        return JsonResponse(data)


    return 




        
