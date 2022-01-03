from django.db import models

class Customer(models.Model):
    name     = models.CharField(max_length=20)
    email    = models.EmailField()
    location = models.CharField(max_length=20)
    age      = models.IntegerField()

    def __str__(self):
        return self.name