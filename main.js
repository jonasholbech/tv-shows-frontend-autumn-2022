import { rangeColorChanger, autoExpandTextarea } from "./utils.js";

rangeColorChanger();
autoExpandTextarea();

const form = document.querySelector("form");

form.elements.name.addEventListener("input", () => {
  form.elements.director.value = form.elements.name.value;
});
//.length

/*
if the input field has a certain length, then find the next input field and give it focus

DRY - Don't Repeat Yourself
WET - Write everything twice
AHA - Avoid Hasty Abstractions

First make it work, then make it right
*/
