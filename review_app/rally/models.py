from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import Group, User



# Extended base User model from Django
class RallyUser(models.Model):
    # User model already has an id, username, email, password, first_name + last_name
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    tempfield = models.TextField(default="")

    # toString
    def __str__(self):
        return self.user.username + ", (" + (self.user.first_name + " " + self.user.last_name) + ")"

    # Returns slug vers of username for URL parameters
    def giveslug(self):
        return slugify(self.user.username)


# Tasks



# Meetings



# Notifications