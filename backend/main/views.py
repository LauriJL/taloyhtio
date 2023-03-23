# Packages
from rest_framework import viewsets, generics
from rest_framework.pagination import PageNumberPagination
from django.http import JsonResponse
from itertools import chain
from django.shortcuts import render
import datetime
from datetime import date

# Assets
from . import models
from . import serializers
from .pagination import CustomPageNumberPagination
from django.core.paginator import Paginator

# Globals
currentYear = int(datetime.date.today().year)

# Pagination


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10

# Menot


class MenotViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.MenotSerializer
    pagination_class = StandardResultsSetPagination
    queryset = models.Menot.objects.all().order_by('-maksupvm')


class MenotDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.MenotSerializer
    queryset = models.Menot.objects.all()

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super(MenotDetail, self).get_context_data(**kwargs)
        # Add extra context from another model
        context['menoerittelyt'] = MenoErittelyDetail.objects.filter(
            lasku_id='id')
        return context


class MenoErittelyDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.MenoErittelySerializer
    queryset = models.Menoerittelyt.objects.all()

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super(MenoErittelyDetail, self).get_context_data(**kwargs)
        # Add extra context from another model
        context['menolajit'] = MenolajitViewSet.objects.filter(
            laji='menolaji')
        return context


class SaajatViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.SaajatSerializer
    queryset = models.Saajat.objects.all()


class MenolajitViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.MenolajitSerializer
    queryset = models.Menolajit.objects.all()


class MenoluokatViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.MenoluokatSerializer
    queryset = models.Menoluokat.objects.all()


class MenotLuokittainViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.MenotLuokittainSerializer
    queryset = models.MenotLuokittain.objects.all().filter(vuosi=currentYear)

    def menotLuokittain_Chart(request):
        labels = []
        data = []
        vuosi = []
        queryset = models.MenotLuokittain.objects.all()

        for item in queryset:
            vuosi.append(['vuosi'])
            labels.append(item['luokka'])
            data.append(item['summa'])

        return JsonResponse(data={
            'vuodet': vuosi,
            'labels': labels,
            'data': data
        })

# Tulot


class TulotViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.TulotSerializer
    pagination_class = StandardResultsSetPagination
    queryset = models.Tulot.objects.all()


class MaksajatViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.MaksajatSerializer
    queryset = models.Maksajat.objects.all()


class TuloluokatViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.TuloluokatSerializer
    queryset = models.Tuloluokat.objects.all()


# Summat
class SummatViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.SummatSerializer
    queryset = models.Summat.objects.all().filter(vuosi=currentYear)
