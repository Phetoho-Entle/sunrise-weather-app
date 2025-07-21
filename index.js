function search (event) {
event.preventDefault();
let searchInputElement = document.querySelector("#search-input");
let city = searchInputElement.value;

let apiKey = "739f904148cfa8boc86t8a8b426aac3f";
let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.temperature.current);
    temperatureElement.innerHTML = `${temperature}<span id="degrees">°</span>`;

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;

    let iconElement = document.querySelector("#weather-icon-img");
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt",response.data.condition.description);

  let weatherConditionsElement = document.querySelector("#weather-conditions");
  weatherConditionsElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;

}

function loadDefaultCity () {
    let city = "London";
    let apiKey = "739f904148cfa8boc86t8a8b426aac3f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);

}

function formatDate(date) {
let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];

  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;

  return `${day} ${hours}:${minutes}`;
}

let now = new Date();
document.querySelector("#date-time").innerHTML = formatDate(now);

loadDefaultCity();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit",search);