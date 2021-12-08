# Converts between Python objects and JSON data (frontend)


from rest_framework import serializers
from .models import SignUpUser



# Serialize displayable user data
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignUpUser
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')


# Serialize POST requests for registering a user in the database
class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignUpUser

        # Data fields carried in the POST request
        fields = (
            'username', 'password', 'email', 'first_name', 'last_name')