from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about.html', views.about, name='about'),
    path('products.html', views.products, name='products'),
    path('fabrics.html', views.fabrics, name='fabrics'),
    path('contact.html', views.contact, name='contact'),
    path('thank_you.html', views.thank_you, name='thank_you'),
    path('table-linen.html', views.table_linen, name='table_linen'),
    path('bed-linen.html', views.bed_linen, name='bed_linen'),
    path('bath-linen.html', views.bath_linen, name='bath_linen'),
    path('chair-linen.html', views.chair_linen, name='chair_linen'),
    path('napkins.html', views.napkins, name='napkins'),
    path('premium-fabric.html', views.premium_fabric, name='premium_fabric'),
]
