from rest_framework import routers
from .api import CustomerViewSet


router = routers.DefaultRouter()
router.register('api/customer', CustomerViewSet, 'customer')

urlpatterns = router.urls