function formatTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = time.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  let date = time.getDate();

  let monthIndex = time.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[monthIndex];

  return `${day}, ${date} ${month} <br> ${hours}:${minutes}`;
}

let timeElement = document.querySelector("#current-date");
let currentTime = new Date();
timeElement.innerHTML = formatTime(currentTime);

function displayWeatherCondition(response) {
  celsiusTemperature = response.data.main.temp;
  let temperatureDescription = document.querySelector("#background-image");
  temperatureDescription = response.data.weather[0].main;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#temperature-description").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  if (temperatureDescription === "clear") {
    backgroundImage.setAttribute(
      "style",
      `background-image:url(src/clear.jpg);`
    );
  } else if (temperatureDescription === "clouds") {
    backgroundImage.setAttribute(
      "style",
      `background-image:url(src/clouds.jpg);`
    );
  } else if (temperatureDescription === "rain || drizzle") {
    backgroundImage.setAttribute(
      "style",
      `background-image:url(src/rain.jpg);`
    );
  } else if (temperatureDescription === "mist || haze") {
    backgroundImage.setAttribute(
      "style",
      `background-image:url(src/mist.jpg);`
    );
  } else if (temperatureDescription === "thunderstorm") {
    backgroundImage.setAttribute(
      "style",
      `background-image:url(src/thunderstorm.jpg);`
    );
  } else if (temperatureDescription === "snow") {
    backgroundImage.setAttribute(
      "style",
      `background-image:url(src/snow.jpg);`
    );
  }
}



function searchCity (city) {
  let apiKey = "601d6d06ce387ac1305b54eb7df93ac7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity (city);
}

function searchLocation(position) {
  let apiKey = "601d6d06ce387ac1305b54eb7df93ac7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
 
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let celsiusTemperature = null;


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Perth");
