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

// // Function and variables for the current weather in a city 
// const displayCurrentWeather = (city, weather) => {
//     var date = dayjs().format('MM/DD/YYYY');
//     var temp = weather.temp;
//     var wind_speed = weather.wind_speed;
//     var uvi = weather.uvi;
//     var humidity = weather.humidity;
//     var icon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

//     // Create elements 
//     var card = document.createElement('div');
//     var cardBody = document.createElement('div');
//     var heading = document.createElement('h3');
//     var weatherIcon = document.createElement('img');
//     var tempElement = document.createElement('p');
//     var windElement = document.createElement('p');
//     var humidityElement = document.createElement('p');
//     var uvElement = document.createElement('p');
//     var uviBadge = document.createElement('button');

//     card.setAttribute('class', 'card');
//     cardBody.setAttribute('class', 'card-body');
//     card.append(cardBody);
  
//     heading.setAttribute('class', 'h3 card-title');
//     tempElement.setAttribute('class', 'card-text');
//     windElement.setAttribute('class', 'card-text');
//     humidityElement.setAttribute('class', 'card-text');
  
//     heading.textContent = `${city} (${date})`;
//     weatherIcon.setAttribute('src', icon);
//     weatherIcon.setAttribute('class', 'weather-img');
//     heading.append(weatherIcon);
//     tempElement.textContent = `Temp: ${temp}°F`;
//     windElement.textContent = `Wind: ${wind_speed} MPH`;
//     humidityElement.textContent = `Humidity: ${humidity} %`;
//     cardBody.append(heading, tempElement, windElement, humidityElement);
  
//     uvElement.textContent = 'UV Index: ';
//     uviBadge.classList.add('btn', 'btn-sm');
  
//     if (uvi < 3) {
//       uviBadge.classList.add('btn-success');
//     } else if (uvi < 7) {
//       uviBadge.classList.add('btn-warning');
//     } else {
//       uviBadge.classList.add('btn-danger');
//     }
  
//     uviBadge.textContent = uvi;
//     uvElement.append(uviBadge);
//     cardBody.append(uvElement);
  
//     todayContainer.innerHTML = '';
//     todayContainer.append(card);

// }

// // Function for a forecast card 
// const displayForecastCard = (forecast) => {

//     var icon = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
//     var unixDate = forecast.dt;
//     var temp = forecast.temp.day;
//     var { humidity } = forecast;
//     var wind_speed = forecast.wind_speed;

//     var col = document.createElement('div');
//     var card = document.createElement('div');
//     var cardBody = document.createElement('div');
//     var cardTitle = document.createElement('h5');
//     var weatherIcon = document.createElement('img');
//     var tempElement = document.createElement('p');
//     var windElement = document.createElement('p');
//     var humidityElement = document.createElement('p');

//     col.append(card);
//     card.append(cardBody);
//     cardBody.append(cardTitle, weatherIcon, tempElement, windElement, humidityElement);

//     col.setAttribute('class', 'col-md');
//     col.classList.add('five-day-card');
//     card.setAttribute('class', 'card bg-primary h-100 text-white');
//     cardBody.setAttribute('class', 'card-body p-2');
//     cardTitle.setAttribute('class', 'card-title');
//     tempElement.setAttribute('class', 'card-text');
//     windElement.setAttribute('class', 'card-text');
//     humidityElement.setAttribute('class', 'card-text');

//     // Add content to elements
//     cardTitle.textContent = dayjs.unix(unixDate).format('M/D/YYYY');
//     weatherIcon.setAttribute('src', icon);
//     tempElement.textContent = `Temp: ${temp} °F`;
//     windElement.textContent = `Wind: ${wind_speed} MPH`;
//     humidityElement.textContent = `Humidity: ${humidity} %`;

//     forecastContainer.append(col);

// }

// // Function to display 5 day forecast.
// const displayForecast = (dailyForecast) => {
//   // Create unix timestamps for start and end of 5 day forecast
//   var startDate = dayjs().add(1, 'day').startOf('day').unix();
//   var endDate = dayjs().add(6, 'day').startOf('day').unix();

//   var headingCol = document.createElement('div');
//   var heading = document.createElement('h4');

//   headingCol.setAttribute('class', 'col-12');
//   heading.textContent = '5-Day Forecast:';
//   headingCol.append(heading);

//   forecastContainer.innerHTML = '';
//   forecastContainer.append(headingCol);
//   for (var i = 0; i < dailyForecast.length; i++) {
//     // The api returns forecast data which may include 12pm on the same day and
//     // always includes the next 7 days. The api documentation does not provide
//     // information on the behavior for including the same day. Results may have
//     // 7 or 8 items.
//     if (dailyForecast[i].dt >= startDate && dailyForecast[i].dt < endDate) {
//       displayForecastCard(dailyForecast[i]);
//     }
//   }
// }

// const renderData = (city, data) => {
//   displayCurrentWeather(city, data.current);
//   displayForecast(data.daily);
// }

// // Fetches weather data for given location from the Weather Geolocation
// // endpoint; then, calls functions to display current and forecast weather data.
// const fetchWeather = (location) => {
//   var { lat } = location;
//   var { lon } = location;
//   var city = location.name;
//   var apiUrl = `${apiURL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;

//   fetch(apiUrl)
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       renderData(city, data);
//     })
//     .catch(function (err) {
//       console.error(err);
//     });
// }

// const fetchCoordinates = (search) => {
//   var apiUrl = `${apiURL}/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`;

//   fetch(apiUrl)
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       if (!data[0]) {
//         alert('Location not found');
//       } else {
//         updateHistory(search);
//         fetchWeather(data[0]);
//       }
//     })
//     .catch(function (err) {
//       console.error(err);
//     });
// }






// retrieveHistory();
// searchForm.addEventListener('submit', handleSearchFormSubmit);
// searchHistoryContainer.addEventListener('click', handleSearchHistoryClick);
