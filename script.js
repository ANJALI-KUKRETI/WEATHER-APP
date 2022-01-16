const search = document.querySelector(".search");
const searchOpen = document.querySelector(".searchBar");
const cross = document.querySelector(".cross");

let weather = {
  apikey: "2a31d0a9e41eaa12e109103cc87d65bc",
};

search.addEventListener("click", function () {
  searchOpen.style.left = "0vw";
});
cross.addEventListener("click", function () {
  searchOpen.style.left = "-100vw";
});

window.addEventListener("load", currentLoc());

function currentLoc() {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      long = pos.coords.longitude;
      lat = pos.coords.latitude;
      console.log(lat, long);
      fetchApiLocal(lat, long);
    });
  }
}

async function fetchApiLocal(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather.apikey}`
  );
  const data = await response.json();
  console.log(data);
}
