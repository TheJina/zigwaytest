from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, UserRegisterViewSet

router = routers.DefaultRouter()
router.register('users',UserViewSet)
router.register('register',UserRegisterViewSet)

urlpatterns = [
    path('',include(router.urls)),
]
