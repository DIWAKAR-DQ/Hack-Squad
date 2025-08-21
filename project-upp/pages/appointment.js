document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const doctorCards = document.querySelectorAll('.doctor-card');
    const timeSlots = document.querySelectorAll('.time-slot');
    const appointmentForm = document.getElementById('appointmentForm');
    const modal = document.getElementById('confirmationModal');
    const closeBtn = document.querySelector('.close-btn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const viewAppointmentsBtn = document.getElementById('viewAppointmentsBtn');
    
    // Initialize the page
    function init() {
        setupEventListeners();
        setDefaultDate();
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Doctor selection
        doctorCards.forEach(card => {
            card.addEventListener('click', () => selectDoctor(card));
        });
        
        // Time slot selection
        timeSlots.forEach(slot => {
            slot.addEventListener('click', () => selectTimeSlot(slot));
        });
        
        // Form submission
        if (appointmentForm) {
            appointmentForm.addEventListener('submit', handleFormSubmit);
        }
        
        // Modal controls
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if (viewAppointmentsBtn) {
            viewAppointmentsBtn.addEventListener('click', () => {
                // In a real app, this would redirect to appointments page
                console.log('Viewing appointments...');
                closeModal();
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Set default date to tomorrow
    function setDefaultDate() {
        const dateInput = document.getElementById('appointmentDate');
        if (dateInput) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const formattedDate = tomorrow.toISOString().split('T')[0];
            dateInput.min = new Date().toISOString().split('T')[0]; // Set min date to today
            dateInput.value = formattedDate;
        }
    }
    
    // Select a doctor
    function selectDoctor(selectedCard) {
        // Remove selected class from all cards
        doctorCards.forEach(card => {
            card.classList.remove('selected');
        });
        
        // Add selected class to clicked card
        selectedCard.classList.add('selected');
    }
    
    // Select a time slot
    function selectTimeSlot(selectedSlot) {
        // Remove selected class from all time slots
        timeSlots.forEach(slot => {
            slot.classList.remove('selected');
        });
        
        // Add selected class to clicked time slot
        selectedSlot.classList.add('selected');
    }
    
    // Handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form values
        const doctorCard = document.querySelector('.doctor-card.selected');
        const timeSlot = document.querySelector('.time-slot.selected');
        const appointmentType = document.getElementById('appointmentType').value;
        const appointmentDate = document.getElementById('appointmentDate').value;
        const symptoms = document.getElementById('symptoms').value;
        
        // Basic validation
        if (!doctorCard || !timeSlot || !appointmentType) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Get doctor details
        const doctorName = doctorCard.querySelector('h3').textContent;
        const appointmentTime = timeSlot.textContent;
        
        // Format date for display
        const date = new Date(appointmentDate);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Update confirmation modal
        document.getElementById('confirmDoctor').textContent = doctorName;
        document.getElementById('confirmDate').textContent = formattedDate;
        document.getElementById('confirmTime').textContent = appointmentTime;
        document.getElementById('confirmType').textContent = 
            document.querySelector(`#appointmentType option[value="${appointmentType}"]`).text;
        
        // Show confirmation modal
        showModal();
        
        // In a real app, you would send this data to a server
        console.log('Appointment Details:', {
            doctor: doctorName,
            date: appointmentDate,
            time: appointmentTime,
            type: appointmentType,
            symptoms: symptoms
        });
    }
    
    // Show modal
    function showModal() {
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }
    
    // Close modal
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    }
    
    // Initialize the appointment page
    init();
});
