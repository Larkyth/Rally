# Converts data between Python objects and JSON format

from django.core.exceptions import ValidationError
from rest_framework import serializers
from .models import RallyUser
from django.contrib.auth import authenticate
from django.contrib.auth.models import User



# Serialize base Django User model - helper for RallyUser
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
        # Model fields to not return to frontend
        extra_kwargs = {
            'password': {'write_only': True},
        }



# Register user serializer
class SignupSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = RallyUser
        fields = ('user', 'tempfield',)


    # Override create method
    def create(self, validated_data):
        # Base Django User model
        baseuser_data = validated_data.pop('user')
        baseUser = UserSerializer.create(UserSerializer(), validated_data=baseuser_data)

        # Hash password -- possibly move to the UserSerializer
        baseUser.set_password(baseUser.password)
        baseUser.save()

        # Extended User model with result
        newUser = RallyUser.objects.create(user=baseUser, tempfield=validated_data.pop('tempfield'))
        return newUser


# Check credentials match an existing user in the database
class LoginSerializer(serializers.Serializer):
    # Declare the fields to serialize
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):

        # Try to authenticate user
        user = authenticate(**data)

        # Successful authentication
        if (user is not None) and (user.is_active):
            return user
        # Unsucessful
        else:
            raise serializers.ValidationError("Incorrect details, try again.")


