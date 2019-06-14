let appId=''; // Add your openweathermap APPID
let units='metric';
let searchMethod='';

function getSearchMethod(searchTerm)
{
    if(searchTerm.lenght === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
    searchMethod = 'zip';
    else
    searchMethod='q';
}

function searchWeather(searchTerm){
    getSearchMethod(searchTerm); 
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result=>{
        init(result);
    })
}
function init(resultFromServer){
    switch(resultFromServer.weather[0].main){
        case 'Clear':
        document.body.style.backgroundImage ='url("../images/clear.jpg")';
        break;
        case 'Clouds':
        document.body.style.backgroundImage ='url("../images/cloudy.jpg")'
        break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
        document.body.style.backgroundImage ='url("../images/rain.jpg")'
                break;
        case 'Thunderstorm':
        document.body.style.backgroundImage ='url("../images/storm.jpg")'
        break;
        case 'Snow':
        document.body.style.backgroundImage ='url("../images/snow.jpg")'
        break;
        default:
        break;
    }
    let weatherDescHeader = document.getElementById('weatherDescHeader');
    let tempElement = document.getElementById('temp');
    let humidity = document.getElementById('humidity');
    let windSpeed = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('docImg');

    weatherIcon.src ='http://openweathermap.org/img/w/'+ resultFromServer.weather[0].icon + '.png';
    
    let resultDesc = resultFromServer.weather[0].description;
    weatherDescHeader.innerText = resultDesc.charAt(0).toUpperCase() + resultDesc.slice(1);

    tempElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windSpeed.innerHTML = Math.floor(resultFromServer.wind.speed) + 'm/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidity.innerHTML = "Humidity Levels at " + resultFromServer.main.humidity + "%";
    setPositionForWeather();
}

function setPositionForWeather(){
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(75% - ${weatherContainerHeight}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchButton').addEventListener('click', ()=>{
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
    searchWeather(searchTerm);
})
