
async function getUserName() {
  // API call 
  async function getUserName() {

    const token = sessionStorage.getItem( 'token' );

    const response = await fetch( '/api/user', {
      headers: {
        'Authorization': `Bearer ${ token }`
      }
    } );

    const data = await response.json();

    return data.name;

  }

  const userName = await getUserName();
}

    

//adjust the greeting
  
// Update DOM
const userName = await getUserName();

const greeting = document.getElementById('greeting');
greeting.innerHTML = `Hello ${ userName }`;


    //specify the last updated time for the weather
   
let times = new Date();
    let myHour = times.getHours();
    let dateNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
     let dateNow = dateNames[times.getDay()];
     let myMinute = times.getMinutes();
     let newMinute = null;
     let newHour = null;
      if ( myMinute < 10 ) {
        newMinute = `0${ myMinute }`;
    } else {
      newMinute = myMinute;
    }
      if ( myHour < 10 ) {
      newHour = `0${ myHour }`;
    } else {
      newHour = myHour;
    }
     let newStatement = `${dateNow} ${newHour}:${newMinute}`;
     let Statement = document.querySelector("#date");
    Statement.innerHTML = newStatement;
    

function currentClicked(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
  function retrievePosition(position) {
    //replace by your generated API key here
      let apiKey = `<replace the API key>`;
     let lat = position.coords.latitude;
     let lon = position.coords.longitude;
     let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
     let url2 = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`;
    axios.get(url).then(showWeather);
    axios.get(url2).then(showForecast);
  }
}
   
function searchClicked(event)
{
 event.preventDefault();
     let newCity = document.querySelector("#city-input");
 showCity(newCity.value);
}

function showCity(city)
{
     //replace the API key by generating your own API key
    let apiKey1 = `<put your API key here>`
     let url1 = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey1}`;
     let url2 = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey1}`;
axios.get(url1).then(showWeather);
axios(url2).then(showForecast);
}

//function to show the current weather status
function showWeather(response) {
     let temperatureValue = document.querySelector("#temperature");
     let temperature = Math.round(response.data.temperature.current);
     temperatureValue.innerHTML = `${temperature}°`;
     let newDescription = document.querySelector("#description");
     newDescription.innerHTML = response.data.condition.description;
     let humidityValue = document.querySelector("#humidity");
     humidityValue.innerHTML = response.data.temperature.humidity;
     let windValue = document.querySelector("#wind");
     windValue.innerHTML = response.data.wind.speed;
     celsiusTemperature = response.data.temperature.current;
     let iconProperty = response.data.condition.icon;
     let icon = document.querySelector("#weather-icon")
     icon.setAttribute( "src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconProperty}.png`); 
     let cities = document.querySelector("#city");
     cities.innerHTML = `${response.data.city}, ${response.data.country}`;
    }

    //function to show the forecast for the coming days

function formatDate(timestamp)
{
   let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
     
function showForecast( response ) {
   let forecast = response.data.daily;
  let forecastElement = document.querySelector( "#forecast" );
  let forecastHTML = `<div class="row">`;
  forecast.forEach( function ( forecastDay, index ) {
    if ( index > 0 )
  forecastHTML = forecastHTML +
      `<div class="col-2">
              <div class="card">
                <div class="card-body">
                  <p>
                    <span id="weather-forecast-date">${formatDate(forecastDay.time)} </span> <br />
                    <img
                      src= "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
                      alt=""
                      width="42"
                    />
                    <br />
                  </p>
                  <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperature-max"> ${forecastDay.temperature.maximum}°C </span>
                    ||
                    <span class="weather-forecast-temperature-min"> ${forecastDay.temperature.minimum}°C</span>
                  </div>
                </div>
              </div>
            </div>` ;
  } );
    forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", currentClicked);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchClicked);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#farenhite-id");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celcious-id");
celsiusLink.addEventListener( "click", displayCelsiusTemperature );

showCity( "Addis Ababa" );
showForecast();
