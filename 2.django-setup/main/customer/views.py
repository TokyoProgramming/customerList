from django.shortcuts import get_object_or_404, redirect, render
from django.views.generic import View
from .models import Customer


def index(request):
    return render(request, 'index.html', {})


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

def delete(request, pk):
    if request.method == 'GET':
        obj = get_object_or_404(Customer, pk=pk)
        obj.delete()
        return redirect('/')
    return