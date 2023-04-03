from rest_framework import routers
from django.urls import path, register_converter
from datetime import datetime
from . import views


class DateConverter:
    regex = '\d{4}-\d{2}-\d{2}'

    def to_python(self, value):
        return datetime.strptime(value, '%Y-%m-%d')

    def to_url(self, value):
        return value


register_converter(DateConverter, 'date_C')


router = routers.DefaultRouter()
# Menot
router.register('menot', views.MenotViewSet)
router.register('saajat', views.SaajatViewSet)
router.register('menolajit', views.MenolajitViewSet)
router.register('menoluokat', views.MenoluokatViewSet)
router.register('menotluokittain', views.MenotLuokittainViewSet)
# Tulot
router.register('tulot', views.TulotViewSet)
router.register('maksajat', views.MaksajatViewSet)
router.register('tuloluokat', views.TuloluokatViewSet)
# Summat
router.register('summat', views.SummatViewSet)
# Vuodet
router.register('vuodet', views.VuosiViewSet)

urlpatterns = [
    path('menot/<int:pk>/', views.MenotDetail.as_view()),
    path('erittely/<int:pk>/', views.MenoErittelyDetail.as_view()),
    path('menotarkisto/<date_C:start_date>&<date_C:end_date>',
         views.MenotArchiveViewSet.as_view())

]

urlpatterns += router.urls
