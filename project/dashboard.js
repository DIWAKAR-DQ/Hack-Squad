document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initCharts();
    
    // Initialize calendar
    initCalendar();
    
    // Setup event listeners
    setupEventListeners();
    
    // Show current date in calendar
    highlightCurrentDate();
});

// Initialize all charts
function initCharts() {
    // Blood Pressure Chart
    const bpCtx = document.getElementById('bpChart').getContext('2d');
    new Chart(bpCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Systolic',
                    data: [118, 120, 119, 122, 121, 120, 119],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Diastolic',
                    data: [78, 80, 79, 82, 81, 80, 79],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: getChartOptions('mmHg')
    });

    // Blood Sugar Chart
    const sugarCtx = document.getElementById('sugarChart').getContext('2d');
    new Chart(sugarCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Fasting',
                data: [95, 98, 97, 99, 96, 97, 98],
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: getChartOptions('mg/dL')
    });

    // Diet Chart
    const dietCtx = document.getElementById('dietChart').getContext('2d');
    new Chart(dietCtx, {
        type: 'doughnut',
        data: {
            labels: ['Carbs', 'Protein', 'Fats'],
            datasets: [{
                data: [45, 30, 25],
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                }
            }
        }
    });

    // Activity Chart
    const activityCtx = document.getElementById('activityChart').getContext('2d');
    new Chart(activityCtx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Steps',
                data: [6500, 7200, 8100, 7800, 8900, 9500, 10200],
                backgroundColor: '#3b82f6',
                borderRadius: 6
            }]
        },
        options: getChartOptions('steps')
    });
}

// Get common chart options
function getChartOptions(unit = '') {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#1f2937',
                titleFont: { size: 14 },
                bodyFont: { size: 14 },
                padding: 12,
                displayColors: false,
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y} ${unit}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#6b7280'
                }
            },
            y: {
                grid: {
                    color: '#e5e7eb'
                },
                ticks: {
                    color: '#6b7280',
                    callback: function(value) {
                        return unit === 'steps' ? value/1000 + 'k' : value;
                    }
                }
            }
        }
    };
}

// Initialize calendar
function initCalendar() {
    const calendarDates = document.querySelector('.calendar-dates');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        calendarDates.appendChild(createCalendarCell(''));
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const cell = createCalendarCell(i);
        
        // Add appointments indicator
        if (i % 5 === 0) {
            const indicator = document.createElement('div');
            indicator.className = 'appointment-indicator';
            cell.appendChild(indicator);
        }
        
        calendarDates.appendChild(cell);
    }
}

// Create a calendar cell
function createCalendarCell(day) {
    const cell = document.createElement('div');
    cell.className = 'calendar-date';
    if (day !== '') {
        cell.textContent = day;
        cell.addEventListener('click', function() {
            document.querySelectorAll('.calendar-date').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
        });
    }
    return cell;
}

// Highlight current date in calendar
function highlightCurrentDate() {
    const today = new Date().getDate();
    const dates = document.querySelectorAll('.calendar-date');
    dates.forEach(date => {
        if (parseInt(date.textContent) === today) {
            date.classList.add('today');
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    }
    
    // Time filter buttons
    const timeFilters = document.querySelectorAll('.time-filter button');
    timeFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            timeFilters.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // In a real app, this would filter the data shown in the charts
        });
    });
    
    // Notification button
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            // In a real app, this would show a dropdown with notifications
            alert('No new notifications');
        });
    }
    
    // Make prescription cards clickable
    const prescriptionCards = document.querySelectorAll('.prescription-card');
    prescriptionCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            // In a real app, this would open the prescription details
            window.location.href = 'prescription-details.html';
        });
    });
    
    // Make document cards clickable
    const documentCards = document.querySelectorAll('.document-card');
    documentCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on action buttons
            if (!e.target.closest('.document-actions')) {
                // In a real app, this would open the document preview
                window.open('document-preview.html', '_blank');
            }
        });
    });
}
