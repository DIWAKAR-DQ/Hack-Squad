// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const dashboardLink = document.getElementById('dashboardLink');
const authModal = document.getElementById('authModal');
const closeBtn = document.querySelector('.close');
const tabBtns = document.querySelectorAll('.tab-btn');
const authForms = document.querySelectorAll('.auth-form');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Sample data for doctors and hospitals
const doctors = [
    {
        name: 'Dr. Rajesh Kumar',
        specialty: 'Cardiologist',
        hospital: 'Apollo Hospitals',
        experience: '15 years',
        rating: 4.8,
        reviews: 245,
        image: 'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg'
    },
    {
        name: 'Dr. Priya Sharma',
        specialty: 'Neurologist',
        hospital: 'Fortis Malar Hospital',
        experience: '12 years',
        rating: 4.9,
        reviews: 198,
        image: 'https://t3.ftcdn.net/jpg/02/95/51/80/360_F_295518052_aO5d9CqrhqsTatScW5pCGM4wpaNwIXco.jpg'
    },
    {
        name: 'Dr. Arun Patel',
        specialty: 'Orthopedic Surgeon',
        hospital: 'MIOT International',
        experience: '18 years',
        rating: 4.7,
        reviews: 312,
        image: 'https://t4.ftcdn.net/jpg/03/20/52/31/360_F_320523164_tx7Rdd7I2XDTvvKfz2oRuRpKOPE5z0ni.jpg'
    },
    {
        name: 'Dr. Meena Iyer',
        specialty: 'Pediatrician',
        hospital: 'Kanchi Kamakoti CHILDS Trust Hospital',
        experience: '14 years',
        rating: 4.9,
        reviews: 287,
        image: 'https://t3.ftcdn.net/jpg/05/04/25/70/360_F_504257032_okDu3s0TdoJY6OKoZBI5MtO2AX9ee_7h.jpg'
    },
    {
        name: 'Dr. Sanjay Gupta',
        specialty: 'Dermatologist',
        hospital: 'Sri Ramachandra Medical Centre',
        experience: '16 years',
        rating: 4.8,
        reviews: 201,
        image: 'https://as1.ftcdn.net/v2/jpg/02/33/82/53/1000_F_233825303_mS2f5S2O6y0222aD223eC5Gl5u4g6YKQ.jpg'
    }
];

const hospitals = [
    {
        name: 'Apollo Hospitals',
        location: 'Greams Road, Chennai',
        specialties: ['Cardiology', 'Neurology', 'Oncology'],
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        distance: '2.5 km'
    },
    {
        name: 'Fortis Malar Hospital',
        location: 'Adyar, Chennai',
        specialties: ['Cardiac Surgery', 'Neurology', 'Gastroenterology'],
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        distance: '5.1 km'
    },
    {
        name: 'MIOT International',
        location: 'Manapakkam, Chennai',
        specialties: ['Orthopedics', 'Nephrology', 'Urology'],
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        distance: '8.3 km'
    },
    {
        name: 'Kanchi Kamakoti CHILDS Trust Hospital',
        location: 'Nungambakkam, Chennai',
        specialties: ['Pediatrics', 'Neonatology', 'Pediatric Surgery'],
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        distance: '3.7 km'
    },
    {
        name: 'Sri Ramachandra Medical Centre',
        location: 'Porur, Chennai',
        specialties: ['Dermatology', 'Cosmetology', 'Plastic Surgery'],
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
        distance: '10.2 km'
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderDoctors();
    renderHospitals();
    setupEventListeners();
    addFloatingEffects();
});

// Firebase auth state listener
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        loginBtn.style.display = 'none';
        dashboardLink.style.display = 'block';
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.style.display = 'block';
    } else {
        // User is signed out
        loginBtn.style.display = 'block';
        dashboardLink.style.display = 'none';
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
});

