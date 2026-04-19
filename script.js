/**
 * AKS GROUP | COMMAND LOGIC v2.0
 * Architect: Abakash Kumar Sah
 * Location: Durgapur, West Bengal, India
 */

// 1. SERVICE CONFIGURATION GRID
const AKS_SERVICES = {
    'biopulse': { name: 'Bio Pulse Healthcare', fee: 1999, description: 'Metabolic & Nutrition Assessment' },
    'innovista': { name: 'Innovista Advisory', fee: 15000, description: 'Business Scaling Strategy' },
    'strategix': { name: 'Strategix Law', fee: 4999, description: 'Corporate & IP Protection' },
    'quantum': { name: 'Quantum Edge Tech', fee: 9999, description: 'AI Infrastructure Deployment' },
    'fortuna': { name: 'Fortuna Capital', fee: 2499, description: 'Wealth Management Assessment' }
};

// 2. INITIALIZE GLOBAL RECIPIENT DATA
const CHAIRMAN_CONTACT = "7699854611";
const CHAIRMAN_EMAIL = "aksgroup.abakash@gmail.com";

/**
 * TRIGGER AUTOMATED INTAKE & PAYMENT
 * @param {string} divisionKey - The key from AKS_SERVICES
 */
function processDivisionEntry(divisionKey) {
    const service = AKS_SERVICES[divisionKey];
    
    if (!service) {
        console.error("Invalid Division Access Attempted.");
        return;
    }

    // Initialize Razorpay Options
    const options = {
        "key": "rzp_live_XXXXXXXXXXXXXX", // REPLACE WITH YOUR LIVE RAZORPAY KEY
        "amount": service.fee * 100, // Amount in paise
        "currency": "INR",
        "name": "AKS GROUP | " + service.name,
        "description": service.description,
        "image": "https://aksgroupindia.github.io/aksgroup/logo.png", // Ensure your logo is hosted
        "prefill": {
            "name": "Elite Client",
            "email": CHAIRMAN_EMAIL,
            "contact": CHAIRMAN_CONTACT
        },
        "notes": {
            "division": service.name,
            "founder": "Abakash Kumar Sah"
        },
        "handler": function (response) {
            handleSuccess(response, service.name);
        },
        "theme": {
            "color": "#C5A059" // AKS Corporate Gold
        }
    };

    try {
        const rzp1 = new Razorpay(options);
        rzp1.open();
    } catch (error) {
        // Fallback to Direct UPI QR if SDK fails
        console.warn("Payment SDK redirected to Secure UPI Terminal.");
        window.location.href = "#payment-terminal";
    }
}

/**
 * HANDLE SUCCESSFUL SETTLEMENT & AGENTIC TRIGGER
 */
function handleSuccess(response, serviceName) {
    console.log("SETTLEMENT_VERIFIED: ", response.razorpay_payment_id);
    
    // Display Confirmation to Client
    const statusMsg = `Settlement Complete. Division: ${serviceName}. Your Agentic Report is being compiled by the AKS Intelligence engine.`;
    alert(statusMsg);

    // Logic for Data Persistence / Email Trigger
    // In a zero-overhead setup, you can use Formspree or EmailJS here to send the lead data.
}

/**
 * UI PERFORMANCE LOGIC: Glassmorphism & Scroll Effects
 */
document.addEventListener('DOMContentLoaded', () => {
    // Fade-in effect for the Monolith UI
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);

    console.log("AKS GROUP | SYSTEM_ONLINE | WELCOME CHAIRMAN ABAKASH KUMAR SAH");
});
