from django.shortcuts import render
from django.http import HttpResponse


from .models import Meeting, User, RallyUser
from .serializers import CreateMeetingSerializer, LoginSerializer, SignupSerializer, UserSerializer

from rest_framework import permissions, status               # For HTTP Request status codes
from rest_framework.fields import EmailField
from rest_framework.generics import ListAPIView
from rest_framework import viewsets
from rest_framework.serializers import Serializer
from rest_framework.response import Response    # Alternative object to HTTP Request, similar functionality
from rest_framework.views import APIView        

from knox.models import AuthToken
from knox.auth import TokenAuthentication



# Home page
def index(request):
    return HttpResponse("You are in the Rally app index.")



"""
    >>> User authentication
"""

# Create a meeting and return it
class CreateMeetingView(APIView):
    authentication_classes = (
        TokenAuthentication,
    )
    permission_classes = (
        permissions.IsAuthenticated,
    )
    serializer_class = CreateMeetingSerializer


    # Create meeting with submitted form
    def post(self, request, format=None):

        # Missing validation check here

        newMeeting = self.serializer_class(data=request.data).create(validated_data=request.data)

        print(newMeeting)

        return Response({"yes2": "yes2"}, status=status.HTTP_201_CREATED)


        return Response({"yes": "yes"}, status=status.HTTP_201_CREATED)

        # Check creator is valid
        # print(self.serializer_class(data=request.data))
        # print(serializer)
        # return Response({"No": "no"}, status=status.HTTP_200_OK)
        # # Serialize data
        # serializer = self.serializer_class(data=request.data)

        # if serializer.is_valid():


        #     pass

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
            newUser.save()

            response_data = serializer.data
            response_data["token"] = AuthToken.objects.create(newUser.user)[1]
            print(response_data)
            print("token " + response_data["token"])
            return Response(response_data, status=status.HTTP_201_CREATED)

        # Serializer could not validate data
        else:
            print("Invalid data")

            response_data = {"error": "Signup failed, please try different inputs."}

            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


# Login as a Rally user
class LoginView(APIView):
    serializer_class = LoginSerializer


    # Submit credentials
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        
        # Serializer data is valid
        if serializer.is_valid():

            # Retrieve user model associated with login credentials
            user = (User.objects.filter(username=request.data.get("username"))[0])

            response_data = UserSerializer(user).data
            # Create token associated with user
            _, token = AuthToken.objects.create(user)
            response_data["token"] = token

            return Response(response_data, status.HTTP_200_OK)

        # Note this case is for both incorrect credentials (serializer exception)
        # and edge case of failing to send input for a field; no current need to distinguish
        else:
            # Simple POST content so only error will be incorrect details
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

        # Note this is returning the Django base user model (one-to-one with the RallyUser model)
        response_data = UserSerializer(request.user).data
        print(response_data);

        return Response(response_data, status.HTTP_200_OK)


"""
    >>> User model access
"""

# Get a list of users on the application
class GetRallyUsers(ListAPIView):
    authentication_classes = (
        TokenAuthentication,
    )
    # permission_classes = (
    #     permissions.IsAuthenticated,
    # )
    model = RallyUser
    serializer_class = SignupSerializer
    queryset = RallyUser.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = SignupSerializer(queryset, many=True)
        
        userList = serializer.data
    
        return Response(userList, status=status.HTTP_200_OK)


"""
    >>> Meetings
"""



# Update meeting

# Get meetings
