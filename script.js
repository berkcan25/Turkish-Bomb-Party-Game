const settingsBox = document.getElementById('settings-box');
const instructionsBox = document.getElementById('instructions-box');
const timeLimitInput = document.getElementById('time-limit-input');
const startLivesInput = document.getElementById('start-lives-input');
const maxLivesInput = document.getElementById('max-lives-input');
const minFreqInput = document.getElementById('min-freq-input');
const maxFreqInput = document.getElementById('max-freq-input');
const settingsBtn = document.getElementById('settings-btn');
const instructionsBtn = document.getElementById('instructions-btn');

function toggleSettingsBox() {
    settingsBox.classList.toggle('hidden');
}

function toggleInstructionsBox() {
    instructionsBox.classList.toggle('hidden');
}

function saveSettingsToLocalStorage() {
    const settings = {
        timeLimit: parseInt(timeLimitInput.value, 10),
        startLives: parseInt(startLivesInput.value, 10),
        maxLives: parseInt(maxLivesInput.value, 10),
        minFreq: parseInt(minFreqInput.value, 10),
        maxFreq: parseInt(maxFreqInput.value, 10)
    };
    localStorage.setItem('bombaPartisiSettings', JSON.stringify(settings));
}

function loadSettingsFromLocalStorage() {
    const savedSettings = localStorage.getItem('bombaPartisiSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        timeLimit = settings.timeLimit || 30;
        numberOfLives = settings.startLives || 3;
        maxNumberOfLives = settings.maxLives || 3;

        timeLimitInput.value = settings.timeLimit;
        startLivesInput.value = settings.startLives;
        maxLivesInput.value = settings.maxLives;
        minFreqInput.value = settings.minFreq;
        maxFreqInput.value = settings.maxFreq;
    }
}

function saveSettings() {
    let parsedTime = Math.round(parseFloat(timeLimitInput.value));
    if (isNaN(parsedTime) || parsedTime < 1) {
        parsedTime = 30;
        showFeedbackMessage("Tur süresi en az 1 saniye olmalıdır.");
    }
    timeLimit = parsedTime;
    timeLimitInput.value = timeLimit;

    let parsedMaxLives = Math.round(parseFloat(maxLivesInput.value));
    if (isNaN(parsedMaxLives) || parsedMaxLives < 1) {
        parsedMaxLives = 3;
        showFeedbackMessage("Maksimum can sayısı en az 1 olmalıdır.");
    }
    maxNumberOfLives = parsedMaxLives;
    maxLivesInput.value = maxNumberOfLives;

    let parsedStartLives = Math.round(parseFloat(startLivesInput.value));
    if (isNaN(parsedStartLives) || parsedStartLives < 1) {
        parsedStartLives = 3;
        showFeedbackMessage("Başlangıç canı en az 1 olmalıdır.");
    }
    numberOfLives = parsedStartLives;
    startLivesInput.value = numberOfLives;
    
    let parsedMinFreq = Math.round(parseFloat(minFreqInput.value));
    if (isNaN(parsedMinFreq) || parsedMinFreq < 1) {
        parsedMinFreq = 30; 
        showFeedbackMessage("Minimum hece başına kelime sayısı en az 1 olmalıdır.");
    }
    let minFreq = parsedMinFreq;
    minFreqInput.value = minFreq;

    let parsedMaxFreq = Math.round(parseFloat(maxFreqInput.value));
    if (isNaN(parsedMaxFreq) || parsedMaxFreq < 1) {
        parsedMaxFreq = 1000;
    }
    let maxFreq = parsedMaxFreq;
    maxFreqInput.value = maxFreq;

    if (numberOfLives > maxNumberOfLives) {
        numberOfLives = maxNumberOfLives;
        startLivesInput.value = maxNumberOfLives;
        showFeedbackMessage("Başlangıç canı, maksimum candan fazla olamaz!");
    }

    if (minFreq >= maxFreq) {
        minFreq = maxFreq - 1;
        if (minFreq < 1) {
            minFreq = 1;
        }
        minFreqInput.value = minFreq;
        showFeedbackMessage("Maximum hece başına kelime sayısı, minimum hece başına kelime sayısından küçük olamaz!");
    }

    if (!gameActive) {
        timer.textContent = timeLimit;
    }
    
    saveSettingsToLocalStorage();
    updateLivesDisplay();
    toggleSettingsBox();
}

function updateLivesDisplay() {
    let hearts = '💖'.repeat(numberOfLives);
    let brokenHearts = '🖤'.repeat(Math.max(0, maxNumberOfLives - numberOfLives));
    document.getElementById("lives").innerHTML = hearts + brokenHearts;
}

document.addEventListener('DOMContentLoaded', () => {
    loadSettingsFromLocalStorage();
    timer.textContent = timeLimit;
    updateLivesDisplay();

    if (!localStorage.getItem('bombaPartisiFirstVisit')) {
        toggleInstructionsBox();
        localStorage.setItem('bombaPartisiFirstVisit', 'true');
    }
});

const timer = document.getElementById("timer");
const feedbackNotifs = document.getElementsByClassName("feedback-notifications")[0];
const wordInput = document.getElementById("word-input");
const letters = document.getElementsByClassName("letter");

