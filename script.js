// game.js

// 1. Turn Timer and Game End
let timeLimit = 10; // seconds
let timerInterval;

//game state
let gameActive = false;

//html elements
const timer = document.getElementById("timer");
const feedbackNotifs = document.getElementsByClassName("feedback-notifications")[0];
let wordInput;

//global variables
let validSyllables;
let wordData;

//uppercase lowercase
function turkishUpperCase(text) {
    return text.replace(/i/g, "İ").replace(/ı/g, "I").toUpperCase();
}
function turkishLowerCase(text) {
    return text.replace(/I/g, "ı").replace(/İ/g, "i").toLowerCase();
}

function startTimer() {
    clearInterval(timerInterval)
    timer.innerHTML = timeLimit;
    let timeRemaining = timeLimit;
    const start = Date.now()
    timerInterval = setInterval(() => {
        let delta = Date.now() - start;
        timeRemaining = timeLimit - Math.floor(delta / 1000);
        if (timeRemaining < 0) {
            clearInterval(timerInterval);
            timeRemaining = 0;
            endGame();
        }
        timer.innerHTML = timeRemaining;
    }, 1000);
}

function restartGame() {
     
}

function endGame() {
    // Display final scores and handle game end logic
    clearInterval(timerInterval);
    gameActive = false;
    const currentSyllable = document.getElementById("current-syllable").textContent;
    const validWords = getValidWords(currentSyllable);
    const randomWord = validWords[Math.floor(Math.random() * validWords.length)];
    document.getElementById("current-syllable").innerHTML = "";
    wordInput.value = "";
    wordInput.blur();
    showFeedbackMessage(`Game Over!\nYou could have used: ${randomWord}`);
    if (parseInt(document.getElementById("score").textContent) > 0) {
        addScoreToScoreboard();
        document.getElementById("score").textContent = 0;
    }
    // Additional game end logic
}

// 2. Fetching and Displaying Syllables
function fetchSyllable() {
    const randomIndex = Math.floor(Math.random() * validSyllables.length - 1);
    const fetchedSyllable = validSyllables[randomIndex];
    document.getElementById("current-syllable").innerHTML = fetchedSyllable;
}

// 3. Word Validation and Scoring
function submitWord() {
    if (wordData === undefined || !gameActive) {
        showFeedbackMessage("Please press start first.");
        return;
    }

    wordInput = document.getElementById("word-input");
    const enteredWord = turkishLowerCase(wordInput.value.trim());

    if (enteredWord === "") {
        // showFeedbackMessage("Please enter a word.");
        return;
    }

    const currentSyllable = document.getElementById("current-syllable").textContent;
    const validWords = getValidWords(currentSyllable);

    if (!validWords.includes(enteredWord)) {
        // showFeedbackMessage("Word is not valid. Please try again.");
        return;
    } else {
        awardPoint();
        fetchSyllable();
        startTimer();
        wordInput.value = "";
    }
}

function showFeedbackMessage(message) {
    const feedbackElement = document.getElementById("feedback");
    feedbackNotifs.style.display = "block";
    feedbackElement.textContent = message;
    feedbackElement.style.display = "block";
    setTimeout(() => {
        feedbackElement.style.display = "none";
        feedbackNotifs.style.display = "none";
    }, 5000);
}

function awardPoint() {
    const scoreElement = document.getElementById("score");
    let currentScore = parseInt(scoreElement.textContent);
    scoreElement.textContent = currentScore + 1;
}

// TODO: add score to local storage when you finish the game
function addScoreToScoreboard() {
    const scoreboardElement = document.getElementById("score-list");
    const score = parseInt(document.getElementById("score").textContent);
    const scoreEl = document.createElement("li");
    scoreEl.textContent = `Score: ${score}`;
    // formatted date in locale
    scoreEl.title = new Date().toLocaleString();
    scoreboardElement.appendChild(scoreEl);
}

const getValidWords = ((syllable) => wordData[syllable]);

function isCorrectWord(word, syllable) {
    // Check if the given word is correct for the given syllable
    // Example implementation: return true;
}

// 4. Error Handling
// Implement error handling as needed for unexpected input or errors during gameplay

// 5. Game Flow Control
//TODO: reset points 
async function startGame() {
    if (!gameActive) {
        gameActive = true;
        startTimer();
        await gameInit();
        fetchSyllable();
    }
}


async function gameInit() {
    //change in options
    const minWordCount = 30;
    //makes js wait for the promise object before continuing
    //add post json to server later
    const freqResponse = await fetch("./freqs.json")
    const freqData = await freqResponse.json();
    const syllables = Object.keys(freqData);
    validSyllables = syllables.filter((syllable) => freqData[syllable] > minWordCount);

    const wordResponse = await fetch("./words.json")
    wordData = await wordResponse.json();
    const words = Object.keys(wordData);
    validWords = words.filter((word) => wordData[word] > minWordCount);

}
// 6. Interactivity and User Experience
document.getElementById("word-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        submitWord();
    }
});


// 7. Integration with HTML and CSS
// Ensure the JavaScript functions and game logic are integrated correctly with the HTML and CSS elements of the game interface

// have feedback