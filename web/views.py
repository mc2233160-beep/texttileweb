from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.conf import settings
from django.contrib import messages
from .models import ContactRequest

def index(request):
    return render(request, 'web/index.html')

def about(request):
    return render(request, 'web/about.html')

def products(request):
    return render(request, 'web/products.html')

def fabrics(request):
    return render(request, 'web/fabrics.html')

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

    return render(request, 'web/contact.html')

def thank_you(request):
    return render(request, 'web/thank_you.html')

# Product Categories
def table_linen(request):
    return render(request, 'web/table-linen.html')

def bed_linen(request):
    return render(request, 'web/bed-linen.html')

def bath_linen(request):
    return render(request, 'web/bath-linen.html')

def chair_linen(request):
    return render(request, 'web/chair-linen.html')

def napkins(request):
    return render(request, 'web/napkins.html')

def premium_fabric(request):
    return render(request, 'web/premium-fabric.html')
