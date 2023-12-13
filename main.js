
import Details from "./Details.js";

const form = document.querySelector("form");
const input = document.querySelector("input");
const msg = document.querySelector(".msg");
const weatherBorder = document.querySelector(".weather-image-border");
const details = document.querySelector(".details");

const imageWeather = [
  {
    name: "Snow",
    image: "./asset/snow.jpg",
  },
  {
    name: "Rain",
    image: "./asset/rain.jpg",
  },
  {
    name: "Sunny",
    image: "./asset/sunny.jpg",
  },
  {
    name: "Thunder",
    image: "./asset/thunder.jpg",
  },
  {
    name: "Clouds",
    image: "./asset/cloudy.jpg",
  },
];

let tempData = [];

const apiKey = "179ae0cd28ee30347d533570af4079a8";

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let inputVal = input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      const { main, name, sys, weather, coord } = data;
      const matchingImage = imageWeather.find(
        (item) => item.name === weather[0].main
      );
      const imageUrl = matchingImage ? matchingImage.image : "./asset/sunny.jpg";
      //icon api
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

      const markup = `
            <div class="weather-image">
<img class="slide-top" src="${imageUrl}" alt="imgweather" >

<div class="weather-content">
<h2 class='city-name' data-name=${name},${sys.country}>
                <span>${name}</span>
                <span>${sys.country}</span>
            </h2>
            <div class='city-temp'>${Math.round(main.temp)}°C</div>
            <div class="icon-content">
            <img class='city-icon' src='${icon}' alt ='city' >
              <h4>${weather[0]["description"]}</h4>
            </div> 
</div>
          </div> `;
      weatherBorder.innerHTML = markup;

      msg.innerText = "";
      const callFiveDaysUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;

      // Make the second API call for the five-day forecast
      fetch(callFiveDaysUrl)
        .then((res) => res.json())
        .then((fiveDayData) => {
          const { list } = fiveDayData;
          list.forEach((item) => {
            const timeTxt = item.dt_txt.split(" ");
            const day = timeTxt[0];
            if (timeTxt[1] == "00:00:00") {
              const dateString = new Date(day);
              const formattedDate = dateString.toDateString();
              const { main: { temp, temp_max, temp_min }, weather: [{ main, icon }] } = item;
              tempData = [...tempData, Math.round(temp)];
              details.innerHTML += Details(formattedDate, temp, temp_max, temp_min, main, icon);
            
            }
          });
        })
        .catch((error) => {
          console.log(error)
        });
    })
    .catch(() => {
      msg.innerText = "Search for a valid city";
    });

  input.value = "";
  details.innerHTML = "";
});


  