let timeLimit = 30;
let timerInterval;

let maxNumberOfLives = 3;
let numberOfLives = 3;

let gameActive = false;

let validSyllables;
let wordData;
let usedWords;

document.getElementById("word-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        submitWord();
    }
});

timer.innerHTML = timeLimit;

async function startGame() {
    if (!gameActive) {
        settingsBtn.disabled = true;
        gameActive = true;
        await gameInit();
        fetchSyllable();
        startTimer();
    }
}

async function gameInit() {
    resetLetters();
    
    numberOfLives = parseInt(startLivesInput.value, 10);
    maxNumberOfLives = parseInt(maxLivesInput.value, 10);
    updateLivesDisplay();

    const minWordCount = parseInt(minFreqInput.value, 10);
    const maxWordCount = parseInt(maxFreqInput.value, 10);
    
    const freqResponse = await fetch("./freqs.json");
    const freqData = await freqResponse.json();
    const syllables = Object.keys(freqData);
    
    validSyllables = syllables.filter((syllable) => {
        const count = freqData[syllable];
        return count >= minWordCount && count <= maxWordCount;
    });

    const wordResponse = await fetch("./words.json");
    wordData = await wordResponse.json();

    wordInput.value = "";
    wordInput.focus();
    usedWords = [];
}

function startTimer() {
    clearInterval(timerInterval);
    timer.innerHTML = timeLimit;
    let timeRemaining = timeLimit;
    const start = Date.now();
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
    settingsBtn.disabled = false;
    clearInterval(timerInterval);
    gameActive = false;
    const currentSyllable = document.getElementById("current-syllable").textContent;
    if (wordData && currentSyllable !== "???") {
        showPotentialWord(currentSyllable, true);
    }
    
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

function decreaseLives() {
    numberOfLives--;
    updateLivesDisplay();
    let dead = numberOfLives < 0;
    if (dead) numberOfLives = 0;
    return dead;
}

function increaseLives() {
    if (numberOfLives >= maxNumberOfLives) {
        return;
    }
    numberOfLives++;
    updateLivesDisplay();
}

const getValidWords = ((syllable) => wordData[syllable]);

function showPotentialWord(currentSyllable, isFinal = false) {
    const validWords = getValidWords(currentSyllable);
    if (validWords && validWords.length > 0) {
        const randomWord = validWords[Math.floor(Math.random() * validWords.length)];
        showFeedbackMessage(`${isFinal ? "Oyun Bitti!\n" : ""}Kullanabildiğin kelime: ${randomWord}`);
    } else {
        showFeedbackMessage(`${isFinal ? "Oyun Bitti!" : "Sıradaki tur!"}`);
    }
}

function fetchSyllable() {
    let includesAll = true;
    let fetchedSyllable;
    let attempts = 0;
    
    if (validSyllables.length === 0) {
        showFeedbackMessage("Ayarlarla eşleşen hece bulunamadı!");
        endGame();
        return;
    }

    do {
        const randomIndex = Math.floor(Math.random() * validSyllables.length);
        fetchedSyllable = validSyllables[randomIndex];
        validWords = getValidWords(fetchedSyllable) || [];
        
        if (usedWords.length < validWords.length) break;

        includesAll = validWords.every(word => usedWords.includes(word));
        attempts++;
        if (attempts > validSyllables.length) {
            showFeedbackMessage("Tüm kelimeler kullanıldı!");
            endGame();
            return;
        }
    } while (includesAll);

    document.getElementById("current-syllable").innerHTML = fetchedSyllable;
}

function submitWord() {
    if (wordData === undefined || !gameActive) {
        showFeedbackMessage("Önce oyunu başlatın.");
        return;
    }

    const enteredWord = turkishLowerCase(wordInput.value.trim());

    if (enteredWord === "") {
        return;
    }

    const currentSyllable = document.getElementById("current-syllable").textContent;
    const validWords = getValidWords(currentSyllable);

    if (!validWords || !validWords.includes(enteredWord)) {
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

function allLettersUsed() {
    for (let i = 0; i < letters.length; i++) {
        if (!letters[i].classList.contains("used")) {
            return false;
        }
    }
    return true;
}

function updateLetters(enteredWord) {
    for (let i = 0; i < letters.length; i++) {
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

function turkishUpperCase(text) {
    return text.replace(/i/g, "İ").replace(/ı/g, "I").toUpperCase();
}

function turkishLowerCase(text) {
    return text.replace(/I/g, "ı").replace(/İ/g, "i").toLowerCase();
}

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

function awardPoint() {
    const scoreElement = document.getElementById("score");
    let currentScore = parseInt(scoreElement.textContent);
    scoreElement.textContent = currentScore + 1;
}

function addScoreToScoreboard() {
    const scoreboardTitle = document.getElementById("scoreboard-title");
    scoreboardTitle.style.display = "block";
    const scoreboardElement = document.getElementById("score-list");
    const score = parseInt(document.getElementById("score").textContent);
    const scoreEl = document.createElement("li");
    scoreEl.className = "score-item";
    scoreEl.textContent = `Puan: ${score}`;
    scoreEl.title = new Date().toLocaleString();
    scoreboardElement.appendChild(scoreEl);
}