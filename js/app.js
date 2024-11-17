/*-------------------------------- Constants --------------------------------*/

const needs = ['boredom', 'hunger', 'sleep', 'work']

const maxStatValue = 5;

const gameDuration = 60000;
/*---------------------------- Variables (state) ----------------------------*/

// let playerChoice

let stats = {
    boredom: 0,
    hunger: 0,
    sleep: 0,
    work: 0
}

let gameTimer;
let countdownTimer;
let statsMessage;
let timerRunning = false;
let playerName = '';

/*------------------------ Cached Element References ------------------------*/

// const boredomBtnElm = document.querySelector('#party');
// const hungerBtnElm = document.querySelector('#munch');
// const sleepBtnElm = document.querySelector('#sleep');
// const workBtnElm = document.querySelector('#work');

const boredomStatElm = document.querySelector('#boredom-stat');
const hungerStatsElm = document.querySelector('#hunger-stat');
const sleepinessStatElm = document.querySelector('#sleepiness-stat');
const brokenessStatElm = document.querySelector('#brokeness-stat');



const buttons = document.querySelectorAll('button');
const messageElm = document.querySelector('#message');
const resetButtonElm = document.querySelector('#restart');
const startButtonElm = document.querySelector('#startButton');

const nameInputElm = document.querySelector('#name-input');
const nameDisplayElm = document.querySelector('#name-display');
const countdownElm = document.querySelector('#countdown');
/*-------------------------------- Functions --------------------------------*/


// const getPlayerChoice = (event) => {
//     playerChoice = event.target.id;
// }

const updateStats = () => {
    boredomStatElm.textContent = stats.boredom;
    hungerStatsElm.textContent = stats.hunger;
    sleepinessStatElm.textContent = stats.sleep;
    brokenessStatElm.textContent = stats.work;
};

const endGame = (result) => {
    clearInterval(gameTimer);
    clearInterval(countdownTimer);
    timerRunning = false;
    statsMessage = `Game Over! ${result} reached its maximum.`
    messageElm.textContent = statsMessage;
    messageElm.classList.remove('hidden');
    resetButtonElm.classList.remove('hidden');
    startButtonElm.classList.add('hidden');
}

const winGame = () => {
    clearInterval(gameTimer);
    clearInterval(countdownTimer);
    timerRunning = false;
    statsMessage = "Congratulations! You won by keeping your stats under 5!";
    messageElm.textContent = statsMessage;
    messageElm.classList.remove('hidden');
    resetButtonElm.classList.remove('hidden');
    startButtonElm.classList.add('hidden');
};

const statsCount = () => {
    for (let stat in stats) {
        if (stats[stat] < maxStatValue) {
            stats[stat]++;
        }
        if (stats[stat] >= maxStatValue) {
            endGame(`${stat} has reached its maximum`);
            return;
        }
    }
    updateStats();
};

const startCountdown = () => {
    let timeLeft = gameDuration / 1000;
    countdownElm.textContent = `Time Left: ${timeLeft}s`;

    countdownTimer = setInterval(() => {
        timeLeft--;
        countdownElm.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            winGame();
        }
    }, 1000);
};

const resetGame = () => {
    stats = {
        boredom: 0,
        hunger: 0,
        sleep: 0,
        work: 0
    };

    clearInterval(gameTimer);
    clearInterval(countdownTimer);

    updateStats();
   playerName = '';
    nameDisplayElm.textContent = "Tamagotchi's Name: ...";
    nameInputElm.value = '';
    countdownElm.textContent = "Time Left: ";
    messageElm.textContent = "Please enter a name for your Tamagotchi and press 'Submit' to begin!";
    messageElm.classList.remove('hidden');
    resetButtonElm.classList.add('hidden');
    startButtonElm.classList.remove('hidden');
    nameInputElm.disabled = false;
};

const startGame = () => {
    if (timerRunning) return;
    timerRunning = true;
    gameTimer = setInterval(statsCount, 1000);
    startCountdown();
    startButtonElm.classList.add('hidden');
    resetButtonElm.classList.add('hidden');
};

// MAIN FUNCTION

const getPlayerChoice = (event) => {
    if (!timerRunning) return;
    const playerChoice = event.target.id;
    console.log(`Player chose: ${playerChoice}`);

    if (playerChoice === 'party') {
        stats.boredom = 0;
    } else if (playerChoice === 'munch') {
        stats.hunger = 0;
    } else if (playerChoice === 'sleep') {
        stats.sleep = 0;
    } else if (playerChoice === 'work') {
        stats.work = 0;
    }

    updateStats();
};

const handleNameSubmit = () => {
    playerName = nameInputElm.value.trim();
    if (playerName) {
        nameDisplayElm.textContent = `Tamagotchi's Name: ${playerName}`;
        nameInputElm.value = '';
        startButtonElm.classList.remove('hidden');
        messageElm.textContent = "Press 'Start Game' to begin!";
    } else {
        alert("Please enter a name for your Tamagotchi!");
    }
};

/*----------------------------- Event Listeners -----------------------------*/

// boredomBtnElm.addEventListener('click', play);
// hungerBtnElm.addEventListener('click', play);
// sleepBtnElm.addEventListener('click', play);
// workBtnElm.addEventListener('click', play);

buttons.forEach(button => {
    button.addEventListener('click', getPlayerChoice);
});

resetButtonElm.addEventListener('click', resetGame);
startButtonElm.addEventListener('click', startGame);

document.querySelector('#submit-button').addEventListener('click', handleNameSubmit);