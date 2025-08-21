document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const uploadImageBtn = document.getElementById('uploadImageBtn');
    const imageUpload = document.getElementById('imageUpload');
    const voiceInputBtn = document.getElementById('voiceInputBtn');
    const quickQuestions = document.querySelectorAll('.quick-question');
    const emergencyBtn = document.querySelector('.emergency-btn');

    // IMPORTANT: PASTE YOUR GEMINI API KEY HERE
    const GEMINI_API_KEY = 'AIzaSyC5FiDIJiZWVP-ONVQmPMFs0HkJGJckT6U';

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
    async function sendMessage() {
        const message = messageInput.value.trim();
        if (message === '') return;

        if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
            alert('Please add your Gemini API key in ai-chat.js');
            return;
        }

        // Add user message to chat
        addMessage(message, 'user');
        
        // Clear input
        messageInput.value = '';
        messageInput.style.height = 'auto';
        
        // Show typing indicator
        showTypingIndicator();

        try {
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "contents": [{"parts":[{"text": message}]}]
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get response from AI.');
            }

            const data = await response.json();
            const aiResponse = data.candidates[0].content.parts[0].text;

            // Remove typing indicator
            const typingIndicator = document.querySelector('.typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }

            addMessage(aiResponse, 'ai');

        } catch (error) {
            console.error('Error:', error);
            const typingIndicator = document.querySelector('.typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
            addMessage('Sorry, I am having trouble connecting. Please try again later.', 'ai');
        }
        
        // Scroll to bottom
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
        if (sender === 'ai') {
            // Convert markdown-style lists to HTML lists
            text = text.replace(/\*\s(.*?)(?=\n\*|\n\n|$)/g, '<li>$1</li>');
            text = text.replace(/(\n)?(<li>.*<\/li>)/g, '<ul>$2</ul>');
            text = text.replace(/<\/ul>\n<ul>/g, '');
        }
        messageText.innerHTML = text.replace(/\n/g, '<br>');
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = getCurrentTime();
        
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        chatMessages.appendChild(messageDiv);
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
