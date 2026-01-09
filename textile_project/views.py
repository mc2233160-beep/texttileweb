from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.conf import settings
from django.contrib import messages
from .models import ContactRequest

def index(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def products(request):
    return render(request, 'products.html')

def fabrics(request):
    return render(request, 'fabrics.html')

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        company = request.POST.get('company')
        subject_raw = request.POST.get('subject')
        message_content = request.POST.get('message')

        # Save to database
        ContactRequest.objects.create(
            name=name,
            email=email,
            phone=phone,
            company=company,
            subject=subject_raw,
            message=message_content
        )

        # Logic to send email would go here.
        # For now, we'll just simulate it and redirect.
        # print("Email sent to support for", name, email)
        
        # In a real app, use send_mail()
        
        return redirect('thank_you')

    return render(request, 'contact.html')

def thank_you(request):
    return render(request, 'thank_you.html')

# Product Categories
def table_linen(request):
    return render(request, 'table-linen.html')

def bed_linen(request):
    return render(request, 'bed-linen.html')

def bath_linen(request):
    return render(request, 'bath-linen.html')

def chair_linen(request):
    return render(request, 'chair-linen.html')

def napkins(request):
    return render(request, 'napkins.html')

def premium_fabric(request):
    return render(request, 'premium-fabric.html')
