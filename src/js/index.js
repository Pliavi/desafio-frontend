const UrlAPI = city => {
  let url = "https://api.hgbrasil.com/weather/?format=json";
  url += `&city_name=${city}`;
  url += "&locale=pt&key=f43feaa5";

  return url;
};

document
  .querySelector(".CityInput > .-button")
  .addEventListener("click", getByName);

function getByName() {
  let city = document.querySelector(".CityInput > .-input").value;

  fetch(UrlAPI(city))
    .then(res => res.json())
    .then(data => processWeather(data.results))
    .catch(err => console.log(err));
}

function processWeather(weather) {
  let $cityName = document.querySelector(".CityBox > .-cityName");
  let $actualWeather = document.querySelector(".CityBox > .-actualWeather");
  let $min = document.querySelector(".Temperature > .-min");
  let $max = document.querySelector(".Temperature > .-max");
  let $velocity = document.querySelector(".Wind > .-velocity > span");
  let $humidity = document.querySelector(".Wind > .-humidity > span");

  $cityName.textContent = weather.city_name;
  $actualWeather.textContent = `${weather.temp}°C ${weather.description}`;
  $min.textContent = `${weather.forecast[0].min}°C`;
  $max.textContent = `${weather.forecast[0].max}°C`;
  $velocity.textContent = weather.wind_speedy;
  $humidity.textContent = `${weather.humidity}%`;

  let $days = document.querySelectorAll(".Forecast > .Day");
  $days.forEach(($day, index) => {
    forecast = weather.forecast[index];
    let $dayName = $day.querySelector(".-dayName");
    let $temperatures = $day.querySelectorAll(".-temperature");

    $dayName.textContent = forecast.weekday;
    $temperatures[0].textContent = `${forecast.min}°`;
    $temperatures[1].textContent = `${forecast.max}°`;
  });
}

function capitalsWeather() {
  let capitals = [
    "Rio de Janeiro",
    "São Paulo"
    //"Belo Horizonte",
    //"Brasília",
    //"Belém",
    //"Salvador",
    //"Curitiba",
    //"Fortaleza",
    //"Manaus",
    //"João Pessoa"
  ];

  let $capitalTables = document.getElementsByClassName("CapitalsTable");
  for ($table of $capitalTables) {
    $table.innerHTML = "";
  }

  let $left = document.querySelector(".WeatherTable > .-left > .CapitalsTable");
  let $right = document.querySelector(
    ".WeatherTable > .-right > .CapitalsTable"
  );

  capitals.forEach((capital, i) => {
    fetch(UrlAPI(capital))
      .then(res => res.json())
      .then(data =>
        processCapitalWeather(
          data.results,
          capital,
          i >= capitals.length / 2 ? $left : $right
        )
      )
      .catch(err => console.log(err));
  });
}

function processCapitalWeather({ forecast }, cityName, container) {
  const info = {
    forecast: forecast[0],
    cityName: cityName
  };

  const $template = ({ forecast: { min, max }, cityName }) => {
    let $node = document.createElement("div");
    $node.classList.add("Capital");
    $node.innerHTML = `
      <span class="-min">${min}</span>
      <span class="-max">${max}</span>
      <span class="-city">${cityName}</span>
    `;

    return $node;
  };

  container.appendChild($template(info));
}

//capitalsWeather();
