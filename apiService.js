// Constants
const API_KEY = 'ugnviopeinbeunwjd[i04872-=8905'; // Replace this with your actual API key from OpenWeather

// Function to fetch current weather data
async function fetchWeatherData(city) {
    try {
        // Fetching the current weather data for the city from OpenWeatherMap API
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        // Error handling for HTTP response
        if (!response.ok) {
            throw new Error('City not found. Please try again.');
        }

        const weatherData = await response.json();
        console.log(`Fetched current weather data for ${city}:`, weatherData);
        return weatherData;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
}

// Function to fetch 5-day weather forecast
async function fetchWeatherForecast(city) {
    try {
        // Fetching the 5-day weather forecast data for the city from OpenWeatherMap API
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);

        // Error handling for HTTP response
        if (!response.ok) {
            throw new Error('City not found or forecast data unavailable. Please try again.');
        }

        const forecastData = await response.json();
        console.log(`Fetched 5-day weather forecast for ${city}:`, forecastData);
        return forecastData;
    } catch (error) {
        console.error("Error fetching weather forecast data:", error);
        throw error;
    }
}

// Function to fetch air pollution data for a given city (requires city coordinates)
async function fetchAirPollutionData(lat, lon) {
    try {
        // Fetching air pollution data from OpenWeatherMap API based on latitude and longitude
        const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);

        // Error handling for HTTP response
        if (!response.ok) {
            throw new Error('Air pollution data not available for the selected location.');
        }

        const airPollutionData = await response.json();
        console.log(`Fetched air pollution data for coordinates (${lat}, ${lon}):`, airPollutionData);
        return airPollutionData;
    } catch (error) {
        console.error("Error fetching air pollution data:", error);
        throw error;
    }
}

// Function to mock weather data for testing purposes (if API is unavailable)
function mockWeatherData() {
    return {
        weather: [{ description: "clear sky", icon: "01d" }],
        main: { temp: 25, feels_like: 24, temp_min: 20, temp_max: 30, humidity: 50 },
        wind: { speed: 3.6 },
        name: "Mock City",
        coord: { lat: 40.7128, lon: -74.0060 }
    };
}

// Function to mock forecast data for testing purposes
function mockForecastData() {
    return {
        list: [
            { dt_txt: "2024-10-07 12:00:00", main: { temp: 23 }, weather: [{ description: "few clouds" }] },
            { dt_txt: "2024-10-07 15:00:00", main: { temp: 26 }, weather: [{ description: "scattered clouds" }] },
            { dt_txt: "2024-10-07 18:00:00", main: { temp: 21 }, weather: [{ description: "clear sky" }] }
        ]
    };
}

// Function to mock air pollution data for testing purposes
function mockAirPollutionData() {
    return {
        list: [
            { main: { aqi: 2 }, components: { pm2_5: 12.5, pm10: 18.0, co: 200 } }
        ]
    };
}

// Function to display fetched data (weather, forecast, air pollution) for a city
async function displayCityData(city) {
    try {
        // Fetch current weather
        const weatherData = await fetchWeatherData(city);
        console.log(`Weather for ${city}:`, weatherData);

        // Fetch weather forecast
        const forecastData = await fetchWeatherForecast(city);
        console.log(`5-day forecast for ${city}:`, forecastData);

        // Fetch air pollution data using city coordinates from weather data
        const { lat, lon } = weatherData.coord;
        const airPollutionData = await fetchAirPollutionData(lat, lon);
        console.log(`Air pollution data for ${city}:`, airPollutionData);
    } catch (error) {
        console.error(`Error displaying data for ${city}:`, error);
    }
}

// Function to simulate fetching data with mocked data
function simulateWithMockData() {
    const mockWeather = mockWeatherData();
    console.log("Mock Weather Data:", mockWeather);

    const mockForecast = mockForecastData();
    console.log("Mock Forecast Data:", mockForecast);

    const mockAirPollution = mockAirPollutionData();
    console.log("Mock Air Pollution Data:", mockAirPollution);
}

// Example usage
(async () => {
    const city = "London";

    // Fetch actual data from OpenWeather API
    await displayCityData(city);

    // Simulate fetching data using mock data
    console.log("\nSimulating with mock data:");
    simulateWithMockData();
})();
