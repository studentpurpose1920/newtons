    document.addEventListener('DOMContentLoaded', function() {
        const chatbot = document.getElementById('chitti-chatbot');
        const toggleBtn = document.getElementById('chitti-toggle');
        const closeBtn = document.getElementById('chitti-close');
        const form = document.getElementById('chitti-form');
        const input = document.getElementById('chitti-input');
        const messages = document.getElementById('chitti-messages');

        toggleBtn.onclick = () => {
            chatbot.style.display = 'flex';
            toggleBtn.style.display = 'none';
            input.focus();
        };
        closeBtn.onclick = () => {
            chatbot.style.display = 'none';
            toggleBtn.style.display = 'block';
        };

        form.onsubmit = function(e) {
            e.preventDefault();
            const userMsg = input.value.trim();
            if (!userMsg) return;
            appendMessage('user', userMsg);
            input.value = '';
            setTimeout(() => {
                appendMessage('bot', getBotReply(userMsg));
            }, 700);
        };

        function appendMessage(sender, text) {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chatbot-message ' + sender;
            if (sender === 'bot') {
                msgDiv.innerHTML = `<span class="chatbot-avatar"><i class="fas fa-robot"></i></span><div class="chatbot-text">${text}</div>`;
            } else {
                msgDiv.innerHTML = `<div class="chatbot-text">${text}</div>`;
            }
            messages.appendChild(msgDiv);
            messages.scrollTop = messages.scrollHeight;
        }

        // Simulated AI teacher-like responses for demo
        function getBotReply(msg) {
            msg = msg.toLowerCase();
            if (msg.includes('admission')) return "For admissions, please visit the Admissions section or fill out the inquiry form.";
            if (msg.includes('courses') || msg.includes('program')) return "We offer Engineering, Management, Computer Science, and Research programs. Check the Courses section for details.";
            if (msg.includes('contact')) return "You can contact us via phone, email, or visit our campus. See the Contact section below.";
            if (msg.includes('fee')) return "Fee details vary by program. Please specify the course or check the Admissions section.";
            if (msg.includes('scholarship')) return "Scholarships are available for meritorious students. Visit the Admissions page for more info.";
            if (msg.includes('placement')) return "We have strong industry partnerships and excellent placement records.";
            if (msg.includes('faculty')) return "Our faculty are experienced and highly qualified in their respective fields.";
            if (msg.includes('hello') || msg.includes('hi')) return "Hello! How can I assist you with your studies or college information?";
            // Subject-related demo answers
            if (msg.includes('integral of')) return "To solve an integral, identify the function and use integration rules. Please specify the function you want to integrate.";
            if (msg.includes('newton\'s second law')) return "Newton's Second Law states: Force = Mass × Acceleration (F = m × a).";
            if (msg.includes('photosynthesis')) return "Photosynthesis is the process by which green plants convert sunlight into chemical energy, producing oxygen as a byproduct.";
            if (msg.includes('python program')) return "Sure! Please specify what you want the Python program to do, and I'll help you with the code.";
            if (msg.includes('explain') && msg.includes('algorithm')) return "An algorithm is a step-by-step procedure to solve a problem or perform a computation.";
            if (msg.includes('doubt') || msg.includes('problem') || msg.includes('question')) return "Please type your subject-related doubt or question, and I'll do my best to explain or solve it for you!";
            // Default fallback
            return "I'm Chitti, your AI assistant. I can help solve subject-related problems and answer your study doubts like a teacher. Please ask your question!";
        }
        // Initial state
        chatbot.style.display = 'none';
        toggleBtn.style.display = 'block';
    });