from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.fields import EmailField

from .models import User, SignUpUser
from .serializers import DisplayUserSerializer, SignupSerializer

from rest_framework import status               # Gives access to HTTP Request status codes
from rest_framework.views import APIView        
from rest_framework.response import Response    # Allows to send custom response from view



def index(request):
    return HttpResponse("You are in the Rally app index.")


# Create an extended user
# APIView base class to allow request handling methods to be overriden
class SignupView(APIView):
    serializer_class = SignupSerializer     # Not necessary


    # Define the POST request handling and save the created user
    def post(self, request, format=None):
        
        # Serialize data
        serializer = self.serializer_class(data=request.data)

        # Check required data is in request and serialized
        if serializer.is_valid():
            serializer.create(validated_data=request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)