// Render doctors list
function renderDoctors() {
    const container = document.querySelector('.doctors .card-container');
    if (!container) return;

    container.innerHTML = doctors.map(doctor => `
        <div class="doctor-card">
            <img src="${doctor.image}" alt="${doctor.name}" class="card-image">
            <div class="card-content">
                <h3>${doctor.name}</h3>
                <p class="specialty"><i class="fas fa-stethoscope"></i> ${doctor.specialty}</p>
                <p class="location"><i class="fas fa-hospital"></i> ${doctor.hospital}</p>
                <div class="rating">
                    <span class="stars">${'★'.repeat(Math.floor(doctor.rating))}${'☆'.repeat(5-Math.floor(doctor.rating))}</span>
                    <span class="rating-count">${doctor.rating} (${doctor.reviews})</span>
                </div>
                <a href="appointment.html" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem;">Book Appointment</a>
            </div>
        </div>
    `).join('');
}

// Render hospitals list
function renderHospitals() {
    const container = document.querySelector('.hospitals .card-container');
    if (!container) return;

    container.innerHTML = hospitals.map(hospital => `
        <div class="hospital-card">
            <img src="${hospital.image}" alt="${hospital.name}" class="card-image">
            <div class="card-content">
                <h3>${hospital.name}</h3>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${hospital.location} (${hospital.distance} away)</p>
                <div class="specialties">
                    <p><i class="fas fa-tags"></i> ${hospital.specialties.join(', ')}</p>
                </div>
                <div class="rating">
                    <span class="stars">${'★'.repeat(Math.floor(hospital.rating))}${'☆'.repeat(5-Math.floor(hospital.rating))}</span>
                    <span class="rating-count">${hospital.rating}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%; margin-top: 0.5rem;">View Details</button>
            </div>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Login/Signup modal
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            authModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            authModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            
            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show corresponding form
            authForms.forEach(form => form.style.display = 'none');
            document.getElementById(`${tab}Form`).style.display = 'block';
        });
    });

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;

            auth.signInWithEmailAndPassword(email, password)
                .then(userCredential => {
                    authModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    showNotification('Login successful!', 'success');
                })
                .catch(error => {
                    showNotification(error.message, 'error');
                });
        });
    }

    // Signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = signupForm.querySelector('input[type="text"]').value;
            const email = signupForm.querySelector('input[type="email"]').value;
            const password = signupForm.querySelector('input[type="password"]').value;
            const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value;

            if (password !== confirmPassword) {
                showNotification('Passwords do not match!', 'error');
                return;
            }

            auth.createUserWithEmailAndPassword(email, password)
                .then(userCredential => {
                    // You can also update the user's profile with the full name here
                    return userCredential.user.updateProfile({
                        displayName: fullName
                    });
                })
                .then(() => {
                    authModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    showNotification('Account created successfully!', 'success');
                })
                .catch(error => {
                    showNotification(error.message, 'error');
                });
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            auth.signOut().then(() => {
                showNotification('You have been logged out.', 'info');
            }).catch(error => {
                showNotification(error.message, 'error');
            });
        });
    }
}

// Add floating effects to cards
function addFloatingEffects() {
    const cards = document.querySelectorAll('.access-card, .doctor-card, .hospital-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.03, 1.03, 1.03)`;
            card.style.boxShadow = `${-angleY * 2}px ${angleX * 2}px 30px rgba(0, 0, 0, 0.15)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger reflow
    notification.offsetHeight;
    
    // Add show class
    notification.classList.add('show');
    
    // Remove notification after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 2000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notification.success {
        background: linear-gradient(135deg, #10b981, #059669);
    }
    
    .notification.error {
        background: linear-gradient(135deg, #ef4444, #dc2626);
    }
    
    .notification.info {
        background: linear-gradient(135deg, #3b82f6, #2563eb);
    }
    
    .notification.warning {
        background: linear-gradient(135deg, #f59e0b, #d97706);
    }
`;
document.head.appendChild(style);

// Add smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to current navigation link
const navLinks = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
