document.addEventListener('DOMContentLoaded', () => {
    const specialties = [
        { name: 'Cardiology', icon: 'fas fa-heartbeat' },
        { name: 'Dermatology', icon: 'fas fa-allergies' },
        { name: 'Neurology', icon: 'fas fa-brain' },
        { name: 'Pediatrics', icon: 'fas fa-child' },
        { name: 'Orthopedics', icon: 'fas fa-bone' },
        { name: 'ENT', icon: 'fas fa-assistive-listening-systems' },
        { name: 'Gynecology', icon: 'fas fa-female' },
        { name: 'General Medicine', icon: 'fas fa-stethoscope' },
        { name: 'Psychiatry', icon: 'fas fa-psychology' },
        { name: 'Dental', icon: 'fas fa-tooth' }
    ];

    const doctors = [
        { name: 'Dr. Michael Lee', specialty: 'Cardiology', hospital: 'Heart Institute', rating: 4.8, image: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { name: 'Dr. Sarah White', specialty: 'Dermatology', hospital: 'Skin Care Clinic', rating: 4.9, image: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { name: 'Dr. James Brown', specialty: 'Neurology', hospital: 'Brain Center', rating: 4.7, image: 'https://randomuser.me/api/portraits/men/55.jpg' },
        { name: 'Dr. Patricia Miller', specialty: 'Pediatrics', hospital: 'Kids Health', rating: 4.9, image: 'https://randomuser.me/api/portraits/women/68.jpg' },
        { name: 'Dr. Robert Davis', specialty: 'Orthopedics', hospital: 'Bone & Joint Clinic', rating: 4.6, image: 'https://randomuser.me/api/portraits/men/76.jpg' },
        { name: 'Dr. Linda Wilson', specialty: 'ENT', hospital: 'Hearing Center', rating: 4.8, image: 'https://randomuser.me/api/portraits/women/88.jpg' },
        { name: 'Dr. William Moore', specialty: 'Gynecology', hospital: 'Womens Health', rating: 4.9, image: 'https://randomuser.me/api/portraits/men/91.jpg' },
        { name: 'Dr. Barbara Taylor', specialty: 'General Medicine', hospital: 'General Hospital', rating: 4.5, image: 'https://randomuser.me/api/portraits/women/92.jpg' },
        { name: 'Dr. Richard Anderson', specialty: 'Psychiatry', hospital: 'Mind Care', rating: 4.7, image: 'https://randomuser.me/api/portraits/men/94.jpg' },
        { name: 'Dr. Jessica Thomas', specialty: 'Dental', hospital: 'Dental Clinic', rating: 4.9, image: 'https://randomuser.me/api/portraits/women/95.jpg' },
        { name: 'Dr. Charles Jackson', specialty: 'Cardiology', hospital: 'Cardio Care', rating: 4.7, image: 'https://randomuser.me/api/portraits/men/97.jpg' },
        { name: 'Dr. Karen Harris', specialty: 'Dermatology', hospital: 'Derma Clinic', rating: 4.8, image: 'https://randomuser.me/api/portraits/women/99.jpg' },
        { name: 'Dr. Christopher Martin', specialty: 'Neurology', hospital: 'Neuro Clinic', rating: 4.6, image: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { name: 'Dr. Nancy Thompson', specialty: 'Pediatrics', hospital: 'Child Care', rating: 5.0, image: 'https://randomuser.me/api/portraits/women/2.jpg' }
    ];

    const slider = document.querySelector('.slider');
    const cardContainer = document.querySelector('.card-container');

    const displayDoctors = (filteredDoctors) => {
        cardContainer.innerHTML = '';
        const doctorsToDisplay = filteredDoctors || doctors;
        doctorsToDisplay.forEach(d => {
            const doctorCard = document.createElement('div');
            doctorCard.className = 'doctor-card';
            doctorCard.innerHTML = `
                <img src="${d.image}" alt="${d.name}">
                <h3>${d.name}</h3>
                <p>${d.specialty}</p>
                <p>${d.hospital}</p>
                <p>Rating: ${d.rating}</p>
                <a href="doc-doctor.html">View Details</a>
            `;
            cardContainer.appendChild(doctorCard);
        });
    };

    if (slider) {
        specialties.forEach(s => {
            const specialtyButton = document.createElement('div');
            specialtyButton.className = 'specialty-button';
            specialtyButton.innerHTML = `<i class="${s.icon}"></i><p>${s.name}</p>`;
            specialtyButton.addEventListener('click', () => {
                const filtered = doctors.filter(d => d.specialty === s.name);
                displayDoctors(filtered);
            });
            slider.appendChild(specialtyButton);
        });
    }

    if (cardContainer) {
        displayDoctors();
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Payment form submission
    const paymentForm = document.querySelector('.payment-form form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Payment Successful!');
            window.location.href = 'doc-index.html';
        });
    }

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Chat functionality
    const chatInput = document.querySelector('.chat-input input');
    const chatSendBtn = document.querySelector('.chat-input button');
    const chatBox = document.querySelector('.chat-box');

    if (chatInput && chatSendBtn && chatBox) {
        chatSendBtn.addEventListener('click', () => {
            const message = chatInput.value.trim();
            if (message) {
                const userMessage = document.createElement('div');
                userMessage.className = 'message user';
                userMessage.innerHTML = `<p>${message}</p>`;
                chatBox.appendChild(userMessage);
                chatInput.value = '';
                chatBox.scrollTop = chatBox.scrollHeight;

                // Simulate doctor response
                setTimeout(() => {
                    const doctorMessage = document.createElement('div');
                    doctorMessage.className = 'message doctor';
                    doctorMessage.innerHTML = `<p>Thank you for your message. The doctor will be with you shortly.</p>`;
                    chatBox.appendChild(doctorMessage);
                    chatBox.scrollTop = chatBox.scrollHeight;
                }, 1000);
            }
        });
    }
});
