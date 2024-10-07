// Function to save a city to local storage, with checks for duplicates and a limit on the number of saved searches
function saveCityToLocalStorage(city) {
    let previousSearches = loadSearchesFromLocalStorage();

    // Ensure city names are stored in a consistent case (e.g., title case)
    const formattedCity = formatCityName(city);

    // Check if the city is already in the list of previous searches
    if (!previousSearches.includes(formattedCity)) {
        // Add the city to the array of previous searches
        previousSearches.push(formattedCity);

        // Limit the number of saved searches (e.g., max 10 cities)
        if (previousSearches.length > 10) {
            previousSearches.shift(); // Remove the oldest search if the limit is exceeded
        }

        // Save the updated search history to local storage
        try {
            localStorage.setItem('searches', JSON.stringify(previousSearches));
            console.log(`City "${formattedCity}" saved to local storage.`);
        } catch (error) {
            console.error("Error saving city to local storage:", error);
        }
    } else {
        console.log(`City "${formattedCity}" is already in the search history.`);
    }
}

// Function to load searches from local storage
function loadSearchesFromLocalStorage() {
    try {
        const searches = localStorage.getItem('searches');
        return searches ? JSON.parse(searches) : [];
    } catch (error) {
        console.error("Error loading searches from local storage:", error);
        return []; // Return an empty array if there's an issue with local storage
    }
}

// Function to load previous searches and render them in the UI (e.g., in a search history list)
function loadPreviousSearches() {
    const searches = loadSearchesFromLocalStorage();
    
    // Check if there are any previous searches
    if (searches.length > 0) {
        searches.forEach(city => {
            renderPreviousSearch(city); // Render each previous search (this function can be customized)
            console.log(`Previously searched city: ${city}`);
        });
    } else {
        console.log("No previous searches found in local storage.");
    }
}

// Function to clear all searches from local storage
function clearSearchHistoryFromLocalStorage() {
    try {
        localStorage.removeItem('searches');
        console.log("Search history cleared from local storage.");
    } catch (error) {
        console.error("Error clearing search history from local storage:", error);
    }
}

// Helper function to format city names to Title Case (e.g., 'new york' -> 'New York')
function formatCityName(city) {
    return city.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Function to render each previous search in the UI (e.g., as a clickable list item)
function renderPreviousSearch(city) {
    const searchHistoryContainer = document.getElementById('search-history');

    if (searchHistoryContainer) {
        const searchItem = document.createElement('div');
        searchItem.classList.add('history-item');
        searchItem.textContent = city;
        searchItem.addEventListener('click', () => {
            handleCitySearch(city); // Trigger search when history item is clicked
        });

        searchHistoryContainer.appendChild(searchItem);
    }
}

// Function to handle city search from history or input field
function handleCitySearch(city) {
    document.getElementById('city-input').value = city; // Set the city input field with the selected city
    document.getElementById('get-weather-btn').click(); // Simulate a button click to fetch weather data
}

// Function to initialize and load previous searches when the app starts
function initializeSearchHistory() {
    loadPreviousSearches(); // Load previous searches from local storage
    setupClearHistoryButton(); // Set up the "Clear History" button functionality
}

// Function to set up the "Clear History" button event listener
function setupClearHistoryButton() {
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => {
            clearSearchHistoryFromLocalStorage(); // Clear the history from local storage
            clearSearchHistoryUI(); // Clear the search history display from the UI
        });
    }
}

// Function to clear the search history display from the UI
function clearSearchHistoryUI() {
    const searchHistoryContainer = document.getElementById('search-history');

    if (searchHistoryContainer) {
        searchHistoryContainer.innerHTML = ''; // Clear the UI content
        console.log("Search history cleared from the UI.");
    }
}

// Example usage: Initialize search history when the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeSearchHistory(); // Initialize the search history functionality
});
