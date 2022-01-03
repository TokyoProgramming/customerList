from rest_framework.response import Response
from django.shortcuts import render
from .models import Customer
from .serializers import CustomerSerializer
from rest_framework.decorators import api_view



@api_view(['GET'])
def customerList(request):
    customers = Customer.objects.all()
    serializer = CustomerSerializer(customers, many= True)
    return Response(serializer.data)


@api_view(['POST'])
def customerCreate(request):
    serializer = CustomerSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def customerUpdate(request, pk):
    customer = Customer.objects.get(id=pk)
    serializer = CustomerSerializer(instance= customer, data = request.data)
    
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def customerDelete(request, pk):
    customer = Customer.objects.get(id=pk)
    customer.delete()
    
    return Response('Delete')

    