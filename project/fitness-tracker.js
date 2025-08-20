document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const startWorkoutBtn = document.querySelector('.primary-btn');
    const workoutCards = document.querySelectorAll('.workout-card');
    
    // Initialize the page
    function init() {
        setupEventListeners();
        updateActivityStats();
        animateProgressBars();
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Start Workout button
        if (startWorkoutBtn) {
            startWorkoutBtn.addEventListener('click', () => {
                console.log('Starting a new workout...');
                // In a real app, this would open a workout selection or creation modal
                alert('Workout feature coming soon!');
            });
        }
        
        // Workout card click handlers
        workoutCards.forEach(card => {
            const button = card.querySelector('button');
            if (button) {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const workoutName = card.querySelector('h3').textContent;
                    startWorkout(workoutName);
                });
            }
            
            // Make entire card clickable
            card.addEventListener('click', () => {
                const workoutName = card.querySelector('h3').textContent;
                console.log(`Viewing details for ${workoutName}`);
                // In a real app, this would show workout details
            });
        });
    }
    
    // Update activity statistics
    function updateActivityStats() {
        // In a real app, this would fetch data from an API
        const steps = 6542;
        const stepGoal = 10000;
        const calories = 1250;
        const calorieGoal = 2800;
        
        // Update progress bars
        const stepProgress = (steps / stepGoal) * 100;
        const calorieProgress = (calories / calorieGoal) * 100;
        
        const stepBar = document.querySelector('.activity-card:first-child .progress-bar');
        const calorieBar = document.querySelector('.activity-card:last-child .progress-bar');
        
        if (stepBar) stepBar.style.width = `${Math.min(stepProgress, 100)}%`;
        if (calorieBar) calorieBar.style.width = `${Math.min(calorieProgress, 100)}%`;
        
        // Update stats display
        const stepStats = document.querySelectorAll('.activity-card:first-child .stats span');
        const calorieStats = document.querySelectorAll('.activity-card:last-child .stats span');
        
        if (stepStats.length >= 2) {
            stepStats[0].textContent = steps.toLocaleString();
            stepStats[1].textContent = stepGoal.toLocaleString();
        }
        
        if (calorieStats.length >= 2) {
            calorieStats[0].textContent = calories.toLocaleString();
            calorieStats[1].textContent = calorieGoal.toLocaleString();
        }
    }
    
    // Animate progress bars on scroll
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = width;
                        entry.target.style.transition = 'width 1.5s ease-in-out';
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => observer.observe(bar));
    }
    
    // Start a workout
    function startWorkout(workoutName) {
        console.log(`Starting workout: ${workoutName}`);
        // In a real app, this would start a workout timer and tracking
        alert(`Starting ${workoutName} workout!`);
        
        // Example of workout timer functionality that would be implemented:
        // startWorkoutTimer(workoutName, 30 * 60); // 30 minutes
    }
    
    // Initialize the fitness tracker
    init();
});
