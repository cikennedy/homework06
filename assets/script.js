// Set variables for API key, url, and array of search history
var apiKey = "1ab858a5505d5908820588cc1ee2f9e5";
var apiURL = "https://api.openweathermap.org";
var searchHistory = [];

// create query selector references here 

// Current weather function
const displayCurrentWeather = (city, weather) => {
    var date = dayjs().format('MM/DD/YYYY');
    var temp = weather.temp;
    var wind_speed = weather.wind_speed;
    var uvi = weather.uvi;
    var icon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

    // Create elements 
    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var heading = document.createElement('h3');
    var weatherIcon = document.createElement('img');
    var tempElement = document.createElement('p');
    var windElement = document.createElement('p');
    var humidityElement = document.createElement('p');
    var uvElement = document.createElement('p');
    var uviBadge = document.createElement('button');

    card.setAttribute('class', 'card');
    cardBody.setAttribute('class', 'card-body');
    card.append(cardBody);
  
    heading.setAttribute('class', 'h3 card-title');
    tempElement.setAttribute('class', 'card-text');
    windElement.setAttribute('class', 'card-text');
    humidityElement.setAttribute('class', 'card-text');
  
    heading.textContent = `${city} (${date})`;
    weatherIcon.setAttribute('src', iconUrl);
    weatherIcon.setAttribute('alt', iconDescription);
    weatherIcon.setAttribute('class', 'weather-img');
    heading.append(weatherIcon);
    tempElement.textContent = `Temp: ${temp}°F`;
    windElement.textContent = `Wind: ${wind_speed} MPH`;
    humidityElement.textContent = `Humidity: ${humidity} %`;
    cardBody.append(heading, tempElement, windElement, humidityElement);
  
    uvElement.textContent = 'UV Index: ';
    uviBadge.classList.add('btn', 'btn-sm');
  
    if (uvi < 3) {
      uviBadge.classList.add('btn-success');
    } else if (uvi < 7) {
      uviBadge.classList.add('btn-warning');
    } else {
      uviBadge.classList.add('btn-danger');
    }
  
    uviBadge.textContent = uvi;
    uvEl.append(uviBadge);
    cardBody.append(uvEl);
  
    todayContainer.innerHTML = '';
    todayContainer.append(card);

}

// Function for a forecast card 
const showForecastCard = (forecast) => {

    var icon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    var unixTs = forecast.dt;
    var temp = forecast.temp.day;
    var { humidity } = forecast;
    var wind_speed = forecast.wind_speed;

    var col = document.createElement('div');
    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var cardTitle = document.createElement('h5');
    var weatherIcon = document.createElement('img');
    var tempElement = document.createElement('p');
    var windElement = document.createElement('p');
    var humidityElement = document.createElement('p');

    col.append(card);
    card.append(cardBody);
    cardBody.append(cardTitle, weatherIcon, tempElement, windElement, humidityElement);

    col.setAttribute('class', 'col-md');
    col.classList.add('five-day-card');
    card.setAttribute('class', 'card bg-primary h-100 text-white');
    cardBody.setAttribute('class', 'card-body p-2');
    cardTitle.setAttribute('class', 'card-title');
    tempElement.setAttribute('class', 'card-text');
    windElement.setAttribute('class', 'card-text');
    humidityElement.setAttribute('class', 'card-text');

    // Add content to elements
    cardTitle.textContent = dayjs.unix(unixTs).format('M/D/YYYY');
    weatherIcon.setAttribute('src', iconUrl);
    weatherIcon.setAttribute('alt', iconDescription);
    tempElement.textContent = `Temp: ${temp} °F`;
    windElement.textContent = `Wind: ${wind_speed} MPH`;
    humidityElement.textContent = `Humidity: ${humidity} %`;

    forecastContainer.append(col);

}

// Create function that will show the search history 
const displaySearchHistory = () => {
    searchHistoryContainer.innerHTML = '';
    for (var i = searchHistory.length - 1; i >= 0; i--) {
        var btn = document.createElement('btn');
        btn.setAttribute('type', 'btn');
        btn.setAttribute('aria-controls', 'today forecast');
        btn.classList.add('history-btn', 'btn-history');
    
        // `data-search` allows access to city name when click handler is invoked
        btn.setAttribute('data-search', searchHistory[i]);
        btn.textContent = searchHistory[i];
        searchHistoryContainer.append(btn);
    }
}

// Create function that updates history 
const updateHistory = (search) => {
    if (searchHistory.indexOf(search) !== -1) {
      return;
    }
    searchHistory.push(search);
    // Updates search history 
    localStorage.setItem('search-history', JSON.stringify(searchHistory));
    displaySearchHistory();
}

// Function to get search history from local storage
const retrieveHistory = () => {
    var historyStorage = localStorage.getItem('search-history');
    if (historyStorage) {
      searchHistory = JSON.parse(historyStorage);
    }
    displaySearchHistory();
}