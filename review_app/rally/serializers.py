# Converts between Python objects and JSON data (frontend)


from rest_framework import serializers
from .models import SignUpUser
from django.contrib.auth.models import User



# Serialize base Django User model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')


# Serialize displayable user data
class DisplayUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only = True)

    class Meta:
        model = SignUpUser
        fields = ('user')


# Serialize POST requests for registering a user in the database
class SignupSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = SignUpUser
        # Data fields carried in the POST request
        fields = ('user', 'tempfield',)

    # Override create method
    def create(self, validated_data):
        baseuser_data = validated_data.pop('user')
        baseUser = UserSerializer.create(UserSerializer(), validated_data=baseuser_data)

        newUser = SignUpUser.objects.create(user=baseUser, tempfield=validated_data.pop('tempfield'))
        return newUser