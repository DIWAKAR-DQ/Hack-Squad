document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const addGoalBtn = document.getElementById('addGoalBtn');
    const emptyStateBtn = document.getElementById('emptyStateBtn');
    const modal = document.getElementById('addGoalModal');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.getElementById('cancelGoalBtn');
    const goalForm = document.getElementById('goalForm');
    const goalsGrid = document.querySelector('.goals-grid');
    const emptyState = document.getElementById('emptyState');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const confettiContainer = document.getElementById('confetti-container');
    
    // Initialize confetti
    let confettiSettings = {
        target: 'confetti-container',
        max: 200,
        size: 1.5,
        animate: true,
        respawn: false,
        props: [
            { type: 'circle', colors: ['#4a6cf7', '#28a745', '#ffc107', '#dc3545'] },
            { type: 'rect', colors: ['#4a6cf7', '#28a745', '#ffc107', '#dc3545'] },
            { type: 'svg', src: 'path/to/star.svg', size: 15, weight: 0.2 }
        ]
    };
    
    let confetti = null;
    
    // Sample goals data (in a real app, this would come from a database)
    let goals = [
        {
            id: 1,
            title: '10,000 Steps Daily',
            category: 'health',
            description: 'Walk at least 10,000 steps every day to improve cardiovascular health.',
            target: 30,
            current: 22,
            unit: 'days',
            frequency: 'daily',
            streak: 15,
            icon: 'walking',
            completed: false
        },
        {
            id: 2,
            title: '5 Servings of Fruits & Veggies',
            category: 'nutrition',
            description: 'Eat at least 5 servings of fruits and vegetables daily.',
            target: 21,
            current: 8,
            unit: 'servings',
            frequency: 'daily',
            streak: 3,
            icon: 'apple-alt',
            completed: false
        },
        {
            id: 3,
            title: 'Workout 3x/Week',
            category: 'fitness',
            description: 'Complete three 30-minute workout sessions this week.',
            target: 4,
            current: 4,
            unit: 'weeks',
            frequency: 'weekly',
            streak: 4,
            icon: 'dumbbell',
            completed: true
        }
    ];
    
    // Initialize the page
    function init() {
        renderGoals();
        setupEventListeners();
        checkEmptyState();
        updateProgressCircle();
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Open modal buttons
        if (addGoalBtn) addGoalBtn.addEventListener('click', openModal);
        if (emptyStateBtn) emptyStateBtn.addEventListener('click', openModal);
        
        // Close modal buttons
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
        
        // Form submission
        if (goalForm) {
            goalForm.addEventListener('submit', handleFormSubmit);
        }
        
        // Tab switching
        tabButtons.forEach(button => {
            button.addEventListener('click', () => filterGoals(button.dataset.category));
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Render goals grid
    function renderGoals(filterCategory = 'all') {
        if (!goalsGrid) return;
        
        goalsGrid.innerHTML = '';
        
        const filteredGoals = filterCategory === 'all' 
            ? goals 
            : goals.filter(goal => goal.category === filterCategory);
        
        if (filteredGoals.length === 0) {
            emptyState.classList.add('active');
            return;
        }
        
        emptyState.classList.remove('active');
        
        filteredGoals.forEach(goal => {
            const progress = Math.min(Math.round((goal.current / goal.target) * 100), 100);
            const isCompleted = goal.completed || progress >= 100;
            
            const goalCard = document.createElement('div');
            goalCard.className = `goal-card ${goal.category} ${isCompleted ? 'completed' : ''}`;
            goalCard.dataset.category = goal.category;
            goalCard.dataset.progress = progress;
            
            goalCard.innerHTML = `
                <div class="goal-icon">
                    <i class="fas fa-${goal.icon}"></i>
                </div>
                <div class="goal-content">
                    <div class="goal-header">
                        <h3>${goal.title}</h3>
                        <div class="goal-actions">
                            <button class="icon-btn edit-btn" data-id="${goal.id}">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="icon-btn delete-btn" data-id="${goal.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <p>${goal.description}</p>
                    <div class="goal-progress">
                        <div class="progress-bar">
                            <div class="progress" style="width: ${progress}%;"></div>
                        </div>
                        <span>${isCompleted ? 'Completed!' : `${progress}% Complete`}</span>
                    </div>
                    <div class="goal-meta">
                        <span><i class="far fa-calendar-alt"></i> ${goal.target} ${goal.unit}</span>
                        <span><i class="fas ${isCompleted ? 'fa-trophy' : 'fa-bolt'}"></i> ${goal.streak} ${goal.frequency === 'daily' ? 'day' : 'week'} streak</span>
                    </div>
                </div>
                <div class="goal-complete">
                    <button class="complete-btn" data-id="${goal.id}">
                        <i class="fas fa-check"></i>
                    </button>
                </div>
            `;
            
            goalsGrid.appendChild(goalCard);
        });
        
        // Add event listeners to the new elements
        setupGoalCardEvents();
    }
    
    // Set up event listeners for goal cards
    function setupGoalCardEvents() {
        // Complete goal buttons
        document.querySelectorAll('.complete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const goalId = parseInt(btn.dataset.id);
                toggleGoalComplete(goalId);
            });
        });
        
        // Edit buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const goalId = parseInt(btn.dataset.id);
                editGoal(goalId);
            });
        });
        
        // Delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const goalId = parseInt(btn.dataset.id);
                if (confirm('Are you sure you want to delete this goal?')) {
                    deleteGoal(goalId);
                }
            });
        });
    }
    
    // Toggle goal completion
    function toggleGoalComplete(goalId) {
        const goalIndex = goals.findIndex(g => g.id === goalId);
        if (goalIndex === -1) return;
        
        const goal = goals[goalIndex];
        const wasCompleted = goal.completed;
        
        // Toggle completion status
        goal.completed = !wasCompleted;
        
        // Update progress to 100% if completing, or recalculate if uncompleting
        if (!wasCompleted) {
            goal.current = goal.target;
            triggerConfetti();
        } else {
            // Recalculate progress based on current/target
            goal.current = Math.floor(goal.target * 0.8); // Example: set to 80% if unchecking
        }
        
        // Update the UI
        renderGoals();
        updateProgressCircle();
        
        // In a real app, you would save to a database here
        console.log('Goal updated:', goal);
    }
    
    // Edit goal
    function editGoal(goalId) {
        const goal = goals.find(g => g.id === goalId);
        if (!goal) return;
        
        // Populate form with goal data
        document.getElementById('goalTitle').value = goal.title;
        document.getElementById('goalCategory').value = goal.category;
        document.getElementById('goalDescription').value = goal.description;
        document.getElementById('goalTarget').value = goal.target;
        document.getElementById('goalUnit').value = goal.unit;
        document.getElementById('goalFrequency').value = goal.frequency;
        
        // Change form to update mode
        goalForm.dataset.mode = 'edit';
        goalForm.dataset.goalId = goalId;
        
        // Update button text
        const submitBtn = goalForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = 'Update Goal';
        }
        
        openModal();
    }
    
    // Delete goal
    function deleteGoal(goalId) {
        goals = goals.filter(g => g.id !== goalId);
        renderGoals();
        checkEmptyState();
        updateProgressCircle();
        
        // In a real app, you would delete from the database here
        console.log('Goal deleted:', goalId);
    }
    
    // Filter goals by category
    function filterGoals(category) {
        // Update active tab
        tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        
        // Render filtered goals
        renderGoals(category);
    }
    
    // Handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(goalForm);
        const goalData = {
            title: formData.get('goalTitle'),
            category: formData.get('goalCategory'),
            description: formData.get('goalDescription'),
            target: parseInt(formData.get('goalTarget') || '0'),
            unit: formData.get('goalUnit'),
            frequency: formData.get('goalFrequency'),
            current: 0,
            streak: 0,
            completed: false
        };
        
        // Set appropriate icon based on category
        const categoryIcons = {
            health: 'heartbeat',
            fitness: 'dumbbell',
            nutrition: 'apple-alt',
            personal: 'star'
        };
        
        goalData.icon = categoryIcons[goalData.category] || 'bullseye';
        
        // Check if we're adding a new goal or updating an existing one
        const isEditMode = goalForm.dataset.mode === 'edit';
        
        if (isEditMode) {
            // Update existing goal
            const goalId = parseInt(goalForm.dataset.goalId);
            const goalIndex = goals.findIndex(g => g.id === goalId);
            
            if (goalIndex !== -1) {
                // Preserve current progress and completion status
                goalData.current = goals[goalIndex].current;
                goalData.completed = goals[goalIndex].completed;
                goalData.streak = goals[goalIndex].streak;
                
                goals[goalIndex] = { ...goals[goalIndex], ...goalData };
                console.log('Goal updated:', goals[goalIndex]);
            }
        } else {
            // Add new goal
            goalData.id = goals.length > 0 ? Math.max(...goals.map(g => g.id)) + 1 : 1;
            goals.push(goalData);
            console.log('New goal added:', goalData);
        }
        
        // Reset form and close modal
        goalForm.reset();
        closeModal();
        
        // Update UI
        renderGoals();
        checkEmptyState();
        updateProgressCircle();
    }
    
    // Check if we should show the empty state
    function checkEmptyState() {
        if (!emptyState) return;
        
        const activeTab = document.querySelector('.tab-btn.active');
        const category = activeTab ? activeTab.dataset.category : 'all';
        const filteredGoals = category === 'all' 
            ? goals 
            : goals.filter(goal => goal.category === category);
        
        if (filteredGoals.length === 0) {
            emptyState.classList.add('active');
        } else {
            emptyState.classList.remove('active');
        }
    }
    
    // Update the progress circle
    function updateProgressCircle() {
        if (goals.length === 0) {
            document.querySelector('.circle-progress').style.strokeDasharray = '0, 100';
            document.querySelector('.percentage').textContent = '0%';
            return;
        }
        
        const completedGoals = goals.filter(g => g.completed).length;
        const progress = Math.round((completedGoals / goals.length) * 100);
        
        document.querySelector('.circle-progress').style.strokeDasharray = `${progress}, 100`;
        document.querySelector('.percentage').textContent = `${progress}%`;
        
        // Update progress text
        const progressText = document.querySelector('.progress-text p');
        if (progressText) {
            if (progress === 100) {
                progressText.textContent = 'Amazing! You\'ve completed all your goals! 🎉';
            } else if (progress >= 75) {
                progressText.textContent = 'Great job! You\'re making excellent progress! 💪';
            } else if (progress >= 50) {
                progressText.textContent = 'You\'re halfway there! Keep going! ✨';
            } else if (progress > 0) {
                progressText.textContent = 'You\'re on track with your health journey!';
            } else {
                progressText.textContent = 'Start completing goals to see your progress!';
            }
        }
    }
    
    // Open modal
    function openModal() {
        if (!modal) return;
        
        // Reset form
        goalForm.reset();
        goalForm.dataset.mode = 'add';
        delete goalForm.dataset.goalId;
        
        // Update button text
        const submitBtn = goalForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = 'Create Goal';
        }
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Trigger animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
    
    // Close modal
    function closeModal() {
        if (!modal) return;
        
        modal.classList.remove('active');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // Trigger confetti animation
    function triggerConfetti() {
        if (typeof Confetti !== 'undefined') {
            confettiContainer.style.display = 'block';
            confetti = new Confetti(confettiSettings);
            confetti.render();
            
            // Hide confetti after animation
            setTimeout(() => {
                confetti.clear();
                confettiContainer.style.display = 'none';
            }, 3000);
        }
    }
    
    // Initialize the page
    init();
});
