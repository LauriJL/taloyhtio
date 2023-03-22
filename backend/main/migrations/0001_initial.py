# Generated by Django 4.1.4 on 2022-12-20 17:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Maksajat',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nimi', models.CharField(max_length=50, unique=True)),
            ],
            options={
                'db_table': 'maksajat',
            },
        ),
        migrations.CreateModel(
            name='Menolajit',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('menolaji', models.CharField(max_length=100, unique=True)),
            ],
            options={
                'db_table': 'menolajit',
            },
        ),
        migrations.CreateModel(
            name='Menoluokat',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('menoluokka', models.CharField(max_length=50, unique=True)),
            ],
            options={
                'db_table': 'menoluokat',
            },
        ),
        migrations.CreateModel(
            name='MenotLuokittain',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('vuosi', models.IntegerField(blank=True, null=True)),
                ('luokka', models.CharField(blank=True, max_length=50, null=True)),
                ('summa', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
            ],
            options={
                'db_table': 'menotluokittain',
            },
        ),
        migrations.CreateModel(
            name='Saajat',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nimi', models.CharField(max_length=50, unique=True)),
            ],
            options={
                'db_table': 'saajat',
            },
        ),
        migrations.CreateModel(
            name='Summat',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('vuosi', models.IntegerField(blank=True, null=True)),
                ('menot', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
                ('tulot', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
                ('tase', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
            ],
            options={
                'db_table': 'summat',
            },
        ),
        migrations.CreateModel(
            name='Tuloluokat',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('tuloluokka', models.CharField(max_length=50, unique=True)),
            ],
            options={
                'db_table': 'tuloluokat',
            },
        ),
        migrations.CreateModel(
            name='Tulot',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('summa', models.DecimalField(decimal_places=2, max_digits=6)),
                ('maksupvm', models.DateField(blank=True, null=True)),
                ('viesti', models.CharField(blank=True, max_length=250, null=True)),
                ('luokka', models.ForeignKey(db_column='luokka', on_delete=django.db.models.deletion.DO_NOTHING, to='main.tuloluokat', to_field='tuloluokka')),
                ('maksaja', models.ForeignKey(db_column='maksaja', on_delete=django.db.models.deletion.DO_NOTHING, to='main.maksajat', to_field='nimi')),
            ],
            options={
                'db_table': 'tulot',
            },
        ),
        migrations.CreateModel(
            name='Menot',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('summa', models.DecimalField(decimal_places=2, max_digits=6)),
                ('viite', models.CharField(blank=True, max_length=50, null=True, unique=True)),
                ('erapvm', models.DateField(blank=True, null=True)),
                ('maksupvm', models.DateField(blank=True, null=True)),
                ('kausi_alku', models.DateField(blank=True, null=True)),
                ('kausi_loppu', models.DateField(blank=True, null=True)),
                ('viesti', models.CharField(blank=True, max_length=250, null=True)),
                ('luokka', models.ForeignKey(db_column='luokka', on_delete=django.db.models.deletion.DO_NOTHING, to='main.menoluokat', to_field='menoluokka')),
                ('saaja', models.ForeignKey(db_column='saaja', on_delete=django.db.models.deletion.DO_NOTHING, to='main.saajat', to_field='nimi')),
            ],
            options={
                'db_table': 'menot',
            },
        ),
        migrations.CreateModel(
            name='Menoerittelyt',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('summa', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('laji', models.ForeignKey(db_column='laji', on_delete=django.db.models.deletion.DO_NOTHING, to='main.menolajit', to_field='menolaji')),
                ('lasku', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.menot')),
            ],
            options={
                'db_table': 'menoerittelyt',
            },
        ),
    ]