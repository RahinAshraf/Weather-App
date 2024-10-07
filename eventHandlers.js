function setupEventListeners() {
    document.getElementById('get-weather-btn').addEventListener('click', async () => {
        const cityInput = document.getElementById('city-input').value;
        
        if (cityInput) {
            try {
                const weatherData = await fetchWeatherData(cityInput);
                saveCityToLocalStorage(cityInput); // Save valid search
                renderWeatherData(weatherData);
                clearErrorMessage();
            } catch (error) {
                displayErrorMessage(error.message);
            }
        } else {
            displayErrorMessage("Please enter a city name.");
        }
    });
}

function clearErrorMessage() {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.innerHTML = '';
    errorMessageElement.classList.add('hidden');
}
