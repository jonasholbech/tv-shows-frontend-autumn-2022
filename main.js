import { rangeColorChanger, autoExpandTextarea } from "./utils.js";

rangeColorChanger();
autoExpandTextarea();

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let happy = false;
  if (form.elements.happy_hour.value === "yes") {
    happy = true;
  }
  const obj = {
    name: form.elements.name.value,
    price: Number(form.elements.price.value),
    happy_hour: happy,
    ingredients: form.elements.ingredients.value.split("\n"),
    color: form.elements.color.value,
    glass_types: form.elements.glass_types.value,
    category: form.elements.category.value,
    percentage: Number(form.elements.percentage.value),
    garnish: form.elements.garnish.value.split("\n"),
  };
  console.log(obj);
  post(obj);

  //1. post to db
  //2. update UI
  //3. clear the form
});

const APIKEY = "606d5d99f5535004310074ed";
const endpoint = "https://frontendspring20-9cc3.restdb.io/rest/something-wa";

function post(payload) {
  fetch(endpoint, {
    method: "POST",
    headers: {
      "x-apikey": APIKEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => init());
}

async function get() {
  const res = await fetch(endpoint, {
    mathod: "GET",
    headers: {
      "x-apikey": APIKEY,
    },
  });
  const data = await res.json();
  return data;
}

async function deleteDrink(id) {
  const res = await fetch(`${endpoint}/${id}`, {
    method: "DELETE",
    headers: {
      "x-apikey": APIKEY,
    },
  });
  const data = await res.json();
  init();
}
async function toggleHappyHour(id, isHappy) {
  const nextState = {
    happy_hour: !isHappy,
  };
  const res = await fetch(`${endpoint}/${id}`, {
    method: "PUT",
    headers: {
      "x-apikey": APIKEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nextState),
  });
  const data = await res.json();
  init();
}
document.addEventListener("DOMContentLoaded", init);
async function init() {
  console.log("init");
  //get the data
  //loop thorugh it
  const data = await get();
  document.querySelector("#cards").innerHTML = "";
  data.forEach(showDrink);
}

function showDrink(drink) {
  //grab the template
  const template = document.querySelector("template").content;
  //clone it
  const copy = template.cloneNode(true);
  //change content
  copy.querySelector("header h2").textContent = drink.name;
  copy.querySelector("header p").textContent = drink.category;
  copy.querySelector(".price span").textContent = drink.price;
  copy.querySelector("span[data-glass]").textContent = drink.glass_types;
  copy.querySelector("article").dataset.happyHour = drink.happy_hour;
  copy.querySelector("progress").value = drink.percentage * 100;
  copy.querySelector("span[data-percentage]").textContent =
    drink.percentage * 100 + "%";
  copy.querySelector(".ingredients ul").innerHTML = getListFromArray(
    drink.ingredients
  );
  copy.querySelector(".garnish ul").innerHTML = getListFromArray(drink.garnish);
  copy.querySelector(".delete-btn").addEventListener("click", () => {
    deleteDrink(drink._id);
  });
  copy.querySelector(".update-btn").addEventListener("click", () => {
    toggleHappyHour(drink._id, drink.happy_hour);
  });
  //append to the  DOM
  document.querySelector("#cards").appendChild(copy);
}

function getListFromArray(array) {
  return array.map((item) => `<li>${item}</li>`).join("");
}
