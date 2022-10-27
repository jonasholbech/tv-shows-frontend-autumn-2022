import { rangeColorChanger, autoExpandTextarea } from "./utils.js";

rangeColorChanger();
autoExpandTextarea();

const url = "https://uwrwptibotlxlvcdeicv.supabase.co/rest/v1/tvshows";
const headers = {
  apikey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3cndwdGlib3RseGx2Y2RlaWN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ3OTI4MDYsImV4cCI6MTk4MDM2ODgwNn0.FuHj1T6qJO-wQ_aWaaXNFVfZPG45FsnE3RvHd3PGQmA",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3cndwdGlib3RseGx2Y2RlaWN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ3OTI4MDYsImV4cCI6MTk4MDM2ODgwNn0.FuHj1T6qJO-wQ_aWaaXNFVfZPG45FsnE3RvHd3PGQmA",
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

function addShow(newShow) {
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(newShow),
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let ongoing = false;
  if (form.elements.ongoing.value === "yes") {
    ongoing = true;
  }
  const obj = {
    genres: form.elements.genres.value.split("\n"),
    seasons: form.elements.seasons.value,
    director: form.elements.director.value,
    rating: form.elements.rating.value,
    ongoing: ongoing,
    name: form.elements.name.value,
  };
  addShow(obj);
});
