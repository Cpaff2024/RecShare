document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Perform final validation
        const isNameValid = validators.name(document.getElementById('name'));
        const isEmailValid = validators.email(document.getElementById('email'));
        const isUserTypeValid = validators.userType(document.getElementById('user-type'));
        const isAdditionalInfoValid = validators.additionalInfo();
        const isConsentValid = validators.consent();

        // Check if all validations pass
        if (!(isNameValid && isEmailValid && isUserTypeValid && 
              isAdditionalInfoValid && isConsentValid)) {
            return;
        }

        // Disable submit button and show loading state
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        // Collect form data
        const formData = new FormData(form);
        
        try {
            // Replace 'YOUR_FORMSPREE_ENDPOINT' with the actual endpoint from Formspree
            const response = await fetch('https://formspree.io/f/xdkovqzv', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            // Handle successful submission
            form.innerHTML = `
                <div class="success-message">
                    <h2>Thank You!</h2>
                    <p>You've been added to the RecShare waiting list. We'll contact you soon.</p>
                </div>
            `;
        } catch (error) {
            // Handle errors
            console.error('Submission error:', error);
            
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = 'We couldn\'t process your submission. Please try again later.';
            
            form.insertBefore(errorMessage, form.firstChild);
            
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Join Waiting List';
        }
    });
});