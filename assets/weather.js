// Set variables for API key and url 
var apiKey = "1ab858a5505d5908820588cc1ee2f9e5";
var apiURL = "https://api.openweathermap.org";
var searchHistory = [];

// Variables for search query selectors 
var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var searchButton = document.querySelector('#search-button');

// Variables for current weather query selectors 
var currentWeatherContainer = document.querySelector('#current-weather-container');
var currentWeatherHeader = document.querySelector('#current-weather-header');
var cityQuery = document.querySelector('#city-name');
var dateQuery = document.querySelector('#date');
var tempQuery = document.querySelector('#temp');
var wind_speedQuery = document.querySelector('#wind-speed');
var uviQuery = document.querySelector('#uvi');
var humidityQuery = document.querySelector('#humidity');
var iconQuery = document.querySelector('#weather-icon');

var todayContainer = document.querySelector('#today');
var forecastContainer = document.querySelector('#forecast');
var searchHistoryContainer = document.querySelector('#history');

// Current weather variables 
var date = dayjs().format('MM/DD/YYYY');
// var temp = weather.temp;
// var wind_speed = weather.wind_speed;
// var uvi = weather.uvi;
// var humidity = weather.humidity;
// var icon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;


async function searchFormHandler(event) {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();
  // Gather the data from the form elements on the page
  const city = await searchInput.value.trim();

  if (city) {
    getCurrentWeather(city);
    // getForecast(city);
    searchHistory.unshift({city});
    searchInput.value = "";
  } else {
    alert("Please enter a city to search.");
  }
  // add save search and past search functions, include those here 
  saveSearch();
};

const saveSearch = () => {
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
};

const getCurrentWeather = (city) => {
  fetch(`${apiURL}/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
  .then(res => res.json())
  .then(searchData => {
    renderCurrentWeather(searchData, city);
  });
}

const renderCurrentWeather = (weather, searchCity) => {
  // clear the container
  currentWeatherContainer.textContent= "";

  console.log(weather);

  var temp = weather.temp;
  var wind_speed = weather.wind_speed;
  var uvi = weather.uvi;
  var humidity = weather.humidity;
  var icon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

  currentWeatherHeader.innerHTML = "Current Weather:"
  cityQuery.innerHTML = searchCity;
  dateQuery.innerHTML = date;
  tempQuery.innerHTML = "Temperature:" + temp + " °F";
  wind_speedQuery.innerHTML = "Wind Speed: " + wind_speed;
  uviQuery.innerHTML = "UVI: " + uvi;
  humidityQuery.innerHTML = "Humidity: " + humidity;
  iconQuery.innerHTML = icon;
};


// Create function for five day forecast 


// // Create function to fetch current weather 
// searchButton.addEventListener('click', function(event) { 
//   fetch(`${apiURL}/data/2.5/weather?q=${searchInput}&appid=${apiKey}`)
//   .then(res => res.json())
//   .then(searchData => {
//     var searchCity = searchData.city;
//     var temp = searchData.temp;
//     var wind_speed = searchData.wind_speed;
//     var uvi = searchData.uvi;
//     var humidity = searchData.humidity;
//     var icon = `https://openweathermap.org/img/w/${searchData.searchData[0].icon}.png`;

//     searchInput.value ="";
//     cityQuery.innerHTML = searchCity;
//     dateQuery.innerHTML = date;
//     tempQuery.innerHTML = "Temperature:" + temp + " °F";
//     wind_speedQuery.innerHTML = "Wind Speed: " + wind_speed;
//     uviQuery.innerHTML = "UVI: " + uvi;
//     humidityQuery.innerHTML = "Humidity: " + humidity;
//     iconQuery.innerHTML = icon;



//   })
// })






searchForm.addEventListener('submit', searchFormHandler);