let date = document.querySelector("#current-date");
let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let hours = currentTime.getHours();
let minutes =
  (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
date.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//Choosing a city
function submitCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCityData(cityInput.value);
}
//getting data
function searchCityData(city) {
  let apiKey = "66decd6fe52d82f120eb1be8f6e6d5d8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

//displaying the data
function showTemperature(response) {
  let temperature = document.querySelector("#today-temp");
  let city = document.querySelector("h2");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let iconElement = document.querySelector("#current-icon");

  celsiusTemperature = response.data.main.temp;

  city.innerHTML = response.data.name;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
  temperature.innerHTML = Math.round(celsiusTemperature);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiKey = "66decd6fe52d82f120eb1be8f6e6d5d8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

//displaying the forecast
function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
          alt=""
          width="42"
          />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-max"> ${Math.round(
          forecastDay.temp.max
        )}° </span>
        <span class="weather-forecast-min"> ${Math.round(
          forecastDay.temp.min
        )}° </span>
      </div>
    </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let selectCity = document.querySelector(".search-form");
selectCity.addEventListener("submit", submitCity);

//Local weather
function localCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "66decd6fe52d82f120eb1be8f6e6d5d8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let currentCity = document.querySelector(".current-city");
currentCity.addEventListener("click", localCity);

celsiusTemperature = null;

searchCityData("London");
