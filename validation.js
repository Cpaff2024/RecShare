document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const userTypeSelect = document.getElementById('user-type');
    const additionalInfoDiv = document.getElementById('additional-info');

    // Validation functions
    const validators = {
        name: function(input) {
            const value = input.value.trim();
            const nameError = document.getElementById('name-error');
            
            if (value.length < 2) {
                nameError.textContent = 'Name must be at least 2 characters long';
                return false;
            }
            
            if (!/^[A-Za-z\s'-]+$/.test(value)) {
                nameError.textContent = 'Name can only contain letters, spaces, hyphens, and apostrophes';
                return false;
            }
            
            nameError.textContent = '';
            return true;
        },
        
        email: function(input) {
            const value = input.value.trim();
            const emailError = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(value)) {
                emailError.textContent = 'Please enter a valid email address';
                return false;
            }
            
            emailError.textContent = '';
            return true;
        },
        
        userType: function(select) {
            const userTypeError = document.getElementById('user-type-error');
            
            if (!select.value) {
                userTypeError.textContent = 'Please select a user type';
                return false;
            }
            
            userTypeError.textContent = '';
            return true;
        },
        
        additionalInfo: function() {
            const userType = document.getElementById('user-type').value;
            
            if (userType === 'agency') {
                const agencyName = document.getElementById('agency-name');
                const companySize = document.getElementById('company-size');
                
                if (!agencyName.value.trim()) {
                    agencyName.nextElementSibling.textContent = 'Agency name is required';
                    return false;
                }
                
                if (!companySize.value) {
                    companySize.nextElementSibling.textContent = 'Company size is required';
                    return false;
                }
                
                return true;
            } else if (userType === 'solo') {
                const yearsInBusiness = document.getElementById('years-in-business');
                
                if (!yearsInBusiness.value) {
                    yearsInBusiness.nextElementSibling.textContent = 'Years in business is required';
                    return false;
                }
                
                return true;
            }
            
            return true;
        },
        
        consent: function() {
            const consentCheckbox = document.getElementById('consent');
            const consentError = document.getElementById('consent-error');
            
            if (!consentCheckbox.checked) {
                consentError.textContent = 'You must agree to the privacy policy';
                return false;
            }
            
            consentError.textContent = '';
            return true;
        }
    };

    // Dropdown options for each user type
    const dropdownOptions = {
        agency: {
            companySize: [
                { value: '', label: 'Select Company Size' },
                { value: '1-10', label: '1-10 employees' },
                { value: '11-50', label: '11-50 employees' },
                { value: '51-100', label: '51-100 employees' },
                { value: '100+', label: '100+ employees' }
            ]
        },
        solo: {
            yearsInBusiness: [
                { value: '', label: 'Select Years of Experience' },
                { value: '0-1', label: '0-1 years' },
                { value: '1-3', label: '1-3 years' },
                { value: '3-5', label: '3-5 years' },
                { value: '5+', label: '5+ years' }
            ]
        }
    };

    // Function to create dropdown
    function createDropdown(name, options, required = true) {
        const select = document.createElement('select');
        select.id = name;
        select.name = name;
        if (required) select.required = true;

        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label;
            select.appendChild(optionElement);
        });

        return select;
    }

    // Dynamic additional fields
    userTypeSelect.addEventListener('change', function() {
        // Clear previous additional info
        additionalInfoDiv.innerHTML = '';
        
        if (this.value === 'agency') {
            // Agency additional fields
            const agencyNameDiv = document.createElement('div');
            agencyNameDiv.className = 'form-group';
            const agencyNameLabel = document.createElement('label');
            agencyNameLabel.innerHTML = 'Agency Name <span class="required">*</span>';
            const agencyNameInput = document.createElement('input');
            agencyNameInput.type = 'text';
            agencyNameInput.id = 'agency-name';
            agencyNameInput.name = 'agency-name';
            agencyNameInput.required = true;
            agencyNameInput.minLength = 2;
            agencyNameInput.maxLength = 100;
            const agencyNameError = document.createElement('span');
            agencyNameError.className = 'error';

            agencyNameDiv.appendChild(agencyNameLabel);
            agencyNameDiv.appendChild(agencyNameInput);
            agencyNameDiv.appendChild(agencyNameError);

            // Company size dropdown
            const companySizeDiv = document.createElement('div');
            companySizeDiv.className = 'form-group';
            const companySizeLabel = document.createElement('label');
            companySizeLabel.innerHTML = 'Company Size <span class="required">*</span>';
            const companySizeSelect = createDropdown('company-size', dropdownOptions.agency.companySize);
            const companySizeError = document.createElement('span');
            companySizeError.className = 'error';

            companySizeDiv.appendChild(companySizeLabel);
            companySizeDiv.appendChild(companySizeSelect);
            companySizeDiv.appendChild(companySizeError);

            // Append to additional info
            additionalInfoDiv.appendChild(agencyNameDiv);
            additionalInfoDiv.appendChild(companySizeDiv);

        } else if (this.value === 'solo') {
            // Solo recruiter additional fields
            const yearsInBusinessDiv = document.createElement('div');
            yearsInBusinessDiv.className = 'form-group';
            const yearsInBusinessLabel = document.createElement('label');
            yearsInBusinessLabel.innerHTML = 'Years in Recruitment <span class="required">*</span>';
            const yearsInBusinessSelect = createDropdown('years-in-business', dropdownOptions.solo.yearsInBusiness);
            const yearsInBusinessError = document.createElement('span');
            yearsInBusinessError.className = 'error';

            yearsInBusinessDiv.appendChild(yearsInBusinessLabel);
            yearsInBusinessDiv.appendChild(yearsInBusinessSelect);
            yearsInBusinessDiv.appendChild(yearsInBusinessError);

            // Append to additional info
            additionalInfoDiv.appendChild(yearsInBusinessDiv);
        }
    });

    // Real-time validation
    form.addEventListener('input', function(e) {
        if (e.target.id === 'name') validators.name(e.target);
        if (e.target.id === 'email') validators.email(e.target);
    });
});