const search = document.querySelector(".search");
const searchOpen = document.querySelector(".searchBar");
const cross = document.querySelector(".cross");
const searchPlace = document.getElementById("searchPlace");
const searchBtn = document.querySelector(".searchButton");
const tempToday = document.querySelector(".tempToday");
const unitToday = document.querySelector(".unitToday");
const todayImage = document.querySelector(".todayImage");
const loc = document.querySelector(".loc");
const date = document.querySelector(".date");
const wValue = document.querySelector(".wValue");
const hValue = document.querySelector(".hValue");
const vValue = document.querySelector(".vValue");
const aValue = document.querySelector(".aValue");
const bar = document.querySelector("#bar");
const catToday = document.querySelector(".catToday");
const next = document.querySelectorAll(".d");

const monthArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const daysArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let weather = {
  apikey: "c80431e7f167a32dc305872403d7a779",
};

async function getApiLocation(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weather.apikey}`
  );
  const data = await response.json();
  // console.log(data);
  return data;
}

function addSearchedCity(city) {
  const html = ` <div class="two">
  <div class="sticker">${city}</div>
  <div><i class="fas fa-greater-than"></i></div>
</div>`;
  searchOpen.insertAdjacentHTML("beforeend", html);
  const cityDynamic = document.querySelector(".sticker").innerText;
  // console.log(cityDynamic);
  document.querySelector(".two").addEventListener("click", function () {
    displayData(cityDynamic);
  });
}

async function displayData(city) {
  const Citydata = await getApiLocation(city);

  searchPlace.value = "";
  searchOpen.style.left = "-100vw";

  const dateToday = new Date();
  const dateT = dateToday.getDate();
  const day = dateToday.getDay();
  const month = dateToday.getMonth();

  const kelvinTemp = Citydata.list[0].main.temp;
  const temp = (kelvinTemp - 273.15).toPrecision(2);

  //============Assigning Values==============
  tempToday.textContent = temp;
  todayImage.src = `${whichImage(Citydata.list[0].weather[0].main)}`;
  loc.textContent = Citydata.city.name;
  date.textContent = `${daysArray[day]}, ${dateT} ${monthArray[month]}`;
  wValue.textContent = Citydata.list[0].wind.speed;
  hValue.textContent = Citydata.list[0].main.humidity;
  aValue.textContent = Citydata.list[0].main.pressure;
  vValue.textContent = Citydata.list[0].visibility;
  bar.value = Citydata.list[0].main.humidity;
  catToday.textContent = Citydata.list[0].weather[0].main;

  for (let i = 7, j = 0; i <= 40, j < 5; i += 8, j++) {
    const currentDate = new Date(
      new Date().getTime() + 24 * 60 * 60 * 1000 * (j + 1)
    );

    const weaImg = Citydata.list[i].weather[0].main;
    const image = whichImage(weaImg);
    const date = currentDate.getDate();
    const day = currentDate.getDay();
    const month = currentDate.getMonth();
    const toDisplay = `
    <div class="dateDay ds">${daysArray[day]}, ${date} ${
      monthArray[month]
    }</div>
    <img src="${image}" class="icon" alt="" />
    <div class="temp">
      <div class="min"><span class="tem">${(
        Citydata.list[i].main.temp_min - 273.15
      ).toPrecision(2)}</span><span class="uni">৹C</span></div>
      <div class="max">${(Citydata.list[i].main.temp_max - 273.15).toPrecision(
        2
      )}৹C</div>
    </div>
  `;
    next[j].innerHTML = toDisplay;
  }
}

function renderCurrent() {
  const city = "pantnagar";
  displayData(city);
}
function renderData() {
  const city = searchPlace.value;
  displayData(city);
  addSearchedCity(city);
}

function whichImage(weaImg) {
  let image;
  if (weaImg == "Clouds") image = "img/HeavyCloud.png";
  else if (weaImg == "Mist") image = "HeavyCloud.png";
  else if (weaImg == "Rain") image = "img/LightRain.png";
  else if (weaImg == "Clear") image = "img/Clear.png";
  else if (weaImg == "Snow") image = "img/Snow.png";
  else if (weaImg == "Thunderstorm") image = "img/Thunderstorm.png";
  else if (weaImg == "Drizzle") image = "img/Shower.png";

  return image;
}
const temperature = document.querySelectorAll(".tem");
const unit = document.querySelectorAll(".uni");

function convertToF() {
  unit.forEach((uni) => {
    uni.innerText = "৹F";
  });
}
convertToF();
// ==================Event Listeners==================
window.addEventListener("load", renderCurrent);
search.addEventListener("click", function () {
  searchOpen.style.left = "0vw";
});
cross.addEventListener("click", function () {
  searchOpen.style.left = "-100vw";
});
searchBtn.addEventListener("click", renderData);
