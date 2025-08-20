document.addEventListener('DOMContentLoaded', function() {
    // Mapbox Access Token (Replace with your actual Mapbox access token)
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbG9qY2J6bXgwMGVhMmtvNnFqY2N5Z2J1In0.1234567890';
    
    // DOM Elements
    const eligibilityForm = document.querySelector('.eligibility-form');
    const formSteps = document.querySelectorAll('.form-step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const stepIndicators = document.querySelectorAll('.step');
    const optionButtons = document.querySelectorAll('.option-btn');
    const findCenterBtn = document.getElementById('findCenterBtn');
    const locationSearch = document.getElementById('locationSearch');
    const centersList = document.getElementById('centersList');
    const faqItems = document.querySelectorAll('.faq-item');
    
    // State
    let currentStep = 0;
    const formData = {
        age: '',
        weight: '',
        lastDonation: '',
        conditions: []
    };
    
    // Sample data for blood donation centers (in a real app, this would come from an API)
    const donationCenters = [
        {
            id: 1,
            name: 'Apollo Blood Bank',
            address: '21, Greams Lane, Off Greams Road, Chennai - 600006',
            distance: '1.2 km',
            phone: '044 2829 3333',
            hours: 'Open 24/7',
            lat: 13.0604,
            lng: 80.2496
        },
        {
            id: 2,
            name: 'Fortis Malar Blood Bank',
            address: '52, 1st Main Road, Gandhi Nagar, Adyar, Chennai - 600020',
            distance: '3.5 km',
            phone: '044 4289 2222',
            hours: '8:00 AM - 8:00 PM',
            lat: 13.0067,
            lng: 80.2541
        },
        {
            id: 3,
            name: 'Government General Hospital Blood Bank',
            address: 'E.V.R. Periyar Salai, Park Town, Chennai - 600003',
            distance: '2.1 km',
            phone: '044 2530 5000',
            hours: '9:00 AM - 6:00 PM',
            lat: 13.0827,
            lng: 80.2707
        },
        {
            id: 4,
            name: 'Lions Blood Bank',
            address: 'No. 13, Nageswara Road, T. Nagar, Chennai - 600017',
            distance: '4.3 km',
            phone: '044 2815 4455',
            hours: '8:30 AM - 8:00 PM',
            lat: 13.0478,
            lng: 80.2428
        },
        {
            id: 5,
            name: 'Rotary-TTK Blood Bank',
            address: '4, Cathedral Road, Chennai - 600086',
            distance: '2.8 km',
            phone: '044 2811 9111',
            hours: '8:00 AM - 8:00 PM',
            lat: 13.0507,
            lng: 80.2600
        }
    ];
    
    // Initialize the page
    function init() {
        // Initialize map
        initMap();
        
        // Set up event listeners
        setupEventListeners();
        
        // Show first step of the form
        showStep(0);
        
        // Load and display donation centers
        displayDonationCenters(donationCenters);
        
        // Update stats with animation
        animateStats();
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Navigation buttons
        nextBtn.addEventListener('click', nextStep);
        prevBtn.addEventListener('click', prevStep);
        
        // Option buttons in the form
        optionButtons.forEach(button => {
            button.addEventListener('click', handleOptionSelect);
        });
        
        // Find center button
        if (findCenterBtn) {
            findCenterBtn.addEventListener('click', () => {
                document.getElementById('donationCenters').scrollIntoView({ behavior: 'smooth' });
            });
        }
        
        // Location search
        if (locationSearch) {
            locationSearch.addEventListener('input', handleLocationSearch);
        }
        
        // FAQ accordion
        if (faqItems.length > 0) {
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                question.addEventListener('click', toggleFaq);
            });
        }
    }
    
    // Show current step in the form
    function showStep(stepIndex) {
        // Hide all steps
        formSteps.forEach(step => {
            step.classList.remove('active');
        });
        
        // Show current step
        formSteps[stepIndex].classList.add('active');
        
        // Update step indicators
        stepIndicators.forEach((indicator, index) => {
            if (index === stepIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // Update navigation buttons
        if (stepIndex === 0) {
            prevBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
        }
        
        if (stepIndex === formSteps.length - 1) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'inline-flex';
        }
        
        // If it's the last step (results), show appropriate content
        if (stepIndex === formSteps.length - 1) {
            showEligibilityResult();
        }
    }
    
    // Go to next step
    function nextStep() {
        // Validate current step before proceeding
        if (validateStep(currentStep)) {
            if (currentStep < formSteps.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        }
    }
    
    // Go to previous step
    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    }
    
    // Validate current step
    function validateStep(stepIndex) {
        // For this example, we'll just return true
        // In a real app, you would validate the user's input
        return true;
    }
    
    // Handle option selection in the form
    function handleOptionSelect(e) {
        const value = this.dataset.value;
        const question = this.closest('.question');
        const questionIndex = Array.from(question.parentElement.children).indexOf(question);
        
        // Remove selected class from all options in this question
        const options = question.querySelectorAll('.option-btn');
        options.forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add selected class to clicked option
        this.classList.add('selected');
        
        // Update form data
        if (questionIndex === 0) {
            formData.age = value;
        } else if (questionIndex === 1) {
            formData.weight = value;
        } else if (questionIndex === 2) {
            formData.lastDonation = value;
        }
        
        // Automatically go to next question if not the last one
        if (questionIndex < formSteps.length - 2) {
            setTimeout(() => {
                nextStep();
            }, 300);
        }
    }
    
    // Show eligibility result
    function showEligibilityResult() {
        // In a real app, you would check the form data to determine eligibility
        // For this example, we'll assume the user is eligible
        const resultStep = document.getElementById('step5');
        resultStep.innerHTML = `
            <div class="eligibility-result">
                <div class="result-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>You're Eligible to Donate!</h3>
                <p>Thank you for checking your eligibility. Based on your answers, you can donate blood.</p>
                <button class="primary-btn" id="findCenterBtn">
                    <i class="fas fa-map-marker-alt"></i> Find a Donation Center
                </button>
            </div>
        `;
        
        // Add event listener to the new button
        const findCenterBtn = resultStep.querySelector('#findCenterBtn');
        if (findCenterBtn) {
            findCenterBtn.addEventListener('click', () => {
                document.getElementById('donationCenters').scrollIntoView({ behavior: 'smooth' });
            });
        }
    }
    
    // Initialize map
    function initMap() {
        // Default coordinates (Chennai)
        const defaultCoords = [80.2707, 13.0827];
        
        // Create map
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: defaultCoords,
            zoom: 12
        });
        
        // Add navigation controls
        map.addControl(new mapboxgl.NavigationControl());
        
        // Add markers for each donation center
        donationCenters.forEach(center => {
            // Create a popup
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<h3>${center.name}</h3>
                <p>${center.address}</p>
                <p>${center.phone}</p>
                <p>${center.hours}</p>`
            );
            
            // Create a marker and add it to the map
            new mapboxgl.Marker({
                color: '#dc2626'
            })
            .setLngLat([center.lng, center.lat])
            .setPopup(popup)
            .addTo(map);
        });
        
        // Add geolocation control
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true,
                showUserHeading: true
            })
        );
    }
    
    // Display donation centers in the list
    function displayDonationCenters(centers) {
        if (!centersList) return;
        
        if (centers.length === 0) {
            centersList.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-map-marker-slash"></i>
                    <p>No donation centers found in this area.</p>
                </div>
            `;
            return;
        }
        
        centersList.innerHTML = centers.map(center => `
            <div class="center-card" data-id="${center.id}" data-lat="${center.lat}" data-lng="${center.lng}">
                <h3>${center.name}</h3>
                <div class="center-address">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${center.address}</span>
                </div>
                <div class="center-distance">
                    <span class="distance">
                        <i class="fas fa-walking"></i> ${center.distance} away
                    </span>
                    <span class="working-hours">${center.hours}</span>
                </div>
            </div>
        `).join('');
        
        // Add click event to center cards
        document.querySelectorAll('.center-card').forEach(card => {
            card.addEventListener('click', () => {
                const lat = parseFloat(card.dataset.lat);
                const lng = parseFloat(card.dataset.lng);
                
                // In a real app, you would focus the map on this location
                // For this example, we'll just show an alert
                alert(`Centering map on ${card.querySelector('h3').textContent}`);
            });
        });
    }
    
    // Handle location search
    function handleLocationSearch(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm.length < 2) {
            displayDonationCenters(donationCenters);
            return;
        }
        
        const filteredCenters = donationCenters.filter(center => 
            center.name.toLowerCase().includes(searchTerm) ||
            center.address.toLowerCase().includes(searchTerm)
        );
        
        displayDonationCenters(filteredCenters);
    }
    
    // Toggle FAQ item
    function toggleFaq() {
        const item = this.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(faq => {
            if (faq !== item) {
                faq.classList.remove('active');
            }
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    }
    
    // Animate stats with counting effect
    function animateStats() {
        const donorsCount = document.getElementById('donorsCount');
        const donationsCount = document.getElementById('donationsCount');
        const livesSaved = document.getElementById('livesSaved');
        
        if (donorsCount) animateValue(donorsCount, 0, 10254, 2000);
        if (donationsCount) animateValue(donationsCount, 0, 45892, 2000);
        if (livesSaved) animateValue(livesSaved, 0, 137676, 2000);
    }
    
    // Animate value with counting effect
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString() + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Initialize the page
    init();
});
