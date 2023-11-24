from django.shortcuts import render
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404
# Create your views here.

class UsersListCreate(APIView):
    serializer_class = UserSerializer
    def get(self, request:Request, *args, **kwargs):
        users = User.objects.all()
        serializer = self.serializer_class(instance=users, many=True)
        response = {
            "message":"User data",
            "data":serializer.data
        }
        return Response(data=response, status=status.HTTP_200_OK)
    
    def post(self, request:Request, *args, **kwargs):
        data = request.data
        errorData = {}
        print(data)
        if(data['password1']==data['password2']):
            data['password'] =data['password2']
        else:
            errorData["password"] = "password don't match"
        email_check = User.objects.filter(email__iexact=data['email'].strip()).exists()
        if(email_check):
            errorData['email'] = "email already exists"
        if(errorData):
            return Response(data=errorData, status=status.HTTP_400_BAD_REQUEST)
        print(data)
        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save()
            response = {
                "message":"User created",
                "data": serializer.data
            }
            return Response(data=response, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserRetrieveUpdateDestroy(APIView):
    serializer_class = UserSerializer
    def get(self, request:Request, user_id:uuid):
        user = get_object_or_404(User, pk=user_id)
        serializer = self.serializer_class(instance=user)
        response = {
            "message":"user",
            "data":serializer.data
        }
        return Response(data=response, status=status.HTTP_200_OK)

    def put(self, request:Request, user_id:uuid):
       
        data = request.data
        user = get_object_or_404(User, pk=user_id)
        serializer = self.serializer_class(instance=user, data=data)
        if serializer.is_valid():
            serializer.save()
            response = {
                "message":"User edit successfull",
                "data":serializer.data
            }
            return Response(data=response, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request:Request, user_id:uuid):
        user = get_object_or_404(User, pk=user_id)
        user.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

