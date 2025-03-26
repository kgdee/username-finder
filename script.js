let words = [];
let usernames = [];

// Fetch words from file
fetch("words.txt")
  .then((response) => response.text())
  .then((data) => {
    words = data.split(/\r?\n/).filter((s) => s.trim() !== "");
    usernames = [];
    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < words.length; j++) {
        if (i !== j) {
          usernames.push(words[i] + words[j]); // Concatenated without spaces
        }
      }
    }
    findRandom();
  })
  .catch((error) => console.error("Error loading file:", error));

// Function to display up to 10 random usernames
function findRandom() {
  let randomUsernames = [];
  let maxCount = Math.min(10, usernames.length); // Ensure we don't exceed available usernames

  while (randomUsernames.length < maxCount) {
    let randomIndex = Math.floor(Math.random() * usernames.length);
    let randomUsername = usernames[randomIndex];

    if (!randomUsernames.includes(randomUsername)) {
      // Avoid duplicates
      randomUsernames.push(randomUsername);
    }
  }

  displayUsernames(randomUsernames);
}

// Display usernames
function displayUsernames(list) {
  const ul = document.getElementById("usernamesList");
  ul.innerHTML = "";
  list.forEach((username) => {
    const li = document.createElement("li");
    li.textContent = username;
    ul.appendChild(li);
  });
}

function searchUsernames() {
  let f1 = document.getElementById("filter1").value.toLowerCase();
  let f2 = document.getElementById("filter2").value.toLowerCase();
  let maxResults = 10; // Set the desired limit

  if (!f1 && !f2) findRandom()

  // Shuffle usernames to get random order
  let shuffled = usernames.sort(() => Math.random() - 0.5);

  let filtered = [];
  for (let username of shuffled) {
    for (let word1 of words) {
      if (username.startsWith(word1)) {
        let word2 = username.slice(word1.length); // Extract second word

        if (words.includes(word2)) {
          // Ensure word2 is valid and matches filters
          if ((f1 === "" || word1.toLowerCase().startsWith(f1)) && (f2 === "" || word2.toLowerCase().startsWith(f2))) {
            filtered.push(username);
            if (filtered.length >= maxResults) {
              displayUsernames(filtered); // Stop early
              return;
            }
          }
        }
      }
    }
  }

  displayUsernames(filtered); // Display whatever was found
}
