import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                        "review_app.settings")

import django
django.setup()

from django.contrib.auth.models import Group


def populate():


    # Set up user groups


    pass