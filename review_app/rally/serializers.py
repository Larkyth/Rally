# Converts data between Python objects and JSON format

from django.core.exceptions import ValidationError
from rest_framework import serializers
from .models import Meeting, RallyUser
from django.contrib.auth import authenticate
from django.contrib.auth.models import User


"""
    >>> User authentication
"""

# Serialize base Django User model - helper for RallyUser
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
        # Model fields to not return to frontend
        extra_kwargs = {
            'password': {'write_only': True},
        }   


# Extended Rally User model
class SignupSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = RallyUser
        fields = ('user', 'role',)


    # Override create method
    def create(self, validated_data):
        # Base Django User model
        baseuser_data = validated_data.pop('user')
        baseUser = UserSerializer.create(UserSerializer(), validated_data=baseuser_data)

        # Hash password -- possibly move to the UserSerializer
        baseUser.set_password(baseUser.password)
        baseUser.save()

        # Extended User model with result
        newUser = RallyUser.objects.create(user=baseUser, role=validated_data.pop('role'))
        newUser.save()
        return newUser


# Check credentials match an existing authenticated user in the database
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


"""
    >>> Meetings
"""

class CreateMeetingSerializer(serializers.ModelSerializer):
    creator = UserSerializer(required=True)
    owners = serializers.PrimaryKeyRelatedField(many=True, read_only="true")

    class Meta:
        model = Meeting
        fields = ('id', 'title', 'agenda', 'start_date', 'end_date', 'date_created', 'creator', 'owners')

    # Override create method
    def create(self, validated_data):

        # Pop nested representations
        creator_id = validated_data.pop('creator')
        owners_id = validated_data.pop('owners')


        # Check the given creator exists + get them
        if User.objects.filter(id=creator_id).exists():
            # Note this is the basic Django user model, meetings are related to the RallyUser model
            djangoCreator = User.objects.get(id=creator_id)
        else:
            raise serializers.ValidationError

        # Check and get owner models
        ownersM = []
        for oid in owners_id:
            
            # Check owner exists
            if(User.objects.filter(id=oid).exists()):
                # Get RallyUser
                ownersM.append(RallyUser.objects.get(user=User.objects.get(id=oid)))
            else:
                raise serializers.ValidationError

        # Make meeting model with the data
        # Title and agenda checks
        newMeeting = Meeting.objects.create(
            start_date=validated_data.pop("start_date"), 
            end_date=validated_data.pop("end_date"), 
            creator=RallyUser.objects.get(user=djangoCreator), 
        )

        # Add owners
        for owner in ownersM:
            newMeeting.owners.add(owner)

        # Optional fields check
        if(validated_data.pop("title")):
            newMeeting.title=(validated_data.pop("title"))
        if(validated_data.pop("agenda")):
            newMeeting.agenda=(validated_data.pop("agenda"))

        # Mtm relationship requires objects be created first 
        for owner in ownersM:
            newMeeting.owners.add(owner)

        return newMeeting