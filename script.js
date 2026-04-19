/**
 * AKS GROUP - CORE SYSTEM LOGIC
 * Handles: Form Validation, Payment Trigger, and Data Persistence
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECT THE FORM (Works for all 5 division pages)
    const assessmentForm = document.querySelector('form');
    const payButton = assessmentForm ? assessmentForm.querySelector('button') : null;

    if (payButton) {
        payButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 2. VALIDATE FORM DATA
            if (!assessmentForm.checkValidity()) {
                alert("Please fill in all required fields before proceeding.");
                assessmentForm.reportValidity();
                return;
            }

            // 3. CAPTURE FORM DATA (To be used in the PDF)
            const formData = new FormData(assessmentForm);
            const data = Object.fromEntries(formData.entries());
            
            // Store data locally so thank-you.html can access it for the PDF link
            localStorage.setItem('aks_report_data', JSON.stringify(data));

            // 4. TRIGGER RAZORPAY
            // NOTE: Replace 'YOUR_RAZORPAY_KEY' and 'AMOUNT' dynamically
            handlePayment(data);
        });
    }
});

/**
 * RAZORPAY INTEGRATION
 * This function opens the payment modal.
 */
function handlePayment(userData) {
    // Get the price based on the current page
    const pagePath = window.location.pathname;
    let amount = 1999; // Default (Biopulse)
    
    if(pagePath.includes('fortuna')) amount = 2499;
    if(pagePath.includes('strategix')) amount = 4999;
    if(pagePath.includes('quantum')) amount = 9999;
    if(pagePath.includes('innovista')) amount = 15000;

    const options = {
        "key": "YOUR_RAZORPAY_KEY_HERE", // Enter your Key ID from Razorpay Dashboard
        "amount": amount * 100, // Amount in paise
        "currency": "INR",
        "name": "AKS Group",
        "description": "Intelligence Report Generation",
        "image": "https://your-github-username.github.io/aks-group/logo.png",
        "handler": function (response) {
            // This runs AFTER successful payment
            console.log("Payment ID:", response.razorpay_payment_id);
            
            // REDIRECT TO THANK YOU PAGE
            window.location.href = `thank-you.html?payment_id=${response.razorpay_payment_id}`;
        },
        "prefill": {
            "name": userData.name || "Valued Client",
            "email": userData.email || "aksgroup.abakash@gmail.com",
            "contact": "9378123328"
        },
        "theme": {
            "color": "#C5A059"
        }
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
}
