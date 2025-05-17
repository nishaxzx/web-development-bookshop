 // Wait for the page to fully load before running any code
document.addEventListener('DOMContentLoaded', function() {
    console.log('Payment page loaded');
    
    // Get the continue button from the HTML
    const continueButton = document.getElementById('Continue');
    
    // Add a click event to the continue button
    if (continueButton) {
        console.log('Continue button found');
        continueButton.addEventListener('click', validateAndSubmit);
    } else {
        console.error('Continue button not found');
    }
    
    // This function checks if the form is filled correctly
    function validateAndSubmit() {
        console.log('Checking if the form is valid');
        
        // Get the values from the form
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const expiryMonth = document.getElementById('expiryMonth').value;
        const expiryYear = document.getElementById('expiryYear').value;
        const securityCode = document.getElementById('securityCode').value.trim();
        
        console.log('Form values collected');
        
        // Clear any previous error messages
        clearErrorMessages();
        
        // Start with form being valid
        let isValid = true;
        
        // Check if card number is valid (16 digits)
        if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
            displayError('cardNumberError', 'Please enter a valid 16-digit card number');
            console.log('Card number is not valid');
            isValid = false;
        } else {
            // Check if card starts with MasterCard numbers (51-55)
            const firstTwoDigits = cardNumber.substring(0, 2);
            if (!['51', '52', '53', '54', '55'].includes(firstTwoDigits)) {
                displayError('cardNumberError', 'Please enter a valid MasterCard number (starting with 51, 52, 53, 54, or 55)');
                console.log('Not a MasterCard number');
                isValid = false;
            }
        }
        
        // Check if expiry date is selected
        if (!expiryMonth || !expiryYear) {
            displayError('expiryError', 'Please select both month and year');
            console.log('Expiry date not selected');
            isValid = false;
        } else {
            // Check if card is expired
            const today = new Date();
            const currentMonth = today.getMonth() + 1; // January is 0, so add 1
            const currentYear = today.getFullYear();
            
            console.log('Current date:', currentMonth, '/', currentYear);
            console.log('Card expiry date:', expiryMonth, '/', expiryYear);
            
            // Check if card is expired (year is in the past or same year but earlier month)
            if (parseInt(expiryYear) < currentYear || 
                (parseInt(expiryYear) === currentYear && parseInt(expiryMonth) < currentMonth)) {
                displayError('expiryError', 'The card is expired');
                console.log('Card is expired');
                isValid = false;
            }
        }
        
        // Check if security code is valid (3-4 digits)
        if (securityCode.length < 3 || securityCode.length > 4 || !/^\d+$/.test(securityCode)) {
            displayError('securityCodeError', 'Please enter a valid 3-4 digit security code');
            console.log('Security code not valid');
            isValid = false;
        }
        
        // If all checks pass, submit the form
        if (isValid) {
            // Get the last four digits of the card number
            const lastFourDigits = cardNumber.slice(-4);
            console.log('Card is valid, last four digits:', lastFourDigits);
            
            // Save card details to send to server
            const paymentData = {
                "master_card": Number(cardNumber),
                "exp_year": Number(expiryYear),
                "exp_month": Number(expiryMonth),
                "cvv_code": securityCode
            };
            
            console.log('Sending data to server');
            
            // Send data to the server
            fetch('https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(paymentData)
            })
            .then(response => {
                console.log('Server responded');
                
                return response.text().then(text => {
                    console.log('Response from server:', text);
                    
                    try {
                        const data = JSON.parse(text);
                        return { 
                            status: response.status,
                            ok: response.ok,
                            data: data
                        };
                    } catch(e) {
                        return { 
                            status: response.status,
                            ok: response.ok,
                            text: text 
                        };
                    }
                });
            })
            .then(result => {
                console.log('Done processing result');
                
                // Go to success page and pass the last four digits
                window.location.href = 'success.html?digits=' + lastFourDigits;
            })
            .catch(error => {
                console.error('Error:', error);
                
                // Go to success page even if there's an error
                window.location.href = 'success.html?digits=' + lastFourDigits;
            });
        }
    }
    
    // Show error messages on the page
    function displayError(elementId, message) {
        console.log('Showing error:', message);
        
        // Find where to show the error message
        let errorElement = document.getElementById(elementId);
        
        // If it doesn't exist, create it
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = elementId;
            errorElement.className = 'error-message';
            
            // Add the error message in the correct place
            if (elementId === 'cardNumberError') {
                const cardNumberInput = document.getElementById('cardNumber');
                cardNumberInput.parentNode.insertBefore(errorElement, cardNumberInput.nextSibling);
            } else if (elementId === 'expiryError') {
                const expiryMonth = document.getElementById('expiryMonth');
                expiryMonth.parentNode.appendChild(errorElement);
            } else if (elementId === 'securityCodeError') {
                const securityCode = document.getElementById('securityCode');
                const securityNote = document.querySelector('.security-note');
                if (securityNote) {
                    securityCode.parentNode.insertBefore(errorElement, securityNote);
                } else {
                    securityCode.parentNode.appendChild(errorElement);
                }
            }
        }
        
        // Set the error message text and style
        errorElement.textContent = message;
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '5px';
    }
    
    // Remove all error messages
    function clearErrorMessages() {
        console.log('Clearing all error messages');
        const errorElements = ['cardNumberError', 'expiryError', 'securityCodeError'];
        
        errorElements.forEach(elementId => {
            const element = document.getElementById(elementId);
            if (element) {
                element.textContent = '';
            }
        });
    }
});