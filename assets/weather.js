// Set variables for API key and url 
var apiKey = "1ab858a5505d5908820588cc1ee2f9e5";
var apiURL = "https://api.openweathermap.org";

// Variables for query selectors for current weather and search 
var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var searchButton = document.querySelector('#search-button')
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

searchButton.addEventListener('click', function(event) { 
  fetch(`${apiURL}/data/2.5/weather?q=${searchInput}&appid=${apiKey}`)
  .then(res => res.json())
  .then(searchData => {
    var searchCity = searchData.city;
    var temp = searchData.temp;
    var wind_speed = searchData.wind_speed;
    var uvi = searchData.uvi;
    var humidity = searchData.humidity;
    var icon = `https://openweathermap.org/img/w/${searchData.searchData[0].icon}.png`;

    searchInput.value ="";
    cityQuery.innerHTML = searchCity;
    dateQuery.innerHTML = date;
    tempQuery.innerHTML = "Temperature:" + temp + " °F";
    wind_speedQuery.innerHTML = "Wind Speed: " + wind_speed;
    uviQuery.innerHTML = "UVI: " + uvi;
    humidityQuery.innerHTML = "Humidity: " + humidity;
    iconQuery.innerHTML = icon;



  })
})

