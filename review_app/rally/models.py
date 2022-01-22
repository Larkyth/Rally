from django.db import models
from django.db.models import Q
from django.db.models.deletion import CASCADE
from django.template.defaultfilters import slugify
from django.contrib.auth.models import Group, User
from rest_framework.fields import BooleanField

import datetime


# Helper methods

# Get a default meeting title, based on date
def getMeetingTitle():
    print("Creating meeting for date: " + (datetime.date.today()).strftime("%x"))
    return "Meeting " + (datetime.date.today()).strftime("%x")


def getTaskName():
    print("Creating task name")
    return "Task to complete"


# Extended base User model from Django
class RallyUser(models.Model):
    # User model already has an id, username, email, password, first_name + last_name
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.TextField(default="")

    # toString
    def __str__(self):
        return self.user.username + ", (" + (self.user.first_name + " " + self.user.last_name) + ")"

    # Returns slug vers of username for URL parameters
    def giveslug(self):
        return slugify(self.user.username)


# Meeting model
class Meeting(models.Model):
    
    # Date of creation, date of meeting, verbose title
    title = models.CharField(max_length=255, default=getMeetingTitle, blank=False)
    start_date = models.DateTimeField(blank=False)
    end_date = models.DateTimeField(blank=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    
    #Agenda, meeting minutes
    agenda = models.TextField(blank=True)
    minutes = models.TextField(blank=True)

    # State tracking - editable & archived
    editable = models.BooleanField(default=False)   # Editable post-meeting start until archived
    archived = models.BooleanField(default=False)   # Permanent record, can't be updated

    # User relations - creator, attendees (owners), editors (unapproved)
    creator = models.ForeignKey(RallyUser, related_name="meet_creator", on_delete=models.CASCADE)            # Creator of the meeting instance
    owners = models.ManyToManyField(RallyUser, related_name="meet_owners")        # Meeting attendees (supervisor/student/mentor)
    agreed = models.ManyToManyField(RallyUser, related_name="meet_agreed")                              # Agreed users

    # toString
    def __str__(self):
        return self.title



# Tasks
class Task(models.Model):
    # Date of creation, update date, date of completion, name, description
    name = models.CharField(max_length=255, default=getTaskName, blank=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    date_completed = models.DateTimeField(blank=True)
    deadline = models.DateTimeField(blank=True)
    
    description = models.TextField(blank=True)
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE)

    # State tracking
    complete = models.BooleanField(default=False)     # Completion status
    archived = models.BooleanField(default=False)

    # User relations - creator, owners
    creator = models.ForeignKey(RallyUser, related_name="task_creator", on_delete=models.CASCADE)
    owners = models.ManyToManyField(RallyUser, related_name="task_owners")
    subscribers = models.ManyToManyField(RallyUser, related_name="task_subscribers")         # Users who should be informed of updates



# Notifications

