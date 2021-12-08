from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.fields import EmailField

from .models import User, SignUpUser
from .serializers import UserSerializer, SignupSerializer

from rest_framework import status               # Gives access to HTTP Request status codes
from rest_framework.views import APIView        
from rest_framework.response import Response    # Allows to send custom response from view



def index(request):
    return HttpResponse("Rally app begins.")


# Create an extended user
# APIView base class to allow request handling methods to be overriden
class SignupView(APIView):
    serializer_class = SignupSerializer     # Not necessary

    # Redefine the POST handling method and save the created user
    def post(self, request, format=None):
        
        # Serialize data
        serializer = self.serializer_class(data=request.data)

        # Check request data is in request and serialized
        if serializer.is_valid():
            un = serializer.data.get("username")
            contact = serializer.data.get("email")
            pw = serializer.data.get("password")
            first_name = serializer.data.get("first_name")
            last_name = serializer.data.get("last_name")

            #if SignUpUser.objects.filter(username).exists():
            #    # User already exists
            #    
            #    return Response()

            # Create a user
            # Check this two-step creation cannot be linked
            baseUser = User(username=un, email=contact, password=pw, first_name=first_name, last_name=last_name)
            
            # Successful base User creation
            if baseUser:    
                newUser = SignUpUser(baseUser)

                # Check extended SignUpUser creation successful
                if newUser:
                    return Response(SignupSerializer(newUser).data, status=status.HTTP_201_CREATED)
                # Second step failed
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # Django User model creation failed
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)