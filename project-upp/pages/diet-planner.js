document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const getStartedBtn = document.getElementById('getStartedBtn');
    const prevDayBtn = document.getElementById('prevDay');
    const nextDayBtn = document.getElementById('nextDay');
    const currentDateEl = document.getElementById('currentDate');
    const waterCups = document.querySelectorAll('.water-cup');
    const addFoodBtns = document.querySelectorAll('.add-food-btn');
    const mealActionBtns = document.querySelectorAll('.meal-action-btn');
    
    // Current date tracking
    let currentDate = new Date();
    
    // Initialize the page
    function init() {
        updateDateDisplay();
        setupEventListeners();
        updateWaterIntake();
        updateNutritionSummary();
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Get Started button
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', () => {
                document.querySelector('.nutrition-summary').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            });
        }
        
        // Date navigation
        if (prevDayBtn) {
            prevDayBtn.addEventListener('click', goToPreviousDay);
        }
        
        if (nextDayBtn) {
            nextDayBtn.addEventListener('click', goToNextDay);
        }
        
        // Water intake tracking
        waterCups.forEach((cup, index) => {
            cup.addEventListener('click', () => toggleWaterCup(cup, index));
        });
        
        // Add food buttons
        addFoodBtns.forEach(btn => {
            btn.addEventListener('click', handleAddFood);
        });
        
        // Meal action buttons
        mealActionBtns.forEach(btn => {
            btn.addEventListener('click', handleMealAction);
        });
    }
    
    // Update the displayed date
    function updateDateDisplay() {
        if (!currentDateEl) return;
        
        const options = { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
        };
        
        const today = new Date();
        const isToday = currentDate.toDateString() === today.toDateString();
        
        currentDateEl.textContent = isToday 
            ? 'Today, ' + currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            : currentDate.toLocaleDateString('en-US', { ...options, year: 'numeric' });
    }
    
    // Navigate to previous day
    function goToPreviousDay() {
        currentDate.setDate(currentDate.getDate() - 1);
        updateDateDisplay();
        // In a real app, you would fetch meal plan for the new date
    }
    
    // Navigate to next day
    function goToNextDay() {
        const today = new Date();
        if (currentDate >= today) return; // Don't allow future dates beyond today
        
        currentDate.setDate(currentDate.getDate() + 1);
        updateDateDisplay();
        // In a real app, you would fetch meal plan for the new date
    }
    
    // Toggle water cup fill state
    function toggleWaterCup(cup, index) {
        cup.classList.toggle('active');
        updateWaterIntake();
        
        // In a real app, you would save this to a database
        saveWaterIntake();
    }
    
    // Update water intake progress
    function updateWaterIntake() {
        const totalCups = waterCups.length;
        const filledCups = document.querySelectorAll('.water-cup.active').length;
        const progress = (filledCups / totalCups) * 100;
        
        // Update progress bar
        const progressBar = document.querySelector('.water-progress .progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        // Update water amount text
        const waterAmount = document.querySelector('.water-amount');
        if (waterAmount) {
            const totalMl = filledCups * 250; // 250ml per cup
            waterAmount.innerHTML = `<span>${totalMl}ml</span><span>2000ml</span>`;
            
            // Update progress text
            const progressText = waterAmount.nextElementSibling;
            if (progressText) {
                progressText.textContent = `${Math.round(progress)}% of daily goal`;
            }
        }
    }
    
    // Save water intake to localStorage
    function saveWaterIntake() {
        const today = new Date().toDateString();
        const filledCups = Array.from(waterCups).map(cup => 
            cup.classList.contains('active')
        );
        
        // In a real app, you would send this to your backend
        localStorage.setItem(`waterIntake_${today}`, JSON.stringify(filledCups));
    }
    
    // Load water intake from localStorage
    function loadWaterIntake() {
        const today = new Date().toDateString();
        const savedIntake = localStorage.getItem(`waterIntake_${today}`);
        
        if (savedIntake) {
            const filledCups = JSON.parse(savedIntake);
            filledCups.forEach((isFilled, index) => {
                if (isFilled && waterCups[index]) {
                    waterCups[index].classList.add('active');
                }
            });
            updateWaterIntake();
        }
    }
    
    // Update nutrition summary with calculated values
    function updateNutritionSummary() {
        // In a real app, you would calculate these values based on the user's meals
        const nutritionData = {
            calories: { current: 1200, goal: 2500, color: '#ef4444' },
            protein: { current: 72, goal: 120, color: '#3b82f6' },
            carbs: { current: 105, goal: 300, color: '#10b981' },
            fat: { current: 33, goal: 60, color: '#f59e0b' }
        };
        
        // Update each nutrition card
        Object.entries(nutritionData).forEach(([key, data]) => {
            const progress = (data.current / data.goal) * 100;
            const card = document.querySelector(`.summary-card:nth-child(${
                ['calories', 'protein', 'carbs', 'fat'].indexOf(key) + 1
            })`);
            
            if (card) {
                // Update progress bar
                const progressBar = card.querySelector('.progress-bar');
                if (progressBar) {
                    progressBar.style.width = `${Math.min(progress, 100)}%`;
                    progressBar.style.backgroundColor = data.color;
                }
                
                // Update progress text
                const progressText = card.querySelector('.progress-text');
                if (progressText) {
                    progressText.innerHTML = `
                        <span>${data.current.toLocaleString()}${key === 'calories' ? '' : 'g'}</span>
                        <span>${data.goal.toLocaleString()}${key === 'calories' ? '' : 'g'}</span>
                    `;
                }
                
                // Update percentage text
                const percentageText = card.querySelector('p');
                if (percentageText) {
                    percentageText.textContent = `${Math.round(progress)}% of daily goal`;
                }
            }
        });
    }
    
    // Handle add food button click
    function handleAddFood(e) {
        const mealCard = e.target.closest('.meal-card');
        if (!mealCard) return;
        
        const mealName = mealCard.querySelector('h3')?.textContent || 'Meal';
        
        // In a real app, you would show a modal to add food
        console.log(`Add food to ${mealName}`);
        alert(`Add food to ${mealName} - This would open a food search modal in the full implementation.`);
    }
    
    // Handle meal action button click (ellipsis menu)
    function handleMealAction(e) {
        e.stopPropagation();
        const mealItem = e.target.closest('.meal-item');
        if (!mealItem) return;
        
        // In a real app, you would show a context menu with options
        console.log('Meal action clicked');
    }
    
    // Initialize the page
    init();
});
