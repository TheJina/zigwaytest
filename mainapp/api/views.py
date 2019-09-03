from django.shortcuts import render
from rest_framework import viewsets, permissions
from django.contrib.auth.models import User
from .serializers import UserSerializer, UserSerializerWithToken
# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserRegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializerWithToken
    permission_classes = (permissions.AllowAny,)

