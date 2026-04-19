/**
 * AKS GROUP - CORE SYSTEM LOGIC
 * Master Controller for Payments and Data Persistence
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECT THE FORM & BUTTON
    const assessmentForm = document.querySelector('form');
    // We target the specific ID I added to your HTML files
    const payButton = document.getElementById('payButton');

    if (payButton && assessmentForm) {
        payButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 2. VALIDATE FORM DATA
            if (!assessmentForm.checkValidity()) {
                alert("Please complete all required fields before generating your report.");
                assessmentForm.reportValidity();
                return;
            }

            // 3. CAPTURE FORM DATA
            const formData = new FormData(assessmentForm);
            const data = Object.fromEntries(formData.entries());
            
            // Log for debugging
            console.log("Captured Data:", data);

            // Store data locally so thank-you.html can access it later
            localStorage.setItem('aks_report_data', JSON.stringify(data));

            // 4. TRIGGER RAZORPAY
            handlePayment(data);
        });
    }
});

/**
 * RAZORPAY INTEGRATION
 */
function handlePayment(userData) {
    const pagePath = window.location.pathname.toLowerCase();
    
    // Default Price (Biopulse)
    let amount = 1999; 
    
    // Dynamic Price Routing
    if (pagePath.includes('fortuna')) amount = 2499;
    else if (pagePath.includes('strategix')) amount = 4999;
    else if (pagePath.includes('quantum')) amount = 9999;
    else if (pagePath.includes('innovista')) amount = 15000;

    const options = {
        "key": "rzp_test_XXXXXXXXXXXXXX", // IMPORTANT: REPLACE THIS WITH YOUR REAL KEY
        "amount": amount * 100, // Razorpay works in Paise
        "currency": "INR",
        "name": "AKS Group",
        "description": "Premium Intelligence Report",
        "image": "https://aksgroupindia.github.io/aksgroup/logo.png", // Ensure this path is correct
        "handler": function (response) {
            // Success Logic
            console.log("Transaction Successful:", response.razorpay_payment_id);
            
            // Redirect to the success page with the payment ID
            window.location.href = `thank-you.html?payment_id=${response.razorpay_payment_id}`;
        },
        "prefill": {
            "name": userData.name || "AKS Client",
            "email": userData.email || "aksgroup.abakash@gmail.com",
            "contact": "9378123328"
        },
        "theme": {
            "color": "#C5A059"
        }
    };

    try {
        const rzp1 = new Razorpay(options);
        rzp1.open();
    } catch (error) {
        console.error("Razorpay failed to load:", error);
        alert("Payment system is currently offline. Please try again later.");
    }
}
