from django.shortcuts import render
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404
import dropbox
import base64
from io import BytesIO
# Create your views here.

import base64
import dropbox
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer

class UsersListCreate(APIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        errorData = {}

        if data['password1'] == data['password2']:
            data['password'] = data['password2']
        else:
            errorData["password"] = "Passwords don't match"

        email_check = User.objects.filter(email__iexact=data['email'].strip()).exists()
        if email_check:
            errorData['email'] = "Email already exists"

        if errorData:
            return Response(data=errorData, status=status.HTTP_400_BAD_REQUEST)

        try:
            access_token = "sl.BqitxoxZX4enB5chSeBOSQNHQdqtVpwtIK7oI84BO6Zvi0gznR1k7WGGixJ3WcEgFWi61qcY2LbDl666EbAmTcei9sVTNKtfq-YN-q2D2gPyA3wIuBTD3KcBkuPkqotp61wYMGJSD-NCqOwGszZi"
            uploaded_file = request.data.get('image')

            if uploaded_file:  # Check if 'image' exists in the request
                email = data['email']
                file_name = uploaded_file.name

                # Read the file content
                file_content = uploaded_file.read()

                # Define Dropbox path for upload
                path = f'/users/userprofiles/{email}/{file_name}'

                # Upload file content to Dropbox
                dbx = dropbox.Dropbox(access_token)
                dbx.files_upload(file_content, path)

                # Construct the shared link for the uploaded file
                shared_link = dbx.sharing_create_shared_link(path).url

                # Update the user data dictionary with the Dropbox file path
                data['image'] = shared_link

            serializer = self.serializer_class(data=data)

            if serializer.is_valid():
                serializer.save()

                response = {
                    "message": "User created and file uploaded to Dropbox",
                    "data": serializer.data
                }
                return Response(data=response, status=status.HTTP_201_CREATED)

            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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

from rest_framework.views import APIView
from rest_framework.response import Response
import dropbox

from rest_framework.views import APIView
from rest_framework.response import Response
import dropbox
import base64
from django.core.files.base import ContentFile

class DropboxUploadView(APIView):
    def post(self, request):
        access_token = "sl.BqgtcckD_J_qnzMH0jz4_6HszBpGwsNERfpY1ywwRO3ymL5Xj07Yjncq2yhOhvA2554aLp2NEpHEFmi8so7jIlvS0_h_xFn1_G4QhJAf4ibxNf_hUyNQRI2JWSjze_1atSvn-2Uqusc81sLOuaEz"
        email = request.data.get('email')
        uploaded_file = request.data.get('file')
        file_name = request.data.get('name')

        try:
            # Read the file content
            file_content = uploaded_file.read()

            # Encode file content to base64
            file_content_base64 = base64.b64encode(file_content).decode('utf-8')

            # Define Dropbox path for upload
            path = f'/users/userprofiles/{email}/{file_name}'

            # Upload file content to Dropbox
            dbx = dropbox.Dropbox(access_token)
            dbx.files_upload(file_content, path)

            # Construct the shared link for the uploaded file
            shared_link = dbx.sharing_create_shared_link(path).url

            return Response({
                'message': 'File uploaded successfully to Dropbox!',
                'path': shared_link
            })
        except Exception as e:
            return Response({'error': str(e)}, status=500)
