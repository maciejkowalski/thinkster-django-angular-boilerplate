from django.conf.urls import include, patterns, url
from rest_framework_nested import routers

from authentication.views import AccountViewSet


router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)

urlpatterns = patterns(
    '',

    url(r'^api/v1/', include(router.urls)),

    url('^.*$', AccountViewSet.as_view(), name='index'),
)
