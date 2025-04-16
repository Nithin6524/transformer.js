// popup.js - handles interaction with the extension's popup, sends requests to the
// service worker (background.js), and updates the popup's UI (popup.html) on completion.

const inputElement = document.getElementById('text');
const outputElement = document.getElementById('output');
const themeToggleBtn = document.getElementById('theme-toggle');

// Theme management
function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Load saved theme preference
chrome.storage.local.get(['theme'], (result) => {
    const savedTheme = result.theme || 'light';
    setTheme(savedTheme);
});

// Toggle theme when button is clicked
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Save theme preference
    chrome.storage.local.set({ theme: newTheme });

    // Apply the theme
    setTheme(newTheme);
});

// Debounce function to limit how often the classification is triggered
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Classify text with debounce
const classifyText = debounce((text) => {
    // Only classify if there's text to classify
    if (!text.trim()) {
        outputElement.innerText = '';
        return;
    }

    // Show loading state
    outputElement.innerText = 'Analyzing...';

    // Bundle the input data into a message
    const message = {
        action: 'classify',
        text: text,
    }

    // Send this message to the service worker
    chrome.runtime.sendMessage(message, (response) => {
        // Format the response for better readability
        if (response) {
            const formattedResponse = response.map(item => {
                return {
                    label: item.label,
                    score: Math.round(item.score * 100) + '%'
                };
            });
            outputElement.innerText = JSON.stringify(formattedResponse, null, 2);
        } else {
            outputElement.innerText = 'No response received';
        }
    });
}, 500);

// Listen for changes made to the textbox
inputElement.addEventListener('input', (event) => {
    classifyText(event.target.value);
});

// Focus the input field when popup opens
window.addEventListener('DOMContentLoaded', () => {
    inputElement.focus();
});
