// Global variables for the search history array, the api key, and the api url
var searchHistory = [];
var apiKey = "1ab858a5505d5908820588cc1ee2f9e5";
var apiURL = "https://api.openweathermap.org";

// Global variables for selecting various HTML elements via id
var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#search-input");
var currentWeatherContainer = document.querySelector(
  "#current-weather-container"
);
var searchedCity = document.querySelector("#searched-city");
var forecastHeader = document.querySelector("#forecast-header");
var forecastContainer = document.querySelector("#forecast-container");
var searchedCityButton = document.querySelector("#searched-city-buttons");

// function to submit the search form, which will get both the current weather and the five day forecast
// this will also call the function that saves the search to local storage
var formSumbitHandler = (e) => {
  e.preventDefault();
  var city = searchInput.value.trim();
  if (city) {
    getCurrentWeather(city);
    getForecast(city);
    searchHistory.unshift({ city });
    searchInput.value = "";
  } else {
    alert("Please enter a City");
  }
  saveSearch();
  pastSearch(city);
};

// function to save the search to local storage
var saveSearch = () => {
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
};

// function to create the buttons that will search for previously searched cities
var pastSearch = (pastSearch) => {
  pastSearchElement = document.createElement("button");
  pastSearchElement.textContent = pastSearch;
  pastSearchElement.classList = "d-flex w-100 btn-light border p-2";
  pastSearchElement.setAttribute("data-city", pastSearch);
  pastSearchElement.setAttribute("type", "submit");

  searchedCityButton.prepend(pastSearchElement);
};

// function to handle the past searches, calls upon the current weather and forecast functions
var pastSearchHandler = (e) => {
  var city = e.target.getAttribute("data-city");
  if (city) {
    getCurrentWeather(city);
    getForecast(city);
  }
};

// function to get the current weather from the API, calls upon the render weather function
var getCurrentWeather = (city) => {
  fetch(`${apiURL}/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      renderCurrentWeather(data, city);
    }); // displayWeather(data, city);
};

// function that creates HTML elements containing various current weather information, appends them appropriately
var renderCurrentWeather = (weather, searchCity) => {
  // clears the container 
  currentWeatherContainer.textContent = "";
  searchedCity.textContent = searchCity;

  // date element using moment.js 
  var currentDate = document.createElement("span");
  currentDate.textContent =
    " (" + moment(weather.dt.value).format("MM/DD/YYYY") + ") ";
  searchInput.appendChild(currentDate);

  var weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `${apiURL}/img/w/${weather.weather[0].icon}.png`
  );
  searchInput.appendChild(weatherIcon);

  var tempElement = document.createElement("span");
  tempElement.textContent = "Temperature: " + weather.main.temp + " °F";
  tempElement.classList = "list-group-item";

  var humidityElement = document.createElement("span");
  humidityElement.textContent = "Humidity: " + weather.main.humidity;
  humidityElement.classList = "list-group-item";

  var windElement = document.createElement("span");
  windElement.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
  windElement.classList = "list-group-item";

  // append all elements to the current weather container 
  currentWeatherContainer.appendChild(tempElement);
  currentWeatherContainer.appendChild(humidityElement);
  currentWeatherContainer.appendChild(windElement);

  var lat = weather.coord.lat;
  var lon = weather.coord.lon;
  getUVI(lat, lon);
};

// function that retrieves UV index information from the API
var getUVI = (lat, lon) => {
  fetch(`${apiURL}/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`)
    .then((res) => res.json())
    .then((data) => {
      renderUVI(data);
    });
};

// function that renders the uv index information
var renderUVI = (index) => {
  var uviElement = document.createElement("div");
  uviElement.textContent = "UV Index: ";
  uviElement.classList = "list-group-item";

  uviValue = document.createElement("span");
  uviValue.textContent = index.value;

  if (index.value <= 2) {
    uviValue.classList = "favorable";
  } else if (index.value > 2 && index.value <= 8) {
    uviValue.classList = "moderate ";
  } else if (index.value > 8) {
    uviValue.classList = "severe";
  }

  uviElement.appendChild(uviValue);

  // appends uv index to current weather container
  currentWeatherContainer.appendChild(uviElement);
};

// function that retrieves API data for the five day forecast
var getForecast = (city) => {
  fetch(`${apiURL}/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      renderForecast(data);
    });
};

// function that creates HTML elements containing various forecast weather information, appends them appropriately
var renderForecast = (weather) => {
  forecastContainer.textContent = "";
  forecastHeader.textContent = "5-Day Forecast:";

  var forecast = weather.list;
  // for loop to provide the five day forecast 
  for (var i = 5; i < forecast.length; i = i + 8) {
    var dailyForecast = forecast[i];

    var forecastElement = document.createElement("div");
    forecastElement.classList = "card bg-primary text-light m-2";

    // use moment.js to create date 
    var forecastDate = document.createElement("h5");
    forecastDate.textContent = moment.unix(dailyForecast.dt).format("M/D/YYYY");
    forecastDate.classList = "card-header text-center";
    forecastElement.appendChild(forecastDate);

    var weatherIcon = document.createElement("img");
    weatherIcon.classList = "card-body text-center";
    weatherIcon.setAttribute(
      "src",
      `${apiURL}/img/w/${dailyForecast.weather[0].icon}.png`
    );
    forecastElement.appendChild(weatherIcon);

    var forecastTempElement = document.createElement("span");
    forecastTempElement.classList = "card-body text-center";
    forecastTempElement.textContent = dailyForecast.main.temp + " °F";
    forecastElement.appendChild(forecastTempElement);

    var forecastHumidElement = document.createElement("span");
    forecastHumidElement.classList = "card-body text-center";
    forecastHumidElement.textContent = dailyForecast.main.humidity;
    forecastElement.appendChild(forecastHumidElement);

    forecastContainer.appendChild(forecastElement);
  }
};

searchForm.addEventListener("submit", formSumbitHandler);
searchedCityButton.addEventListener("click", pastSearchHandler);