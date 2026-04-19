/**
 * AKS GROUP - CORE SYSTEM LOGIC
 * Master Controller for Payments and Data Persistence
 * Verified Contact: 7699854611 | aksgroup.abakash@gmail.com
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECT THE FORM & BUTTON
    const assessmentForm = document.querySelector('form');
    const payButton = document.getElementById('payButton');

    if (payButton && assessmentForm) {
        payButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 2. VALIDATE FORM DATA
            // Ensures user doesn't skip required fields
            if (!assessmentForm.checkValidity()) {
                alert("Please complete all required fields before generating your bespoke report.");
                assessmentForm.reportValidity();
                return;
            }

            // 3. CAPTURE FORM DATA
            const formData = new FormData(assessmentForm);
            const data = Object.fromEntries(formData.entries());
            
            // Store data locally for retrieval on the thank-you page
            localStorage.setItem('aks_report_data', JSON.stringify(data));

            // 4. TRIGGER RAZORPAY MODAL
            handlePayment(data);
        });
    }
});

/**
 * RAZORPAY INTEGRATION
 * Dynamically calculates price based on the current division page
 */
function handlePayment(userData) {
    const pagePath = window.location.pathname.toLowerCase();
    
    // Default Price (Biopulse)
    let amount = 1999; 
    
    // Dynamic Price Routing based on URL
    if (pagePath.includes('fortuna')) amount = 2499;
    else if (pagePath.includes('strategix')) amount = 4999;
    else if (pagePath.includes('quantum')) amount = 9999;
    else if (pagePath.includes('innovista')) amount = 15000;

    const options = {
        "key": "rzp_test_XXXXXXXXXXXXXX", // Replace with your LIVE Key from Razorpay Dashboard
        "amount": amount * 100, // Razorpay processes in Paise (INR * 100)
        "currency": "INR",
        "name": "AKS Group",
        "description": "Premium Intelligence Report",
        "image": "https://aksgroupindia.github.io/aksgroup/logo.png", 
        "handler": function (response) {
            // This code executes AFTER a successful payment
            console.log("Transaction ID:", response.razorpay_payment_id);
            
            // Redirect to the success page
            window.location.href = `thank-you.html?payment_id=${response.razorpay_payment_id}`;
        },
        "prefill": {
            "name": userData.name || "AKS Client",
            "email": "aksgroup.abakash@gmail.com",
            "contact": "7699854611"
        },
        "theme": {
            "color": "#C5A059" // AKS Signature Gold
        },
        "modal": {
            "ondismiss": function(){
                console.log('Payment modal closed by user');
            }
        }
    };

    try {
        const rzp1 = new Razorpay(options);
        rzp1.open();
    } catch (error) {
        console.error("Payment Gateway Error:", error);
        alert("The payment system is currently initializing. Please try again in a few moments or use the Direct UPI scan option.");
    }
}
