const search = document.querySelector(".search");
const searchOpen = document.querySelector(".searchBar");
const cross = document.querySelector(".cross");

search.addEventListener("click", function () {
  searchOpen.style.left = "0vw";
});
cross.addEventListener("click", function () {
  searchOpen.style.left = "-100vw";
});
