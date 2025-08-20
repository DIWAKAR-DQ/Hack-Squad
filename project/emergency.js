document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const callAmbulanceBtn = document.getElementById('callAmbulance');
    const callPoliceBtn = document.getElementById('callPolice');
    const callFireBtn = document.getElementById('callFire');
    const nearbyHospitalsBtn = document.getElementById('nearbyHospitals');
    const addContactBtn = document.getElementById('addContactBtn');
    const addContactModal = document.getElementById('addContactModal');
    const closeModalBtns = document.querySelectorAll('.close-btn');
    const cancelContactBtn = document.getElementById('cancelContactBtn');
    const contactForm = document.getElementById('contactForm');
    const contactsGrid = document.querySelector('.contacts-grid');
    const firstAidCards = document.querySelectorAll('.first-aid-card');
    const firstAidModal = document.getElementById('firstAidModal');
    const firstAidContent = document.getElementById('firstAidContent');
    const shareLocationBtn = document.getElementById('shareLocationBtn');
    const userLocationEl = document.getElementById('userLocation');
    const viewMedicalIdBtn = document.getElementById('viewMedicalId');
    const viewMedicationsBtn = document.getElementById('viewMedications');

    // First Aid Guide Data
    const firstAidGuides = {
        cpr: {
            title: 'Cardiopulmonary Resuscitation (CPR)',
            steps: [
                {
                    title: 'Check Responsiveness',
                    description: 'Check if the person is responsive by tapping their shoulder and shouting, "Are you okay?" If there is no response, proceed to the next step.'
                },
                {
                    title: 'Call for Help',
                    description: 'If you\'re alone, call emergency services (112/911) or ask someone else to call. Get an AED if available.'
                },
                {
                    title: 'Open the Airway',
                    description: 'Place the person on their back on a firm, flat surface. Tilt their head back slightly and lift the chin to open the airway.'
                },
                {
                    title: 'Check for Breathing',
                    description: 'Look, listen, and feel for no more than 10 seconds. Occasional gasps are not normal breathing.'
                },
                {
                    title: 'Begin Chest Compressions',
                    description: 'Place the heel of one hand on the center of the chest. Place your other hand on top and interlock your fingers. Position yourself directly over the chest and press down hard and fast (2-2.4 inches deep) at a rate of 100-120 compressions per minute.'
                },
                {
                    title: 'Give Rescue Breaths',
                    description: 'After 30 compressions, give 2 rescue breaths. Pinch the nose shut, make a complete seal over the person\'s mouth, and blow in for about 1 second to make the chest rise.'
                },
                {
                    title: 'Continue CPR',
                    description: 'Continue cycles of 30 compressions and 2 breaths until help arrives or the person shows signs of life.'
                }
            ],
            warning: 'Only perform CPR if you are trained. If untrained, provide hands-only CPR (chest compressions only) until help arrives.'
        },
        choking: {
            title: 'Heimlich Maneuver for Choking',
            steps: [
                {
                    title: 'Assess the Situation',
                    description: 'Determine if the person can speak, cough, or breathe. If they cannot, they need immediate help.'
                },
                {
                    title: 'Stand Behind the Person',
                    description: 'Position yourself behind the person. For children and adults, reach around their waist. For pregnant or obese individuals, place hands higher, around the chest.'
                },
                {
                    title: 'Make a Fist',
                    description: 'Place the thumb side of your fist against the middle of the person\'s abdomen, just above the navel and below the ribcage.'
                },
                {
                    title: 'Grasp and Thrust',
                    description: 'Grasp your fist with your other hand. Give quick, upward thrusts into the abdomen. Each thrust should be a separate and distinct movement.'
                },
                {
                    title: 'Continue Until Effective',
                    description: 'Continue abdominal thrusts until the object is expelled or the person becomes unconscious.'
                },
                {
                    title: 'If Unconscious',
                    description: 'If the person becomes unconscious, begin CPR.'
                }
            ],
            warning: 'Never perform the Heimlich maneuver on someone who is still able to cough, speak, or breathe. Encourage them to keep coughing to clear the obstruction.'
        },
        burns: {
            title: 'First Aid for Burns',
            steps: [
                {
                    title: 'Stop the Burning Process',
                    description: 'Remove the person from the source of the burn. If clothing is on fire, have the person stop, drop, and roll.'
                },
                {
                    title: 'Cool the Burn',
                    description: 'Hold the burned area under cool (not cold) running water for 10-15 minutes or until the pain eases. Do not use ice or iced water.'
                },
                {
                    title: 'Remove Constrictive Items',
                    description: 'Gently remove any jewelry or tight clothing near the burn before swelling begins.'
                },
                {
                    title: 'Cover the Burn',
                    description: 'Cover the burn with a sterile, non-stick bandage or clean cloth. Do not apply butter, oil, or home remedies.'
                },
                {
                    title: 'Take Pain Relievers',
                    description: 'Over-the-counter pain relievers like ibuprofen or acetaminophen can help with pain and swelling.'
                },
                {
                    title: 'When to Seek Medical Help',
                    description: 'Seek emergency medical care if the burn is larger than 3 inches, on the face, hands, feet, genitals, or major joints, or if it\'s a deep burn.'
                }
            ],
            warning: 'Do not break blisters, as this increases the risk of infection. For chemical burns, brush off any dry chemicals, remove contaminated clothing, and rinse with running water for at least 20 minutes.'
        },
        bleeding: {
            title: 'Controlling Severe Bleeding',
            steps: [
                {
                    title: 'Wear Gloves',
                    description: 'If available, put on disposable gloves to protect yourself from bloodborne pathogens.'
                },
                {
                    title: 'Apply Direct Pressure',
                    description: 'Place a clean cloth or sterile dressing over the wound and press down firmly with the palm of your hand.'
                },
                {
                    title: 'Elevate the Wound',
                    description: 'Raise the injured area above the level of the heart to help reduce blood flow.'
                },
                {
                    title: 'Add More Dressing',
                    description: 'If blood soaks through, add more dressings on top. Do not remove the original dressing.'
                },
                {
                    title: 'Apply Pressure to Pressure Points',
                    description: 'If bleeding doesn\'t stop, apply pressure to the appropriate pressure point between the wound and the heart.'
                },
                {
                    title: 'Apply a Tourniquet (If Necessary)',
                    description: 'As a last resort for life-threatening bleeding, apply a tourniquet 2-3 inches above the wound, but not on a joint.'
                }
            ],
            warning: 'Seek emergency medical help for severe bleeding that doesn\'t stop with direct pressure, or if the person shows signs of shock (pale, clammy skin, rapid pulse, rapid breathing, nausea, or confusion).'
        }
    };

    // Sample emergency contacts data (in a real app, this would come from a database)
    let emergencyContacts = [
        {
            id: 1,
            name: 'Dr. Rajesh Kumar',
            type: 'Family Physician',
            phone: '+91 98XXXXXX01',
            icon: 'user-md'
        },
        {
            id: 2,
            name: 'City General Hospital',
            type: '24/7 Emergency',
            phone: '+91 80 XXXX 4567',
            icon: 'hospital'
        }
    ];

    // Initialize the page
    function init() {
        // Initialize modals
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        
        renderEmergencyContacts();
        setupEventListeners();
        checkLocationPermission();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Emergency call buttons - using mousedown instead of click for faster response
        if (callAmbulanceBtn) {
            callAmbulanceBtn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                makeEmergencyCall('112', 'Ambulance');
            });
        }
        if (callPoliceBtn) {
            callPoliceBtn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                makeEmergencyCall('100', 'Police');
            });
        }
        if (callFireBtn) {
            callFireBtn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                makeEmergencyCall('101', 'Fire Department');
            });
        }
        
        // Nearby hospitals button
        if (nearbyHospitalsBtn) nearbyHospitalsBtn.addEventListener('click', findNearbyHospitals);
        
        // Modal buttons
        if (addContactBtn) addContactBtn.addEventListener('click', () => openModal(addContactModal));
        if (cancelContactBtn) cancelContactBtn.addEventListener('click', () => closeModal(addContactModal));
        
        // Close modals when clicking the X
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                closeModal(modal);
            });
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                closeModal(e.target);
            }
        });
        
        // Form submission
        if (contactForm) {
            contactForm.addEventListener('submit', handleAddContact);
        }
        
        // First aid cards
        firstAidCards.forEach(card => {
            card.addEventListener('click', () => {
                const guideId = card.dataset.guide;
                showFirstAidGuide(guideId);
            });
        });
        
        // Share location button
        if (shareLocationBtn) {
            shareLocationBtn.addEventListener('click', shareLocation);
        }
        
        // Medical ID button
        if (viewMedicalIdBtn) {
            viewMedicalIdBtn.addEventListener('click', showMedicalId);
        }
        
        // Medications button
        if (viewMedicationsBtn) {
            viewMedicationsBtn.addEventListener('click', showMedications);
        }
    }
    
    // Make an emergency call
    function makeEmergencyCall(number, service) {
        // Haptic feedback if available
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }
        
        // In a real app, this would initiate a phone call
        // For demo purposes, we'll show a more user-friendly confirmation
        const callNow = confirm(`🚨 EMERGENCY CALL\n\nService: ${service}\nNumber: ${number}\n\nCall now?`);
        
        if (callNow) {
            // In a real app, this would be: window.location.href = `tel:${number}`;
            console.log(`Calling ${service} at ${number}...`);
            
            // Show calling UI feedback
            const callUI = document.createElement('div');
            callUI.style.position = 'fixed';
            callUI.style.top = '0';
            callUI.style.left = '0';
            callUI.style.width = '100%';
            callUI.style.padding = '20px';
            callUI.style.background = '#e74c3c';
            callUI.style.color = 'white';
            callUI.style.textAlign = 'center';
            callUI.style.zIndex = '9999';
            callUI.style.fontSize = '1.2em';
            callUI.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
            callUI.innerHTML = `
                <div>🕒 Calling ${service}...</div>
                <div style="font-size: 0.8em; opacity: 0.9;">${number}</div>
                <button id="cancelCall" style="margin-top: 10px; padding: 5px 15px; background: white; color: #e74c3c; border: none; border-radius: 20px; cursor: pointer;">Cancel</button>
            `;
            document.body.appendChild(callUI);
            
            // Add cancel button handler
            document.getElementById('cancelCall')?.addEventListener('click', () => {
                document.body.removeChild(callUI);
                console.log('Call cancelled');
            });
            
            // Auto-remove after 10 seconds
            setTimeout(() => {
                if (document.body.contains(callUI)) {
                    document.body.removeChild(callUI);
                }
            }, 10000);
            
            // Log the emergency call
            logEmergencyCall(service, number);
        }
    }
    
    // Log emergency calls (in a real app, this would be sent to a server)
    function logEmergencyCall(service, number) {
        const timestamp = new Date().toISOString();
        console.log(`Emergency call logged: ${service} (${number}) at ${timestamp}`);
        
        // In a real app, you might want to store this in local storage or send to a server
        const emergencyLogs = JSON.parse(localStorage.getItem('emergencyLogs') || '[]');
        emergencyLogs.push({ service, number, timestamp });
        localStorage.setItem('emergencyLogs', JSON.stringify(emergencyLogs));
    }
    
    // Find nearby hospitals (in a real app, this would use geolocation and a maps API)
    function findNearbyHospitals() {
        if (navigator.geolocation) {
            showLoading('Finding nearby hospitals...');
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // In a real app, you would use these coordinates with a maps API
                    console.log(`Searching for hospitals near ${latitude}, ${longitude}`);
                    
                    // Simulate API call
                    setTimeout(() => {
                        hideLoading();
                        alert('This feature would show nearby hospitals on a map in a real application.');
                    }, 1500);
                },
                (error) => {
                    hideLoading();
                    console.error('Error getting location:', error);
                    alert('Unable to get your location. Please check your location settings.');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    }
    
    // Check location permission and update UI
    function checkLocationPermission() {
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' })
                .then(permissionStatus => {
                    updateLocationStatus(permissionStatus.state);
                    
                    permissionStatus.onchange = () => {
                        updateLocationStatus(permissionStatus.state);
                    };
                });
        }
    }
    
    // Update location status in the UI
    function updateLocationStatus(status) {
        if (userLocationEl) {
            if (status === 'granted') {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        // In a real app, you would reverse geocode these coordinates to get an address
                        userLocationEl.textContent = `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`;
                    },
                    (error) => {
                        userLocationEl.textContent = 'Location available but could not be retrieved';
                    }
                );
            } else if (status === 'prompt') {
                userLocationEl.textContent = 'Location permission not yet requested';
            } else {
                userLocationEl.textContent = 'Location access denied';
            }
        }
    }
    
    // Share user's location
    async function shareLocation() {
        // Show loading state
        const shareBtn = shareLocationBtn;
        const originalText = shareBtn.innerHTML;
        shareBtn.disabled = true;
        shareBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Getting location...';
        
        try {
            // First check if geolocation is available
            if (!navigator.geolocation) {
                throw new Error('Geolocation is not supported by your browser');
            }
            
            // Get current position
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                });
            });
            
            const { latitude, longitude } = position.coords;
            const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
            
            // Update UI with coordinates
            if (userLocationEl) {
                userLocationEl.innerHTML = `
                    <span style="display: block; margin-bottom: 5px;">
                        <i class="fas fa-map-marker-alt"></i> 
                        ${latitude.toFixed(6)}, ${longitude.toFixed(6)}
                    </span>
                    <small style="opacity: 0.8;">(Tap to copy)</small>
                `;
                
                // Make coordinates copyable
                userLocationEl.style.cursor = 'pointer';
                userLocationEl.title = 'Click to copy coordinates';
                userLocationEl.addEventListener('click', () => {
                    navigator.clipboard.writeText(`${latitude}, ${longitude}`);
                    const originalText = userLocationEl.innerHTML;
                    userLocationEl.innerHTML = '<i class="fas fa-check"></i> Copied to clipboard!';
                    setTimeout(() => {
                        userLocationEl.innerHTML = originalText;
                    }, 2000);
                });
            }
            
            // Try to use Web Share API if available
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'My Current Location',
                        text: 'Here is my current location in case of emergency:',
                        url: locationUrl
                    });
                    console.log('Location shared successfully');
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.error('Error sharing location:', err);
                        // Fallback to showing the URL
                        showLocationShareFallback(locationUrl);
                    }
                }
            } else {
                // Fallback for browsers that don't support Web Share API
                showLocationShareFallback(locationUrl);
            }
        } catch (error) {
            console.error('Error getting location:', error);
            alert(`Error: ${error.message || 'Unable to get your location. Please check your location settings.'}`);
        } finally {
            // Reset button state
            shareBtn.disabled = false;
            shareBtn.innerHTML = originalText;
        }
        
        function showLocationShareFallback(url) {
            const fallbackDiv = document.createElement('div');
            fallbackDiv.style.position = 'fixed';
            fallbackDiv.style.bottom = '20px';
            fallbackDiv.style.left = '50%';
            fallbackDiv.style.transform = 'translateX(-50%)';
            fallbackDiv.style.background = '#2c3e50';
            fallbackDiv.style.color = 'white';
            fallbackDiv.style.padding = '15px 20px';
            fallbackDiv.style.borderRadius = '8px';
            fallbackDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            fallbackDiv.style.zIndex = '1000';
            fallbackDiv.style.maxWidth = '90%';
            fallbackDiv.style.wordBreak = 'break-all';
            fallbackDiv.innerHTML = `
                <div style="margin-bottom: 10px;">Share this location URL:</div>
                <div style="background: rgba(255,255,255,0.1); padding: 8px; border-radius: 4px; margin-bottom: 10px; font-family: monospace;">
                    ${url}
                </div>
                <button id="copyLocationUrl" style="background: #3498db; color: white; border: none; padding: 5px 15px; border-radius: 4px; cursor: pointer; margin-right: 5px;">
                    Copy URL
                </button>
                <button id="closeLocationShare" style="background: #e74c3c; color: white; border: none; padding: 5px 15px; border-radius: 4px; cursor: pointer;">
                    Close
                </button>
            `;
            
            document.body.appendChild(fallbackDiv);
            
            // Add event listeners
            document.getElementById('copyLocationUrl')?.addEventListener('click', () => {
                navigator.clipboard.writeText(url);
                const btn = document.getElementById('copyLocationUrl');
                if (btn) {
                    const originalText = btn.textContent;
                    btn.textContent = 'Copied!';
                    btn.style.background = '#2ecc71';
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.background = '#3498db';
                    }, 2000);
                }
            });
            
            document.getElementById('closeLocationShare')?.addEventListener('click', () => {
                document.body.removeChild(fallbackDiv);
            });
            
            // Auto-remove after 30 seconds
            setTimeout(() => {
                if (document.body.contains(fallbackDiv)) {
                    document.body.removeChild(fallbackDiv);
                }
            }, 30000);
        }
    }
    
    // Show medical ID (in a real app, this would show the user's medical information)
    function showMedicalId() {
        // In a real app, this would show the user's medical information
        // For demo purposes, we'll just show an alert
        alert('This would display your medical ID information in a real application.');
    }
    
    // Show medications (in a real app, this would show the user's medication list)
    function showMedications() {
        // In a real app, this would show the user's medication list
        // For demo purposes, we'll just show an alert
        alert('This would display your current medications in a real application.');
    }
    
    // Render emergency contacts
    function renderEmergencyContacts() {
        if (!contactsGrid) return;
        
        // Clear existing contacts (except the first two default ones)
        const defaultContacts = Array.from(contactsGrid.children).slice(0, 2);
        contactsGrid.innerHTML = '';
        
        // Add the default contacts back
        defaultContacts.forEach(contact => {
            contactsGrid.appendChild(contact);
        });
        
        // Add user's emergency contacts
        emergencyContacts.forEach(contact => {
            const contactElement = createContactElement(contact);
            contactsGrid.appendChild(contactElement);
        });
        
        // Add event listeners to the new contact elements
        setupContactEventListeners();
    }
    
    // Create a contact element
    function createContactElement(contact) {
        const contactElement = document.createElement('div');
        contactElement.className = 'contact-card';
        contactElement.dataset.id = contact.id;
        
        contactElement.innerHTML = `
            <div class="contact-avatar">
                <i class="fas fa-${contact.icon}"></i>
            </div>
            <div class="contact-info">
                <h3>${contact.name}</h3>
                <p class="contact-type">${contact.type}</p>
                <p class="contact-phone"><i class="fas fa-phone"></i> ${contact.phone}</p>
            </div>
            <div class="contact-actions">
                <button class="icon-btn call-btn" data-phone="${contact.phone}">
                    <i class="fas fa-phone"></i>
                </button>
                <button class="icon-btn delete-contact" data-id="${contact.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        return contactElement;
    }
    
    // Set up event listeners for contact elements
    function setupContactEventListeners() {
        // Call buttons
        document.querySelectorAll('.call-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const phoneNumber = btn.dataset.phone;
                if (phoneNumber) {
                    makeEmergencyCall(phoneNumber, 'Emergency Contact');
                }
            });
        });
        
        // Delete buttons
        document.querySelectorAll('.delete-contact').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const contactId = parseInt(btn.dataset.id);
                if (confirm('Are you sure you want to delete this contact?')) {
                    deleteContact(contactId);
                }
            });
        });
    }
    
    // Handle adding a new contact
    function handleAddContact(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value.trim();
        const type = document.getElementById('contactType').value.trim();
        const phone = document.getElementById('contactPhone').value.trim();
        
        if (!name || !type || !phone) {
            alert('Please fill in all fields');
            return;
        }
        
        const newContact = {
            id: Date.now(), // Simple ID generation (in a real app, use a proper ID generator)
            name,
            type,
            phone,
            icon: 'user' // Default icon
        };
        
        // Add the new contact
        emergencyContacts.push(newContact);
        
        // Save to local storage (in a real app, this would be saved to a database)
        saveContacts();
        
        // Update the UI
        renderEmergencyContacts();
        
        // Close the modal
        closeModal(addContactModal);
        
        // Reset the form
        contactForm.reset();
    }
    
    // Delete a contact
    function deleteContact(contactId) {
        emergencyContacts = emergencyContacts.filter(contact => contact.id !== contactId);
        saveContacts();
        renderEmergencyContacts();
    }
    
    // Save contacts to local storage
    function saveContacts() {
        localStorage.setItem('emergencyContacts', JSON.stringify(emergencyContacts));
    }
    
    // Load contacts from local storage
    function loadContacts() {
        const savedContacts = localStorage.getItem('emergencyContacts');
        if (savedContacts) {
            emergencyContacts = JSON.parse(savedContacts);
        }
    }
    
    // Show first aid guide
    function showFirstAidGuide(guideId) {
        const guide = firstAidGuides[guideId];
        if (!guide) return;
        
        let html = `
            <h2><i class="fas fa-first-aid"></i> ${guide.title}</h2>
        `;
        
        // Add steps
        html += '<div class="first-aid-steps">';
        guide.steps.forEach((step, index) => {
            html += `
                <div class="first-aid-step">
                    <h3><span class="step-number">${index + 1}.</span> ${step.title}</h3>
                    <p>${step.description}</p>
                </div>
            `;
        });
        html += '</div>';
        
        // Add warning if exists
        if (guide.warning) {
            html += `
                <div class="warning-note">
                    <h4><i class="fas fa-exclamation-triangle"></i> Important Note</h4>
                    <p>${guide.warning}</p>
                </div>
            `;
        }
        
        // Add close button
        html += `
            <div class="form-actions" style="margin-top: 2rem;">
                <button type="button" class="primary-btn" id="closeFirstAidBtn">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
        `;
        
        // Set content and show modal
        firstAidContent.innerHTML = html;
        
        // Add event listener to the close button
        firstAidContent.querySelector('#closeFirstAidBtn')?.addEventListener('click', () => {
            closeModal(firstAidModal);
        });
        
        openModal(firstAidModal);
    }
    
    // Show loading state
    function showLoading(message = 'Loading...') {
        // In a real app, you might show a loading spinner
        console.log(message);
    }
    
    // Hide loading state
    function hideLoading() {
        // In a real app, you would hide the loading spinner
        console.log('Loading complete');
    }
    
    // Open a modal
    function openModal(modal) {
        if (!modal) return;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Trigger animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
    
    // Close a modal
    function closeModal(modal) {
        if (!modal) return;
        
        modal.classList.remove('active');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // Load saved contacts when the page loads
    loadContacts();
    
    // Initialize the page
    init();
});
