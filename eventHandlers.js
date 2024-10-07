// Function to set up multiple event listeners for different user interactions
function setupEventListeners() {
    // Event listener for fetching weather data when the button is clicked
    document.getElementById('get-weather-btn').addEventListener('click', async () => {
        const cityInput = document.getElementById('city-input').value.trim(); // Trim any extra spaces
        
        if (cityInput) {
            try {
                // Fetch weather data for the city entered by the user
                const weatherData = await fetchWeatherData(cityInput);
                saveCityToLocalStorage(cityInput); // Save the city to local storage if the search is successful
                renderWeatherData(weatherData); // Render the weather data in the UI
                clearErrorMessage(); // Clear any existing error messages
            } catch (error) {
                displayErrorMessage(error.message); // Display error message if there's an issue fetching the data
            }
        } else {
            displayErrorMessage("Please enter a city name."); // Show an error if no city is entered
        }
    });

    // Event listener for "Enter" key press to trigger the weather search
    document.getElementById('city-input').addEventListener('keypress', async (event) => {
        if (event.key === 'Enter') { // If the user presses the "Enter" key
            const cityInput = event.target.value.trim(); // Get and trim the input value
            
            if (cityInput) {
                try {
                    const weatherData = await fetchWeatherData(cityInput);
                    saveCityToLocalStorage(cityInput); // Save the city to local storage
                    renderWeatherData(weatherData); // Render the weather data
                    clearErrorMessage(); // Clear any existing error messages
                } catch (error) {
                    displayErrorMessage(error.message); // Display error if fetch fails
                }
            } else {
                displayErrorMessage("Please enter a city name."); // Display error if no input is provided
            }
        }
    });

    // Event listener to clear the search input when the "Clear" button is clicked
    document.getElementById('clear-btn').addEventListener('click', () => {
        document.getElementById('city-input').value = ''; // Clear the input field
        clearErrorMessage(); // Clear any error messages
        clearWeatherDisplay(); // Clear the displayed weather data
    });

    // Event listener to clear the search history from local storage
    document.getElementById('clear-history-btn').addEventListener('click', () => {
        clearSearchHistory(); // Clear the search history from local storage
        renderSearchHistory(); // Re-render the search history UI
        clearErrorMessage(); // Clear any error messages
    });

    // Event listener to reload weather data from search history when a history item is clicked
    document.getElementById('search-history').addEventListener('click', async (event) => {
        if (event.target && event.target.classList.contains('history-item')) {
            const city = event.target.textContent; // Get the city name from the clicked history item
            
            try {
                const weatherData = await fetchWeatherData(city); // Fetch the weather data
                renderWeatherData(weatherData); // Render the data in the UI
                clearErrorMessage(); // Clear any error messages
            } catch (error) {
                displayErrorMessage("Failed to fetch data from history. Try again."); // Display error if fetch fails
            }
        }
    });

    // Event listener to toggle advanced settings visibility
    document.getElementById('settings-toggle').addEventListener('click', () => {
        const settingsPanel = document.getElementById('advanced-settings');
        if (settingsPanel.classList.contains('hidden')) {
            settingsPanel.classList.remove('hidden'); // Show the settings panel
        } else {
            settingsPanel.classList.add('hidden'); // Hide the settings panel
        }
    });

    // Example of an event listener for saving user preferences from settings
    document.getElementById('save-settings-btn').addEventListener('click', () => {
        const unitPreference = document.querySelector('input[name="unit"]:checked').value;
        saveUnitPreference(unitPreference); // Save the user's unit preference (Celsius/Fahrenheit)
        displaySuccessMessage("Settings saved successfully!"); // Show success message after saving
    });
}

// Function to clear any displayed error messages from the UI
function clearErrorMessage() {
    const errorMessageElement = document.getElementById('error-message');
    
    // Only clear the message if it exists in the DOM
    if (errorMessageElement) {
        errorMessageElement.innerHTML = ''; // Clear the inner HTML of the error message element
        errorMessageElement.classList.add('hidden'); // Hide the error message by adding the 'hidden' class
    }
}

// Function to display a success message in the UI
function displaySuccessMessage(message) {
    const successMessageElement = document.getElementById('success-message');
    
    if (successMessageElement) {
        successMessageElement.innerHTML = message; // Set the success message text
        successMessageElement.classList.remove('hidden'); // Make the success message visible
        
        // Automatically hide the success message after 3 seconds
        setTimeout(() => {
            successMessageElement.classList.add('hidden');
        }, 3000);
    }
}

// Function to display error messages in the UI
function displayErrorMessage(message) {
    const errorMessageElement = document.getElementById('error-message');
    
    if (errorMessageElement) {
        errorMessageElement.innerHTML = message; // Set the error message text
        errorMessageElement.classList.remove('hidden'); // Make the error message visible
    }
}

// Function to clear the displayed weather data from the UI
function clearWeatherDisplay() {
    const weatherDisplayElement = document.getElementById('weather-display');
    
    if (weatherDisplayElement) {
        weatherDisplayElement.innerHTML = ''; // Clear the weather display area
    }
}

// Function to save the city to local storage (for search history)
function saveCityToLocalStorage(city) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    
    // Avoid duplicates in the search history
    if (!searchHistory.includes(city)) {
        searchHistory.push(city); // Add the city to the history
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory)); // Save the updated history
    }
}

// Function to clear search history from local storage
function clearSearchHistory() {
    localStorage.removeItem('searchHistory'); // Remove the search history from local storage
}

// Function to render the search history in the UI
function renderSearchHistory() {
    const searchHistoryContainer = document.getElementById('search-history');
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    searchHistoryContainer.innerHTML = ''; // Clear the current search history display

    // Display each city in the search history as a clickable item
    searchHistory.forEach((city) => {
        const historyItem = document.createElement('div');
        historyItem.textContent = city;
        historyItem.classList.add('history-item'); // Add the 'history-item' class for styling
        searchHistoryContainer.appendChild(historyItem);
    });
}

// Initialize the event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners(); // Set up the event listeners
    renderSearchHistory(); // Render search history from local storage
});
