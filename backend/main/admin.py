from django.contrib import admin
from . import models


class MenotList(admin.ModelAdmin):
    list_display = ('saaja', 'summa', 'maksupvm')


admin.site.register(models.Saajat)
admin.site.register(models.Menoluokat)
admin.site.register(models.Menot, MenotList)
admin.site.register(models.Menoerittelyt)
admin.site.register(models.Menolajit)
admin.site.register(models.MenotLuokittain)
admin.site.register(models.Maksajat)
admin.site.register(models.Tuloluokat)
admin.site.register(models.Tulot)
admin.site.register(models.Summat)
