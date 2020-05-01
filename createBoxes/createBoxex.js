"use strict";

const getRandColor = () => {
  let color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
  while (color.length < 6) {
    color = "0" + color;
  }
  return "#" + color;
};
const conteiner = document.querySelector(".conteiner");
const buttonCreate = document.querySelector('[action="create"]');
const buttonDestroy = document.querySelector('[action="destroy"]');
const input = document.querySelector(".input");
let inputValue = 0;

const createBoxes = (num, width = 30, heigth = 30, edit = 10) => {
  const boxes = [];

  for (let i = 0; i < num; i += 1) {
    boxes[i] = document.createElement("div");
    boxes[i].style.width = width + edit * i + "px";
    boxes[i].style.height = heigth + edit * i + "px";
    boxes[i].style.backgroundColor = getRandColor();
    boxes.push(boxes[i]);
  }
  return boxes;
};
const handleInput = e => (inputValue = e.target.value);

const handleClickCreate = () => {
  const boxes = createBoxes(inputValue);
  conteiner.append(...boxes);
  input.value = null;
};
const handleClickDestroy = () => {
  const boxes = Array.from(conteiner.children);
  boxes.forEach(b => b.remove());
};

input.addEventListener("input", handleInput);
buttonCreate.addEventListener("click", handleClickCreate);
buttonDestroy.addEventListener("click", handleClickDestroy);
