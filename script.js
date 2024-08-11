const apiKey = "6102df53bc0b239e37f00b54886a9997";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(query) {
    let url;
    if (isValidCoordinates(query)) {
        const [lat, lon] = query.split(",");
        url = `${apiUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}`;
    } else {
        url = `${apiUrl}&q=${query}&appid=${apiKey}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                displayError("Invalid City Name");
            } else {
                throw new Error("Network response was not ok");
            }
        } else {
            const data = await response.json();
            updateWeatherInfo(data);
            setWeatherIcon(data.weather[0].main);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
    }
}

function isValidCoordinates(query) {
    const [lat, lon] = query.split(",");
    return !isNaN(lat) && !isNaN(lon);
}

function updateWeatherInfo(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".latitude").innerHTML = data.coord.lat + "° N";
    document.querySelector(".longitude").innerHTML = data.coord.lon + "° E";
}

function setWeatherIcon(weatherCondition) {
    switch (weatherCondition) {
        case "Clouds":
            weatherIcon.src = "img/Conditions/cloudy.png";
            break;
        case "Clear":
            weatherIcon.src = "img/Conditions/sun.png";
            break;
        case "Rain":
            weatherIcon.src = "img/Conditions/rain.png";
            break;
        case "Drizzle":
            weatherIcon.src = "img/Conditions/drizzle.png";
            break;
        case "Mist":
            weatherIcon.src = "img/Conditions/fog.png";
            break;
        default:
            weatherIcon.src = "img/Conditions/cancel.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    document.querySelector(".view-btn").style.display = "block";
}

function displayError(message) {
    document.querySelector(".error").innerHTML = message;
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
