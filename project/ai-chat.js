document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const uploadImageBtn = document.getElementById('uploadImageBtn');
    const imageUpload = document.getElementById('imageUpload');
    const voiceInputBtn = document.getElementById('voiceInputBtn');
    const quickQuestions = document.querySelectorAll('.quick-question');
    const emergencyBtn = document.querySelector('.emergency-btn');

    // Sample responses from the AI
    const aiResponses = [
        "I understand your concern. Based on your symptoms, it could be a common cold. Make sure to rest and stay hydrated.",
        "I recommend monitoring your symptoms. If they persist for more than a few days, please consult a healthcare professional.",
        "For the symptoms you're describing, over-the-counter pain relievers like acetaminophen may help. Always follow the recommended dosage.",
        "It's great that you're paying attention to your health. Let me find more specific information about that for you.",
        "I'm not a substitute for professional medical advice, but I can help you understand when to seek medical attention."
    ];

    // Sample conditions and recommendations
    const conditions = {
        "headache": {
            possibleCauses: ["Tension", "Dehydration", "Lack of sleep", "Eye strain", "Stress"],
            recommendations: [
                "Drink plenty of water",
                "Rest in a quiet, dark room",
                "Try relaxation techniques",
                "Consider over-the-counter pain relief if needed"
            ],
            whenToSeeDoctor: [
                "Severe or sudden headache",
                "Headache after a head injury",
                "Accompanied by fever, stiff neck, or confusion",
                "Worsening pain despite treatment"
            ]
        },
        "fever": {
            possibleCauses: ["Viral infection", "Bacterial infection", "Heat exhaustion", "Inflammatory conditions"],
            recommendations: [
                "Stay hydrated",
                "Get plenty of rest",
                "Use fever-reducing medication as directed",
                "Use a cool compress"
            ],
            whenToSeeDoctor: [
                "Fever above 103°F (39.4°C)",
                "Fever lasting more than 3 days",
                "Difficulty breathing",
                "Severe headache or rash"
            ]
        }
    };

    // Initialize the chat
    function initChat() {
        // Auto-resize textarea
        messageInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        // Send message on Enter (but allow Shift+Enter for new line)
        messageInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // Send message button click
        sendMessageBtn.addEventListener('click', sendMessage);

        // Upload image button
        uploadImageBtn.addEventListener('click', function() {
            imageUpload.click();
        });

        // Handle image upload
        imageUpload.addEventListener('change', handleImageUpload);

        // Voice input button
        voiceInputBtn.addEventListener('click', toggleVoiceInput);

        // Quick question buttons
        quickQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const questionText = this.textContent;
                messageInput.value = questionText;
                messageInput.focus();
            });
        });

        // Emergency button
        emergencyBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to call emergency services? Only use this for life-threatening emergencies.')) {
                alert('Calling emergency services...');
                // In a real app, this would initiate a call to emergency services
            }
        });
    }

    // Send a message
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addMessage(message, 'user');
        
        // Clear input
        messageInput.value = '';
        messageInput.style.height = 'auto';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate AI response after a delay
        setTimeout(() => {
            // Remove typing indicator
            const typingIndicator = document.querySelector('.typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
            
            // Generate response based on user input
            const response = generateResponse(message);
            addMessage(response, 'ai');
            
            // Scroll to bottom
            scrollToBottom();
        }, 1500);
        
        // Scroll to bottom after user message
        scrollToBottom();
    }

    // Add a message to the chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        if (sender === 'ai') {
            const senderName = document.createElement('div');
            senderName.className = 'message-sender';
            senderName.textContent = 'Dr. AI';
            messageContent.appendChild(senderName);
        }
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.innerHTML = formatMessage(text, sender);
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = getCurrentTime();
        
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        chatMessages.appendChild(messageDiv);
    }

    // Format message with links and lists
    function formatMessage(text, sender) {
        // Simple formatting for demonstration
        if (sender === 'ai') {
            // Check if we have a condition-based response
            const lowerText = text.toLowerCase();
            let formattedText = text;
            
            if (lowerText.includes('headache')) {
                formattedText = formatConditionResponse('headache');
            } else if (lowerText.includes('fever')) {
                formattedText = formatConditionResponse('fever');
            } else if (lowerText.includes('emergency') || lowerText.includes('help')) {
                formattedText = "If this is a medical emergency, please call your local emergency number or go to the nearest emergency room immediately. For non-emergency concerns, I'm here to help with general health information.";
            }
            
            return formattedText;
        }
        return text.replace(/\n/g, '<br>');
    }
    
    // Format a condition-based response
    function formatConditionResponse(condition) {
        const conditionData = conditions[condition];
        if (!conditionData) return "I'm not sure about that condition. Could you provide more details?";
        
        let response = `<strong>Possible causes of ${condition}:</strong><br>`;
        response += `<ul>${conditionData.possibleCauses.map(cause => `<li>${cause}</li>`).join('')}</ul><br>`;
        
        response += `<strong>Recommendations:</strong><br>`;
        response += `<ul>${conditionData.recommendations.map(rec => `<li>${rec}</li>`).join('')}</ul><br>`;
        
        response += `<strong>When to see a doctor:</strong><br>`;
        response += `<ul>${conditionData.whenToSeeDoctor.map(when => `<li>${when}</li>`).join('')}</ul><br>`;
        
        response += "<em>Remember, I'm not a substitute for professional medical advice. Always consult with a healthcare provider for medical concerns.</em>";
        
        return response;
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message';
        
        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.innerHTML = '<i class="fas fa-robot"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.appendChild(typingDiv);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    // Generate a response based on user input
    function generateResponse(userInput) {
        const lowerInput = userInput.toLowerCase();
        
        // Check for specific conditions or keywords
        if (lowerInput.includes('headache')) {
            return "I see you mentioned a headache. Let me provide some information about headaches.";
        } else if (lowerInput.includes('fever')) {
            return "I understand you're concerned about a fever. Here's what you should know.";
        } else if (lowerInput.includes('pain') || lowerInput.includes('hurt')) {
            return "I'm sorry to hear you're in pain. Could you tell me more about where and how it feels?";
        } else if (lowerInput.includes('appointment') || lowerInput.includes('schedule')) {
            return "To schedule an appointment, please visit our appointments page or call our clinic directly.";
        } else if (lowerInput.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with today?";
        } else if (lowerInput.includes('emergency') || lowerInput.includes('help')) {
            return "If this is a medical emergency, please call your local emergency number or go to the nearest emergency room immediately.";
        }
        
        // Default response if no specific condition is matched
        return aiResponses[Math.floor(Math.random() * aiResponses.length)];
    }

    // Handle image upload
    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        // In a real app, you would upload the image to a server for analysis
        // For this demo, we'll just show a placeholder
        const reader = new FileReader();
        reader.onload = function(e) {
            // Add image to chat
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message user-message';
            
            const avatar = document.createElement('div');
            avatar.className = 'avatar';
            avatar.innerHTML = '<i class="fas fa-user"></i>';
            
            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
            
            const messageText = document.createElement('div');
            messageText.className = 'message-text';
            messageText.innerHTML = `<div style="max-width: 200px;">
                <img src="${e.target.result}" alt="Uploaded image" style="max-width: 100%; border-radius: 8px;">
            </div>`;
            
            const messageTime = document.createElement('div');
            messageTime.className = 'message-time';
            messageTime.textContent = getCurrentTime();
            
            messageContent.appendChild(messageText);
            messageContent.appendChild(messageTime);
            
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(messageContent);
            
            chatMessages.appendChild(messageDiv);
            
            // Simulate AI response
            setTimeout(() => {
                addMessage("Thank you for sharing the image. I can see the affected area. Based on the visual, I recommend [general advice]. However, please consult with a healthcare professional for an accurate diagnosis.", 'ai');
                scrollToBottom();
            }, 1500);
            
            scrollToBottom();
        };
        
        reader.readAsDataURL(file);
        
        // Reset the input so the same file can be uploaded again if needed
        event.target.value = '';
    }

    // Toggle voice input
    function toggleVoiceInput() {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or another supported browser.');
            return;
        }
        
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onstart = function() {
            voiceInputBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            voiceInputBtn.style.color = '#ef4444';
            messageInput.placeholder = 'Listening...';
        };
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            messageInput.value = transcript;
            messageInput.focus();
        };
        
        recognition.onerror = function(event) {
            console.error('Speech recognition error', event.error);
            resetVoiceInput();
        };
        
        recognition.onend = function() {
            resetVoiceInput();
        };
        
        recognition.start();
        
        function resetVoiceInput() {
            voiceInputBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceInputBtn.style.color = '';
            messageInput.placeholder = 'Type your health concern here...';
        }
    }

    // Get current time in HH:MM AM/PM format
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        return `${hours}:${minutes} ${ampm}`;
    }

    // Scroll chat to bottom
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Initialize the chat when the page loads
    initChat();
});
