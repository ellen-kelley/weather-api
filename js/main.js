const instance = axios.create({
  baseURL: "https://goweather.herokuapp.com/weather",
});

window.addEventListener("load", (e) => {
  if (localStorage.getItem("data")) {
    const data = JSON.parse(localStorage.getItem("data"));
    const location = localStorage.getItem("location");
    processData(data, location);
  } else {
    getData("new york");
  }
});

document.querySelector('input[type = "submit"]').addEventListener("click", (e) => {
  e.preventDefault();
  const inputValue = document.querySelector('.find-location input[type="text"]').value;
  getData(inputValue);
});

const getData = (location) => {
  return instance
    .get(location)
    .then((res) => res)
    .then((data) => {
      processData(data.data, location);
    });
};

const processData = (data, location) => {
  console.log(data);
  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("location", location);

  const { description, temperature, wind, forecast } = data;
  printTodayForecast(location, description, temperature, wind);
  changeIcons(description);
  printUpcomingForecast(forecast);
  dayOfTheWeek();
};

const dayOfTheWeek = () => {
  const date = new Date();
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = document.querySelectorAll(".day");
  days.forEach((item, index) => {
    item.innerHTML = weekdays[date.getDay() + index];
  });
  document.querySelector(".date").innerHTML = `${months[date.getMonth()]} ${date.getDate()}`;
};

const changeIcons = (weather) => {
  let iconSrc = "";
  switch (weather) {
    case "Partly cloudy":
      iconSrc = "images/icons/icon-3.svg";
      break;
    case "Sunny":
      iconSrc = "images/icons/icon-2.svg";
      break;
    case "Heavy rain":
      iconSrc = "images/icons/icon-10.svg";
      break;
    case "Light rain":
      iconSrc = "images/icons/icon-9.svg";
      break;
    case "Moderate rain":
      iconSrc = "images/icons/icon-9.svg";
      break;
    case "Clear":
      iconSrc = "images/icons/icon-1.svg";
      break;
    case "Patchy rain possible":
      iconSrc = "images/icons/icon-4.svg";
      break;
    default:
      iconSrc = "images/icons/icon-7.svg";
      break;
  }
  const icon = document.querySelector(".today .forecast-icon img");
  icon.src = iconSrc;
};

const printTodayForecast = (location, description, temperature, wind) => {
  document.querySelector(".forecast-container").innerHTML = `<div class="today forecast">
    <div class="forecast-header">
      <div class="day"></div>
      <div class="date"></div>
    </div> <!-- .forecast-header -->
    <div class="forecast-content">
      <div class="description-container">
        <div class="location">${location.toUpperCase()}</div>
        <p class="description">${description}</p>
      </div>
      <div class="degree">
        <div class="num">${temperature}</div>
        <div class="forecast-icon">
          <img src="images/icons/icon-1.svg" alt="" width=90>
        </div>
      </div>
      <span><img src="images/icon-umberella.png" alt="">20%</span>
      <span class="wind">
        <img src="images/icon-wind.png" alt="">
        <span class="wind-speed">${wind}</span>
      </span>
      <span><img src="images/icon-compass.png" alt="">East</span>
    </div>
  </div>`;
};

const printUpcomingForecast = (forecast) => {
  forecast.forEach((i) => {
    document.querySelector(".forecast-container").innerHTML += `<div class="forecast">
    <div class="forecast-header">
      <div class="day"></div>
    </div>
    <div class="forecast-content">
      <div class="forecast-icon">
        <img src="images/icons/icon-3.svg" alt="" width=80>
      </div>
      <div class="degree">${i.temperature}</div>
      <div class="wind">
        <img src="images/icon-wind.png" alt="">
        <span class="wind-speed">${i.wind}</span>
      </div>
  
    </div>
  </div>`;
  });
};
