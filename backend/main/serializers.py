from rest_framework import serializers
from . import models

# Menot


class MenotSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Menot
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(MenotSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1


class MenoErittelySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Menoerittelyt
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(MenoErittelySerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1


class MenotLuokittainSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MenotLuokittain
        fields = '__all__'


class VuosiSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Summat
        fields = ['vuosi']

    def __init__(self, *args, **kwargs):
        super(VuosiSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1


class SaajatSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Saajat
        fields = '__all__'


class MenolajitSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Menolajit
        fields = ['menolaji']


class MenoluokatSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Menoluokat
        fields = '__all__'

# Tulot


class TulotSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tulot
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(TulotSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1


class MaksajatSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Maksajat
        fields = '__all__'


class TuloluokatSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tuloluokat
        fields = '__all__'


class SummatSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Summat
        fields = '__all__'
