// Loader functionality with inspirational quotes
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    const quoteElement = document.getElementById('loading-quote');
    
    // Inspirational quotes for education
    const quotes = [
        "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
        "The beautiful thing about learning is that no one can take it away from you. - B.B. King",
        "Education is not preparation for life; education is life itself. - John Dewey",
        "The more that you read, the more things you will know. The more that you learn, the more places you'll go. - Dr. Seuss",
        "Live as if you were to die tomorrow. Learn as if you were to live forever. - Mahatma Gandhi",
        "Education is the passport to the future, for tomorrow belongs to those who prepare for it today. - Malcolm X",
        "The roots of education are bitter, but the fruit is sweet. - Aristotle",
        "Learning never exhausts the mind. - Leonardo da Vinci",
        "Education is what remains after one has forgotten what one has learned in school. - Albert Einstein",
        "The only person who is educated is the one who has learned how to learn and change. - Carl Rogers",
        "Knowledge is power. Information is liberating. Education is the premise of progress. - Kofi Annan",
        "The function of education is to teach one to think intensively and to think critically. - Martin Luther King Jr.",
        "Education is the key to unlocking the world, a passport to freedom. - Oprah Winfrey",
        "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
        "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill"
    ];
    
    let currentQuoteIndex = 0;
    let quoteInterval;
    
    // Function to display random quote
    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElement.textContent = quotes[randomIndex];
        quoteElement.style.opacity = '0';
        
        setTimeout(() => {
            quoteElement.style.opacity = '1';
        }, 100);
    }
    
    // Function to cycle through quotes
    function cycleQuotes() {
        quoteElement.textContent = quotes[currentQuoteIndex];
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    }
    
    // Initialize with first quote
    displayRandomQuote();
    
    // Change quote every 2 seconds
    quoteInterval = setInterval(displayRandomQuote, 2000);
    
    // Simulate loading time (3-5 seconds)
    const loadingTime = Math.random() * 2000 + 3000; // 3-5 seconds
    
    setTimeout(() => {
        // Clear quote interval
        clearInterval(quoteInterval);
        
        // Hide loader with fade out effect
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            loader.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Animate main content entrance
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(20px)';
            mainContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }, 100);
            
        }, 500);
    }, loadingTime);
    
    // Add some interactive elements to the loader
    const spinner = document.querySelector('.spinner');
    if (spinner) {
        spinner.addEventListener('click', function() {
            this.style.animationDuration = '0.3s';
            setTimeout(() => {
                this.style.animationDuration = '1s';
            }, 1000);
        });
    }
    
    // Add progress bar animation
    const progressBar = document.querySelector('.loading-progress');
    if (progressBar) {
        progressBar.style.animationDuration = `${loadingTime / 1000}s`;
    }
    
    // Prevent page refresh during loading
    let isLoading = true;
    
    setTimeout(() => {
        isLoading = false;
    }, loadingTime);
    
    // Handle page refresh
    window.addEventListener('beforeunload', function(e) {
        if (isLoading) {
            e.preventDefault();
            e.returnValue = '';
            return '';
        }
    });
    
    // Add keyboard interaction
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && loader.style.display !== 'none') {
            displayRandomQuote();
        }
    });
    
    // Add click interaction for mobile
    loader.addEventListener('click', function() {
        if (this.style.display !== 'none') {
            displayRandomQuote();
        }
    });
});

// Function to refresh page with new quote
function refreshWithNewQuote() {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    
    if (loader && mainContent) {
        mainContent.classList.add('hidden');
        loader.style.display = 'flex';
        loader.style.opacity = '1';
        
        // Reinitialize loader
        setTimeout(() => {
            location.reload();
        }, 100);
    }
}

// Export function for use in other scripts
window.refreshWithNewQuote = refreshWithNewQuote;