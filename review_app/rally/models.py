from django.db import models
from django.contrib.auth.models import Group, User



# Potentially temp solution to the problem of extending the base User model
class SignUpUser(models.Model):
    # User model already has a username, email, password, first_name + last_name

    user = models.OneToOneField(User, on_delete=models.CASCADE)
#    group = models.ManyToManyField(Group)         # Note user model also has a group attr, here for legibility


    #toString
    def __str__(self):
        return self.user.username + ", (" + (self.user.first_name + " " + self.user.last_name) + ")"


# Tasks



# Meetings



# Notifications