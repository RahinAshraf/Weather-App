function renderWeatherData(weatherData) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
        <p><strong>Temperature:</strong> ${weatherData.main.temp} °C</p>
        <p><strong>Weather:</strong> ${weatherData.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${weatherData.wind.speed} m/s</p>
    `;
    weatherInfo.classList.remove('hidden');
    weatherInfo.style.display = 'block';
}

function displayErrorMessage(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.innerHTML = message;
    errorMessageElement.classList.remove('hidden');
    errorMessageElement.style.display = 'block';
}
