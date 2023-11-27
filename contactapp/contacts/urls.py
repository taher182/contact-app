from django.urls import path
from .views import *
urlpatterns = [
    path("", ContactListCreate.as_view(), name="Contact List Create"),
    path("<int:contact_id>", ContactListUpdateDestroy.as_view(), name="Contact List Create update destroy"),
    path("category", CategoryListCreate.as_view(), name="Category List Create"),
    path("category/<int:category_id>", CategoryListUpdateDestroy.as_view(), name="category list create update destroy")
]