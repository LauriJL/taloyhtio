from rest_framework import routers
from django.urls import path
from . import views

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


urlpatterns = [
    path('menot/<int:pk>/', views.MenotDetail.as_view()),
    path('erittely/<int:pk>/', views.MenoErittelyDetail.as_view()),

]

urlpatterns += router.urls
