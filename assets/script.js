//Added API key as a var as it will be necessary to call the API 
var apiKey = "1ab858a5505d5908820588cc1ee2f9e5";

//current weather API = api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}
//api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}

//5 day weather API = api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
//api.openweathermap.org/data/2.5/forecast?q={city name},{state code}&appid={API key}
//api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid={API key}

//Code below is from exercise 28 - double check everything makes sense and works 
var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  var formatInputVal = document.querySelector('#format-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);