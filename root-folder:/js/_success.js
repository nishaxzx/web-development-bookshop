 // Wait for the page to fully load before running any code
document.addEventListener('DOMContentLoaded', function() {
    console.log('Success page loaded');
    
    // Variable to store the last four digits of the card
    let lastFourDigits = null;
    
    // First, try to get the digits from the URL
    try {
        // Get parameters from the URL (like ?digits=1234)
        const urlParams = new URLSearchParams(window.location.search);
        lastFourDigits = urlParams.get('digits');
        console.log('Got digits from URL:', lastFourDigits);
    } catch (err) {
        console.error('Problem getting URL parameters:', err);
    }
    
    // If not found in URL, try to get from browser storage
    if (!lastFourDigits) {
        try {
            lastFourDigits = localStorage.getItem('cardLastFourDigits');
            console.log('Got digits from storage:', lastFourDigits);
            // Remove from storage after using it
            localStorage.removeItem('cardLastFourDigits');
        } catch (err) {
            console.error('Problem getting from storage:', err);
        }
    }
    
    // Find where to display the card number
    const cardNumberElement = document.getElementById('cardNumber');
    
    // Show the last four digits or a default message
    if (lastFourDigits) {
        console.log('Showing card number ending in:', lastFourDigits);
        cardNumberElement.textContent = `Your credit card number ends in **** **** **** ${lastFourDigits}`;
    } else {
        console.log('No digits found, showing default message');
        cardNumberElement.textContent = 'Your credit card has been processed successfully';
    }
});