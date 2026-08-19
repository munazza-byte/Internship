const api = {
    method : "GET",
    headers : {
        "x-rapidapi-host": "open-weather13.p.rapidapi.com",
        "x-rapidapi-key": "4af7527a80msh4e4857186cefec3p1cf78ajsn79badad1379c"
    }
};
async function getWeather(city) {
    try{
        const url = `https://open-weather13.p.rapidapi.com/city?city=${city}&lang=EN`;
        const response = await fetch(url, api);
        const data = await response.json();
        console.log("Weather data :", data);
        // Display result on page
        displayWeather(data);
    }
    catch(err){
        console.error("Error:",err);
    }
}
const button = document.querySelector("button");
button.addEventListener("click",()=>{
    getWeather(input.value);
});

const input = document.querySelector(".input");
input.addEventListener("keydown", (event =>{
    if(event.key === "Enter"){
        getWeather(input.value);
    }
}));

function displayWeather(data){
    let city = document.querySelector(".location .city");
    city.textContent = `${data.name}, ${data.sys.country}`;
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round((data.main.temp - 32) * 5/9)}<span>°C</span>`;
    
    let now = new Date();
    let date = document.querySelector(".location .date");
    date.textContent = dateBuilder(now);

  let weather = document.querySelector('.current .weather');
  weather.innerText = `${data.weather[0].description}`;
  
//   Acessing the weather icon
  const iconCode = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const iconElement = document.querySelector(".current .icon");
  iconElement.innerHTML = `<img src="${iconUrl}" alt="Weather icon">`;

  let humidity = document.querySelector(".humidity");
  humidity.textContent = `💧 ${data.main.humidity}%`;

  let wind = document.querySelector(".wind");
  wind.textContent = `🌬️ ${data.wind.speed} m/s`;

}

function dateBuilder(d){
    let months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date= d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`;
}