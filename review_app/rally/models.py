from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import Group, User



# Extended base User model from Django
class SignUpUser(models.Model):
    # User model already has a username, email, password, first_name + last_name
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # toString
    def __str__(self):
        return self.user.username + ", (" + (self.user.first_name + " " + self.user.last_name) + ")"

    # Returns slug vers of username for URL parameters
    def giveslug(self):
        return slugify(self.user.username)


# Tasks



# Meetings



# Notifications