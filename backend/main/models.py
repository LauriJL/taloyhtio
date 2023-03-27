from django.db import models

# Menot


class Saajat(models.Model):
    id = models.AutoField(primary_key=True)
    nimi = models.CharField(unique=True, max_length=50)

    def __str__(self):
        return self.nimi

    class Meta:
        db_table = 'saajat'


class Menoluokat(models.Model):
    id = models.AutoField(primary_key=True)
    menoluokka = models.CharField(unique=True, max_length=50)

    def __str__(self):
        return self.menoluokka

    class Meta:
        db_table = 'menoluokat'


class Menot(models.Model):
    id = models.AutoField(primary_key=True)
    saaja = models.ForeignKey(
        'Saajat', models.DO_NOTHING, db_column='saaja', to_field='nimi')
    summa = models.DecimalField(max_digits=6, decimal_places=2)
    viite = models.CharField(unique=True, max_length=50, blank=True, null=True)
    erapvm = models.DateField(blank=True, null=True)
    maksupvm = models.DateField(blank=True, null=True)
    kausi_alku = models.DateField(blank=True, null=True)
    kausi_loppu = models.DateField(blank=True, null=True)
    luokka = models.ForeignKey(
        'Menoluokat', models.DO_NOTHING, db_column='luokka', to_field='menoluokka')
    viesti = models.CharField(max_length=250, blank=True, null=True)
    erittely = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'{self.saaja}'

    class Meta:
        db_table = 'menot'


class Menoerittelyt(models.Model):
    id = models.AutoField(primary_key=True)
    lasku = models.ForeignKey('Menot', on_delete=models.CASCADE)
    laji = models.ForeignKey(
        'Menolajit', models.DO_NOTHING, db_column='laji', to_field='menolaji')
    summa = models.DecimalField(
        max_digits=5, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return str(self.lasku)

    class Meta:
        db_table = 'menoerittelyt'


class Menolajit(models.Model):
    id = models.AutoField(primary_key=True)
    menolaji = models.CharField(
        unique=True, max_length=50, blank=True, null=True)

    def __str__(self):
        return self.menolaji

    class Meta:
        db_table = 'menolajit'


class MenotLuokittain(models.Model):
    id = models.AutoField(primary_key=True)
    vuosi = models.IntegerField(blank=True, null=True)
    luokka = models.CharField(max_length=50, blank=True, null=True)
    summa = models.DecimalField(
        max_digits=6, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return str(self.vuosi)

    class Meta:
        db_table = 'menotluokittain'

# Tulot


class Maksajat(models.Model):
    id = models.AutoField(primary_key=True)
    nimi = models.CharField(unique=True, max_length=50)

    def __str__(self):
        return self.nimi

    class Meta:
        db_table = 'maksajat'


class Tuloluokat(models.Model):
    id = models.AutoField(primary_key=True)
    tuloluokka = models.CharField(unique=True, max_length=50)

    def __str__(self):
        return self.tuloluokka

    class Meta:
        db_table = 'tuloluokat'


class Tulot(models.Model):
    id = models.AutoField(primary_key=True)
    maksaja = models.ForeignKey(
        Maksajat, models.DO_NOTHING, db_column='maksaja', to_field='nimi')
    summa = models.DecimalField(max_digits=6, decimal_places=2)
    maksupvm = models.DateField(blank=True, null=True)
    luokka = models.ForeignKey(
        Tuloluokat, models.DO_NOTHING, db_column='luokka', to_field='tuloluokka')
    viesti = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        # return self.maksaja
        return f'{self.maksaja} ({self.luokka}, {self.maksupvm})'

    class Meta:
        db_table = 'tulot'

# Summat


class Summat(models.Model):
    id = models.AutoField(primary_key=True)
    vuosi = models.IntegerField(blank=True, null=True)
    menot = models.DecimalField(
        max_digits=6, decimal_places=2, blank=True, null=True)
    tulot = models.DecimalField(
        max_digits=6, decimal_places=2, blank=True, null=True)
    tase = models.DecimalField(
        max_digits=6, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return str(self.vuosi)

    class Meta:
        db_table = 'summat'
