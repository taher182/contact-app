from django.urls import path
from .views import *
urlpatterns  =[
    path("", UsersListCreate.as_view(), name="list users"),
    path("<uuid:user_id>", UserRetrieveUpdateDestroy.as_view(), name="Retrieve update destroy user"),
    path("image", DropboxUploadView.as_view(), name="image upload view")
]