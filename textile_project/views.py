from django.shortcuts import render, redirect, get_object_or_404
from django.core.mail import send_mail
from django.conf import settings
from django.contrib import messages
from .models import ContactRequest, Category, Product

def index(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def products(request):
    categories = Category.objects.all()
    return render(request, 'products.html', {'categories': categories})

def category_products(request, category_slug):
    category = get_object_or_404(Category, slug=category_slug)
    products = Product.objects.filter(category=category)
    return render(request, 'category_products.html', {'category': category, 'products': products})

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

        # Send email notification
        email_subject = f'New Enquiry from {name} - {subject_raw}'
        email_body = f"""
        You have received a new enquiry from your website contact form.

        Details:
        ----------------
        Name: {name}
        Email: {email}
        Phone: {phone}
        Company: {company}
        Subject: {subject_raw}
        ----------------

        Message:
        {message_content}
        """

        try:
            send_mail(
                email_subject,
                email_body,
                settings.EMAIL_HOST_USER,
                ['sales@jyoticreation.co'],
                fail_silently=False
            )
        except Exception as e:
            # Optional: Log the error for debugging purposes
            print(f"Failed to send email. Error: {e}")
        
        return redirect('thank_you')

    return render(request, 'contact.html')

def thank_you(request):
    return render(request, 'thank_you.html')

def premium_fabric(request):
    return render(request, 'premium-fabric.html')
