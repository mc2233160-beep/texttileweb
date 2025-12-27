<?php

// The email address where you will RECEIVE the contact form submissions.
$recipient_email = "rutvisheta87@gmail.com"; 



// --- 1. VALIDATION AND DATA COLLECTION ---
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    // Redirect if accessed directly without form submission
    header("Location: contact.html");
    exit;
}

// Collect and clean data from the form's 'name' attributes
$name       = trim($_POST["name"]);
$email      = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$phone      = trim($_POST["phone"]);
$company    = trim($_POST["company"]);
$subject_raw = trim($_POST["subject"]);
$message    = trim($_POST["message"]);

// Basic server-side validation for required fields
if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // You can redirect to an error page or show a message
    header("Location: contact.html?status=error_invalid");
    exit;
}

// Map subject value to a readable string (optional but nice for emails)
$subject_map = [
    "quote" => "Request for Quote",
    "product-info" => "Product Information Inquiry",
    "custom-order" => "Custom Order Request",
    "support" => "Customer Support",
    "other" => "General Inquiry",
];
$subject_line = "New Contact: " . ($subject_map[$subject_raw] ?? "General Inquiry") . " (" . $name . ")";


// --- 2. EMAIL CONTENT & HEADERS ---

// Build the email body content
$email_content = "You have received a new message from the Jyoti Creation website.\n\n";
$email_content .= "--- CUSTOMER DETAILS ---\n";
$email_content .= "Full Name: " . $name . "\n";
$email_content .= "Email: " . $email . "\n";
$email_content .= "Phone: " . (empty($phone) ? "N/A" : $phone) . "\n";
$email_content .= "Company: " . (empty($company) ? "N/A" : $company) . "\n\n";
$email_content .= "--- MESSAGE DETAILS ---\n";
$email_content .= "Subject: " . ($subject_map[$subject_raw] ?? "N/A") . "\n";
$email_content .= "Message:\n" . $message . "\n";


// Set the Email Headers
$email_headers = "From: Website Contact <" . $sender_email . ">\r\n";
// **CRITICAL:** This ensures when you hit "Reply," your response goes to the user.
$email_headers .= "Reply-To: " . $email . "\r\n"; 
$email_headers .= "Content-Type: text/plain; charset=UTF-8";


// --- 3. SEND THE EMAIL ---
if (mail($recipient_email, $subject_line, $email_content, $email_headers)) {
    // Success: Redirect the user to a thank you page (you need to create this)
    // Create a file named 'thank_you.html' in your root directory.
    header("Location: thank_you.html");
    exit;
} else {
    // Failure: Server error during mail sending
    // You can redirect to an error page or show a generic message
    header("Location: contact.html?status=error_server");
    exit;
}
?>