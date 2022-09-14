const wordText = document.querySelector(".content .word");
const hintText = document.querySelector(".hint span");
const inputField = document.querySelector("input");
const timeText = document.querySelector(".time span b");
const refreshBtn = document.querySelector(".buttons .refresh-word");
const checkBtn = document.querySelector(".buttons .check-word");

let correctWord;
let timeLeft = 30;
let timer;

function initGame() {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let randomWord = randomObj.word.split("");
    //to scramble numbers
    for (let i = randomWord.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [randomWord[i], randomWord[j]] = [randomWord[j], randomWord[i]];   
    }
    wordText.innerHTML = randomWord.join("");
    hintText.innerHTML = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.setAttribute("maxlength", correctWord.length);
    inputField.value = "";
}
initGame();

function initTimer(timeLeft) {
    clearInterval(timer);
    timer = setInterval(() => {
        if (timeLeft>0) {
            timeLeft--;
            return timeText.innerHTML = timeLeft;
        }
        clearInterval(timer);
        alert(`Time up! ${correctWord.toUpperCase()} is the correct word`);
        initGame();
    }, 1000);

    
}

function checkWord() {
    let userWord = inputField.value.toLocaleLowerCase();
    if (!userWord) return alert("Please enter a word")
    if (userWord !== correctWord) return alert(`Oops! ${userWord} is not the correct word`);
    alert(`Correct! ${userWord.toUpperCase()} is the correct word`);
    initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
document.addEventListener("keydown", () => {
    inputField.focus();
})