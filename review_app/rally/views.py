from django.shortcuts import render
from django.http import HttpResponse


from .models import User, RallyUser
from .serializers import LoginSerializer, SignupSerializer, UserSerializer

from rest_framework import permissions, status               # For HTTP Request status codes
from rest_framework.fields import EmailField
from rest_framework.serializers import Serializer
from rest_framework.response import Response    # Alternative object to HTTP Request, similar functionality
from rest_framework.views import APIView        

from knox.models import AuthToken
from knox.auth import TokenAuthentication



# Home page
def index(request):
    return HttpResponse("You are in the Rally app index.")


# Serializes sign up form with Django User models
class SignupView(APIView):
    serializer_class = SignupSerializer


    # Register a user with app and return user details
    def post(self, request, format=None):
        
        # Serialize data
        serializer = self.serializer_class(data=request.data)

        # Check required data is in request and serialized
        if serializer.is_valid():
            # is_valid exceptions need to be caught
            print("Sign up data valid")

            newUser = serializer.create(validated_data=request.data)

            response_data = serializer.data
            response_data["signup"] = True
            response_data["token"] = AuthToken.objects.create(newUser.user)[1]
            print("token" + response_data["token"])
            return Response(response_data, status=status.HTTP_201_CREATED)

        # Serializer could not validate data
        else:
            print("Invalid data")

            response_data = serializer.errors
            response_data["signup"] = False

            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


# Login as a Rally user
class LoginView(APIView):
    serializer_class = LoginSerializer


    # Submit credentials
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        
        # Serializer data is valid
        if serializer.is_valid():

            user = (User.objects.filter(username=request.data.get("username"))[0])

            response_data = UserSerializer(user).data
            # Create token associated with user
            _, token = AuthToken.objects.create(user)
            response_data["token"] = token

            return Response(response_data, status.HTTP_200_OK)
        else:
            response_data = {"error": "Incorrect details, try again."}
            return Response(response_data, status.HTTP_400_BAD_REQUEST)


# Retrieving a user with a valid Knox authentication token
class GetUserView(APIView):
    authentication_classes = (
        TokenAuthentication,
    )
    permission_classes = (
        permissions.IsAuthenticated,
    )
    serializer_class = UserSerializer


    def get(self, request, format=None):

        response_data = UserSerializer(request.user).data

        return Response(response_data, status.HTTP_200_OK)