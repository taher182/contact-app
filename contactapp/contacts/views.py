from django.shortcuts import render
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from .serializers import *
from .models import *
# Create your views here.
class ContactListCreate(APIView):
    serializer_class = ContactSerializer
    def get(self, request:Request, *args, **kwargs):
        contacts = Contact.objects.all()
        serializer = self.serializer_class(instance=contacts, many=True)
        response = {
            "message":"List Contacts",
            "data":serializer.data
        }
        return Response(data=response, status=status.HTTP_200_OK)
    
    def post(self, request:Request, *args, **kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            response = {
                "message":"contact creaion successful",
                "data":serializer.data
            }
            return Response(data=response, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ContactListUpdateDestroy(APIView):
    serializer_class = ContactSerializer
    def get(self,request:Request, contact_id):
        contact = get_object_or_404(Contact, pk=contact_id)
        serializer = self.serializer_class(instance=contact)
        response = {
            "message":"Contact",
            "data":serializer.data
        }
        return Response(data=response, status=status.HTTP_200_OK)
    
    def put(self,request:Request, contact_id:int):
        data = request.data
        contact = get_object_or_404(Contact, pk=contact_id)
        serializer=self.serializer_class(data=data, instance=contact)
        if serializer.is_valid():
            serializer.save()
            response = {
                "message":"contact update successfull",
                "data":serializer.data
            }
            return Response(data=response, status=status.HTTP_200_OK)
    
    def delete(self, request:Request,contact_id:int):
        contact = get_object_or_404(Contact, pk=contact_id)
        contact.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class CategoryListCreate(APIView):
    serializer_class = CategorySerializer
    def get(self, request:Request, *args, **kwargs):
        category = Category.objects.all()
        serializer = self.serializer_class(instance=category, many=True)
        response = {
            "message":"List Category",
            "data":serializer.data
        }
        return Response(data=response, status=status.HTTP_200_OK)
    
    def post(self, request:Request, *args, **kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            response = {
                "message":"category creaion successful",
                "data":serializer.data
            }
            return Response(data=response, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryListUpdateDestroy(APIView):
    serializer_class = CategorySerializer
    def get(self,request:Request, category_id):
        category= get_object_or_404(Category, pk=category_id)
        serializer = self.serializer_class(instance=category)
        response = {
            "message":"Category",
            "data":serializer.data
        }
        return Response(data=response, status=status.HTTP_200_OK)
    
    def put(self,request:Request, category_id:int):
        data = request.data
        category = get_object_or_404(Contact, pk=category_id)
        serializer=self.serializer_class(data=data, instance=category)
        if serializer.is_valid():
            serializer.save()
            response = {
                "message":"category update successfull",
                "data":serializer.data
            }
            return Response(data=response, status=status.HTTP_200_OK)
    
    def delete(self, request:Request,category_id:int):
        category = get_object_or_404(Category, pk=category_id)
        category.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
