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
let currentDay = days[currentTime.getDay()];
let hours = currentTime.getHours();
let minutes =
  (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
date.innerHTML = `${currentDay} ${hours}:${minutes}`;

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
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
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
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//displaying the forecast
function showForecast() {
  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastHTML =
    forecastHTML +
    `
    <div class="col-2">
      <div class="weather-forecast-day">Monday</div>
      <img src="images/partly_cloudy.png" />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-max">21°</span>
        <span class="weather-forecast-min">18°</span>
      </div>
    </div>
`;
  forecastHTML =
    forecastHTML +
    `
    <div class="col-2">
      <div class="weather-forecast-day">Monday</div>
      <img src="images/partly_cloudy.png" />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-max">21°</span>
        <span class="weather-forecast-min">18°</span>
      </div>
    </div>
`;
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
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

let fahrenheitLink = document.querySelector("#fahrenheit-temperature");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let celsiusLink = document.querySelector("#celsius-temperature");
celsiusLink.addEventListener("click", changeToCelsius);

celsiusTemperature = null;

function changeToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let todayTemp = document.querySelector("#today-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  todayTemp.innerHTML = Math.round(fahrenheitTemperature);
}

function changeToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let todayTemp = document.querySelector("#today-temp");
  todayTemp.innerHTML = Math.round(celsiusTemperature);
}

searchCityData("London");
showForecast();
