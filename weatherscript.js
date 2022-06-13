const getButton = document.getElementById("button");
const form = document.querySelector(".form");
const search = document.getElementById("search");
const degreesNow = document.querySelector(".degreesnow");
const city = document.querySelector(".city");
const conditionNow = document.querySelector(".conditionnow");
const icon = document.querySelector(".imagenow");
const cloudy = document.querySelector(".clouds");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const pressure = document.querySelector(".pressure");
const tempertureTommorow = document.querySelector(".temperaturetomorrow");
const cloudyTom = document.querySelector(".cloudstom");
const humidityTom = document.querySelector(".humiditytom");
const windTom = document.querySelector(".windtom");
const pressureTom = document.querySelector(".pressuretom");
const container = document.querySelector(".container");
const containerNow = document.querySelector(".containernow");

const kelvinToCelcius = (kelvin) => {
  return (kelvin - 273.15).toFixed();
};

const pressureToMm = (pres) => {
  return (pres / 1.3332239).toFixed();
};

const setBackgroundImg = (cond) => {
  if (cond === "Clouds") {
    container.style.backgroundImage = 'url("./image/cloudyday.jpg")';
  } else if (cond === "clear") {
    container.style.backgroundImage = 'url("./image/sunnyday.jpg")';
    // containerNow.style.zIndex = "1";
  } else if (cond === "Rain") {
    container.style.backgroundImage = 'url("./image/rainday.jpg")';
  } else if (cond === "snow") {
    container.style.backgroundImage = 'url("./image/snowday.jpg")';
  }
};

// const dayOfTheWeek = (day, month, year) => {
//   const weekday = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   return weekday[new Date(`${day}/${month}/${year}`).getDay()];
// };

const getAndRenderWeatherByCoord = () => {
  let lat;
  let lon;

  navigator.geolocation.getCurrentPosition(async (position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    const APIkey = "c01813a711179709aebbfc8d36ead466";
    const api = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=hourly,hourly&appid=${APIkey}`;

    const weatherByCoords = await fetch(api)
      .then((res) => res.json())
      .catch((e) => console.log(e));

    console.log(weatherByCoords);

    const renderWeatherByCoords = (data) => {
      city.innerHTML = data.city.name;
      const temperture = kelvinToCelcius(data.list[0].main.temp);
      const pressureTod = pressureToMm(data.list[0].main.pressure);
      const pressureTomorow = pressureToMm(data.list[6].main.pressure);
      degreesNow.innerHTML = `${temperture}&#176;`;
      conditionNow.innerHTML = data.list[0].weather[0].main;
      icon.src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;
      cloudy.innerHTML = data.list[0].clouds.all + " %";
      humidity.innerHTML = data.list[0].main.humidity + " %";
      wind.innerHTML = Math.round(data.list[0].wind.speed) + " km/h";
      pressure.innerHTML = pressureTod + " mmHg";
      cloudyTom.innerHTML = data.list[6].clouds.all + " %";
      humidityTom.innerHTML = data.list[6].main.humidity + " %";
      windTom.innerHTML = Math.round(data.list[6].wind.speed) + " km/h";
      pressureTom.innerHTML = pressureTomorow + " mmHg";
      setBackgroundImg(data.list[0].weather[0].main);
    };
    renderWeatherByCoords(weatherByCoords);
  });
};

getButton.onclick = () => {
  getAndRenderWeatherByCoord();
};

const getAndRenderWeatherByCity = async (cityName) => {
  const APIkey = "c01813a711179709aebbfc8d36ead466";
  const api = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&exclude=hourly,hourly&appid=${APIkey}`;

  const weatherByCity = await fetch(api)
    .then((res) => res.json())
    .catch((e) => console.log(e));

  const renderWeatherByCity = (data) => {
    const temperture = kelvinToCelcius(data.list[0].main.temp);
    city.innerHTML = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    const pressureTod = pressureToMm(data.list[0].main.pressure);
    const pressureTomorow = pressureToMm(data.list[6].main.pressure);
    degreesNow.innerHTML = `${temperture}&#176;`;
    conditionNow.innerHTML = data.list[0].weather[0].main;
    icon.src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;
    cloudy.innerHTML = data.list[0].clouds.all + " %";
    humidity.innerHTML = data.list[0].main.humidity + " %";
    wind.innerHTML = Math.round(data.list[0].wind.speed);
    pressure.innerHTML = pressureTod + " mmHg";
    cloudyTom.innerHTML = data.list[6].clouds.all + " %";
    humidityTom.innerHTML = data.list[6].main.humidity + " %";
    windTom.innerHTML = Math.round(data.list[6].wind.speed) + " km/h";
    pressureTom.innerHTML = pressureTomorow + " mmHg";
    setBackgroundImg(data.list[0].weather[0].main);
  };
  renderWeatherByCity(weatherByCity);
};
form.addEventListener("submit", (el) => {
  el.preventDefault();
  const cityName = search.value;
  if (cityName) {
    getAndRenderWeatherByCity(cityName);
  }
});
