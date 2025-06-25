const nameList = document.querySelector(".name-list");
const firstInput = document.querySelector(".first-input");
const secondInput = document.querySelector(".second-input");

let words = "";

document.addEventListener("DOMContentLoaded", async function () {
  await fetchWords();
  updateNameList();
});

async function fetchWords() {
  try {
    const response = await fetch("words.txt");
    words = await response.text();
  } catch (error) {
    console.error("Error loading file:", error);
  }
}

function getRandomWord() {
  const randomWord = words.match(/\b\w+\b/g)?.sort(() => 0.5 - Math.random())[0];

  return randomWord;
}

function getWords(term, max = 10) {
  term = term.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = term ? new RegExp(`\\b${term}[a-zA-Z]*`, "gi") : /\b[a-zA-Z]+\b/g;
  let matches = words.match(regex) || []
  matches = shuffle(matches);
  return matches.slice(0, max);
}

function updateNameList() {
  const firstWords = getWords(firstInput.value);
  const secondWords = getWords(secondInput.value);
  const isUsernamesFound = firstWords.length > 0 && secondWords.length > 0

  nameList.innerHTML = isUsernamesFound ? firstWords.map((word, i) => (secondWords[i] ? `<div class="item">${word+secondWords[i]}</div>` : "")).join("") : "No usernames found"
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
