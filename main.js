import { rangeColorChanger, autoExpandTextarea } from "./utils.js";

rangeColorChanger();
autoExpandTextarea();

const form = document.querySelector("form");

form.elements.name.addEventListener("input", () => {
  form.elements.director.value = form.elements.name.value;
});
//.length
