//Added API key as a var as it will be necessary to call the API 
var apiKey = "1ab858a5505d5908820588cc1ee2f9e5";

//current weather API = api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}
//api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}

//5 day weather API = api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
//api.openweathermap.org/data/2.5/forecast?q={city name},{state code}&appid={API key}
//api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid={API key}

//Add UV index API data 

/*
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city 
*/

// Set variable for API key
var weatherAPI = "1ab858a5505d5908820588cc1ee2f9e5";

