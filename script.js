// Declare DOM elements
const locationEl = document.getElementById('location');
const mainTemperatureEl = document.getElementById('main-temperature');
const weatherIconEl = document.getElementById('weather-icon');
const weatherMainEl = document.getElementById('weather-main');
const humidityEl = document.getElementById('humidity');
const feelkLikeEl = document.getElementById('feels-like');
const windEl = document.getElementById('wind');
const windGustEl = document.getElementById('wind-gust');

const locationSelectorDropdown = document.getElementById('location-selector');
const getWeatherBtn = document.getElementById('get-weather-btn');

// Fetch weather data
async function getWeather(city) {
    try {
        const res = await fetch(
            `https://weather-proxy.freecodecamp.rocks/api/city/${city}`,
        );
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('There was an error fetching weather data: ', error);
        throw error;
    }
}

// Check if the data value is undefined or exist
function displayOrNa(value) {
    if (value === undefined) {
        return 'N/A';
    }
    return value;
}

// Show the weather data
async function showWeather(city) {
    try {
        const data = await getWeather(city);

        const cityName = data.name;
        const weatherIcon =
            data.weather && data.weather[0] ? data.weather[0].icon : undefined;
        const weatherCondition =
            data.weather && data.weather[0] ? data.weather[0].main : undefined;
        const temperature = data.main ? data.main.temp : undefined;
        const feelsLike = data.main ? data.main.feels_like : undefined;
        const humidity = data.main ? data.main.humidity : undefined;
        const windSpeed = data.wind ? data.wind.speed : undefined;
        const windGust = data.wind ? data.wind.gust : undefined;

        locationEl.textContent = displayOrNa(cityName);
        weatherIconEl.src = weatherIcon ? weatherIcon : '';
        weatherMainEl.textContent = displayOrNa(weatherCondition);
        mainTemperatureEl.textContent = displayOrNa(temperature);
        feelkLikeEl.textContent = displayOrNa(feelsLike);
        humidityEl.textContent = displayOrNa(humidity);
        windEl.textContent = displayOrNa(windSpeed);
        windGustEl.textContent = displayOrNa(windGust);
    } catch (error) {
        alert('Something went wrong, please try again later');
    }
}

getWeatherBtn.addEventListener('click', () => {
    const selectedCity = locationSelectorDropdown.value;
    if (!selectedCity) {
        return;
    }
    showWeather(selectedCity);
});
