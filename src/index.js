// let celsiusTemperature = Math.round(temperature);
// let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);

//console.log(now.getDate());
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
function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiKey = "66decd6fe52d82f120eb1be8f6e6d5d8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  let city = document.querySelector("h2");
  city.innerHTML = cityInput.value;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#today-temp");
  let city = document.querySelector("h2");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let iconElement = document.querySelector("#current-icon");
  city.innerHTML = response.data.name;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}`;
  description.innerHTML = response.data.weather[0].description;
  temperature.innerHTML = currentTemp;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let selectCity = document.querySelector(".search-form");
selectCity.addEventListener("submit", changeCity);

function defaultCity() {
  let cityInput = "London";
  let apiKey = "66decd6fe52d82f120eb1be8f6e6d5d8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  let city = document.querySelector("h2");
  city.innerHTML = cityInput.value;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

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
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showLocalTemperature);
}

function showLocalTemperature(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#today-temp");
  let city = document.querySelector("h2");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let iconElement = document.querySelector("#current-icon");
  city.innerHTML = response.data.name;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}m/s`;
  description.innerHTML = response.data.weather[0].description;
  temperature.innerHTML = currentTemp;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let currentCity = document.querySelector(".current-city");
currentCity.addEventListener("click", localCity);

/* function changeUnitToCelsius(event) {
  event.preventDefault();

  let Temperature = document.querySelector("#today-temp");

  if (Temperature.innerHTML === "66") {
    Temperature.innerHTML = "20";
  } else {
    Temperature.innerHTML = "20";
  }
}
let selectFTemperature = document.querySelector("#celsius-temperature");
selectFTemperature.addEventListener("click", changeUnitToCelsius);

function changeUnitToFahrenheit(event) {
  event.preventDefault();

  let Temperature = document.querySelector("#today-temp");

  if (Temperature.innerHTML === "20") {
    Temperature.innerHTML = "66";
  } else {
    Temperature.innerHTML = "66";
  }
}
let selectCTemperature = document.querySelector("#fahrenheit-temperature");
selectCTemperature.addEventListener("click", changeUnitToFahrenheit); */
