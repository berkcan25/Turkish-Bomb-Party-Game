//html elements
const timer = document.getElementById("timer");
const feedbackNotifs = document.getElementsByClassName("feedback-notifications")[0];
const wordInput = document.getElementById("word-input");
const letters = document.getElementsByClassName("letter");

// Turn Timer and Game End
let timeLimit = 10; // seconds
let timerInterval;

// Lives
let maxNumberOfLives = 3;
let numberOfLives = 3;


// game state
let gameActive = false;


// global variables
let validSyllables;
let wordData;
let usedWords;

// On Startup
document.getElementById("word-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        submitWord();
    }
});

timer.innerHTML = timeLimit;


// Game Flow Control
//TODO: reset points 
async function startGame() {
    if (!gameActive) {
        gameActive = true;
        await gameInit();
        fetchSyllable();
        startTimer();
    }
}

async function gameInit() {
    resetLetters();
    numberOfLives = 3;
    document.getElementById("lives").innerHTML = `💖`.repeat(numberOfLives) + `🖤`.repeat(3 - numberOfLives);

    //change in options
    const minWordCount = 30;
    const freqResponse = await fetch("./freqs.json")
    const freqData = await freqResponse.json();
    const syllables = Object.keys(freqData);
    validSyllables = syllables.filter((syllable) => freqData[syllable] > minWordCount);

    const wordResponse = await fetch("./words.json")
    wordData = await wordResponse.json();

    wordInput.value = "";
    wordInput.focus();
    usedWords = [];
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
            let dead = decreaseLives();
            if (dead) {
                endGame();
            } else {
                wordInput.value = "";
                showPotentialWord(document.getElementById("current-syllable").textContent);
                fetchSyllable();
                startTimer();
                return;
            }
        }
        timer.innerHTML = timeRemaining;
    }, 1000);
}

function endGame() {
    // Display final scores and handle game end logic
    clearInterval(timerInterval);
    gameActive = false;
    const currentSyllable = document.getElementById("current-syllable").textContent;
    showPotentialWord(currentSyllable, true);

    document.getElementById("current-syllable").innerHTML = "???";
    wordInput.value = "";
    wordInput.blur();

    if (parseInt(document.getElementById("score").textContent) > 0) {
        addScoreToScoreboard();
        document.getElementById("score").textContent = 0;
    }
}


function restartGame() {
    endGame();
    startGame();
}

// Helper Functions

// Lives
function decreaseLives() {
    numberOfLives--;
    document.getElementById("lives").innerHTML = `💖`.repeat(numberOfLives) + `🖤`.repeat(3 - numberOfLives);
    let dead = numberOfLives <= 0;
    return dead;
}

function increaseLives() {
    if (numberOfLives >= maxNumberOfLives) {
        return;
    } else {
        numberOfLives++;
        document.getElementById("lives").innerHTML = `💖`.repeat(numberOfLives) + `🖤`.repeat(3 - numberOfLives);
    }
}

// Words/Syllables
const getValidWords = ((syllable) => wordData[syllable]);

function showPotentialWord(currentSyllable, isFinal = false) {
    const validWords = getValidWords(currentSyllable);
    const randomWord = validWords[Math.floor(Math.random() * validWords.length)];
    showFeedbackMessage(`${isFinal ? "Oyun Bitti!\n" : ""}Kullanabildiğin kelime: ${randomWord}`);
}


// Fetching and Displaying Syllables
function fetchSyllable() {
    let includesAll = true;
    let fetchedSyllable;
    do {
        const randomIndex = Math.floor(Math.random() * validSyllables.length - 1);
        fetchedSyllable = validSyllables[randomIndex];
        validWords = getValidWords(fetchedSyllable);
        if (usedWords.length < validWords.length) break;
        for (let i = 0; i < validWords.length; i++) {
            if (!usedWords.includes(validWords[i])) {
                includesAll = false;
                break;
            }
        }
    } while (includesAll);
    document.getElementById("current-syllable").innerHTML = fetchedSyllable;
}

function submitWord() {
    if (wordData === undefined || !gameActive) {
        showFeedbackMessage("Önce oyunu başlat.");
        return;
    }

    const enteredWord = turkishLowerCase(wordInput.value.trim());

    if (enteredWord === "") {
        // showFeedbackMessage("Please enter a word.");
        return;
    }

    const currentSyllable = document.getElementById("current-syllable").textContent;
    const validWords = getValidWords(currentSyllable);

    if ((!validWords.includes(enteredWord))) {
        showFeedbackMessage("Kelime bulunamadı. Başka bir kelime dene.");
        return;
    } else if (usedWords.includes(enteredWord)) {
        showFeedbackMessage("Kelime zaten kullanılmıştır. Başka bir kelime dene.");
        return;
    } else {
        wordInput.value = "";
        usedWords.push(enteredWord);
        awardPoint();
        updateLetters(enteredWord);
        if (allLettersUsed()) {
            increaseLives();
            resetLetters();
        }
        fetchSyllable();
        startTimer();
    }
}

// Letters
function allLettersUsed() {
    for (let i = 0; i < letters.length; i++) {
        if (!letters[i].classList.contains("used")) {
            return false;
        }
    }
    return true
}

function updateLetters(enteredWord) {
    for (let i = 0; i < letters.length; i++) {
        console.log(letters[i]);
        if (enteredWord.includes(letters[i].textContent)) {
            letters[i].classList.add("used");
        }
    }
}

function resetLetters() {
    for (let i = 0; i < letters.length; i++) {
        letters[i].classList.remove("used");
    }
}

//uppercase lowercase
function turkishUpperCase(text) {
    return text.replace(/i/g, "İ").replace(/ı/g, "I").toUpperCase();
}
function turkishLowerCase(text) {
    return text.replace(/I/g, "ı").replace(/İ/g, "i").toLowerCase();
}


// Feedback
let feedbackTimer = null;

function showFeedbackMessage(message) {
    clearTimeout(feedbackTimer);
    const feedbackElement = document.getElementById("feedback");
    feedbackNotifs.style.display = "block";
    feedbackElement.textContent = message;
    feedbackElement.style.display = "block";
    feedbackTimer = setTimeout(() => {
        feedbackElement.style.display = "none";
        feedbackNotifs.style.display = "none";
    }, 5000);
}

// Score
function awardPoint() {
    const scoreElement = document.getElementById("score");
    let currentScore = parseInt(scoreElement.textContent);
    scoreElement.textContent = currentScore + 1;
}

// TODO: add score to local storage when you finish the game
function addScoreToScoreboard() {
    const scoreboardTitle = document.getElementById("scoreboard-title");
    scoreboardTitle.style.display = "block";
    const scoreboardElement = document.getElementById("score-list");
    const score = parseInt(document.getElementById("score").textContent);
    const scoreEl = document.createElement("li");
    scoreEl.className = "score-item"
    scoreEl.textContent = `Puan: ${score}`;
    // formatted date in locale
    scoreEl.title = new Date().toLocaleString();
    scoreboardElement.appendChild(scoreEl);
}