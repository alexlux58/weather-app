const city = "San Jose";
const part1 = "71913";
const part2 = "d8e3f";
const part3 = "4b478";
const part4 = "a4740";
const part5 = "c0677";
const part6 = "ce30c";
const part7 = "c2";
const totalParts = part1 + part2 + part3 + part4 + part5 + part6 + part7;
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=imperial";
const weatherIcon = document.querySelector(".weather-icon");

function handleWeatherCheck() {
  const userCity = document.getElementById("cityInput").value;
  if (userCity) {
    checkWeather(userCity);
  }
}

// Attach the click event listener to the search button
document
  .getElementById("searchButton")
  .addEventListener("click", handleWeatherCheck);

// Attach the keydown event listener to the input field
document
  .getElementById("cityInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      handleWeatherCheck();
    }
  });

// Get current location
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    checkWeather(null, lat, lon);
  });
} else {
  alert("Geolocation is not supported by this browser.");
}

async function checkWeather(city, lat, lon) {
  let url = apiUrl + `&appid=${totalParts}`;

  if (city) {
    url += `&q=${city}`;
  } else if (lat && lon) {
    url += `&lat=${lat}&lon=${lon}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  if (data.cod === 200) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp);
    document.querySelector(".humidity").innerHTML = Math.round(
      data.main.humidity
    );
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed);

    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Snow":
        weatherIcon.src = "images/snow.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
      default:
        break;
    }
  } else {
    document.querySelector("#cityInput").value = "City not found";
  }
}
