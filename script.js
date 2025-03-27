const usernameList = document.querySelector(".username-list");
const firstInput = document.querySelector(".first-input");
const secondInput = document.querySelector(".second-input");

let words = "";

async function getWords() {
  try {
    const response = await fetch("words.txt");
    words = await response.text();
  } catch (error) {
    console.error("Error loading file:", error);
  }
}

getWords();

function getRandom() {
  const randomWord = words.match(/\b\w+\b/g)?.sort(() => 0.5 - Math.random())[0];

  return randomWord;
}

function getUsername(term) {
  let regex = term ? new RegExp(`\\b${term}[a-zA-Z]*`, "gi") : /\b[a-zA-Z]+\b/g;
  let matches = words.match(regex);

  return matches[Math.floor(Math.random() * matches.length)];
}

function getList() {
  usernameList.innerHTML = "";
  for (i = 0; i < 10; i++) {
    usernameList.innerHTML += `<div>${getUsername(firstInput.value) + getUsername(secondInput.value)}</div>`;
  }
}