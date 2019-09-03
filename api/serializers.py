from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','first_name','last_name','email')


class UserSerializerWithToken(serializers.ModelSerializer):
    tokens = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('username','first_name','last_name','email','password','tokens')
        extra_kwargs = {'password':{'write_only':True, 'required':True},'email':{ 'required':True }}

    def get_tokens(self, user):
        tokens = RefreshToken.for_user(user)
        refresh = str(tokens)
        access = str(tokens.access_token)
        data = {
            "refresh": refresh,
            "access": access
        }
        return data

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user