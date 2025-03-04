// Word lists for different categories
const words = {
    movies: ['Star Wars', 'Titanic', 'Jurassic Park', 'The Matrix', 'Finding Nemo', 'Avatar', 'The Lion King', 'The Godfather', 'The Shawshank Redemption', "Schindler's List"],
    animals: ['Elephant', 'Penguin', 'Giraffe', 'Kangaroo', 'Monkey', 'Lion', 'Dolphin' 'Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra', 'Kangaroo', 'Panda', 'Koala'],
    actions: ['Swimming', 'Dancing', 'Cooking', 'Sleeping', 'Running', 'Jumping', 'Laughing', 'Run', 'Jump', 'Walk', 'Sit', 'Stand', 'Dance', 'Sing', 'Speak', 'Write'],
    objects: ['Chair', 'Telephone', 'Umbrella', 'Guitar', 'Clock', 'Camera', 'Book', 'Table', 'Lamp', 'Computer', 'Sofa', 'Bed', 'Cupboard', 'Pillow', 'Coffee', 'Bed']
};

// Game state
let currentWord = '';
let timeLeft = 60;
let timer = null;
let currentTeam = 1;
let scores = { team1: 0, team2: 0 };
let isPlaying = false;

// DOM elements
const wordDisplay = document.getElementById('wordDisplay');
const timerDisplay = document.getElementById('timer');
const team1Score = document.getElementById('team1Score');
const team2Score = document.getElementById('team2Score');
const startBtn = document.getElementById('startBtn');
const correctBtn = document.getElementById('correctBtn');
const skipBtn = document.getElementById('skipBtn');
const categorySelect = document.getElementById('category');

// Get random word from selected category
function getRandomWord() {
    const category = categorySelect.value;
    const wordList = words[category];
    return wordList[Math.floor(Math.random() * wordList.length)];
}

// Update timer display
function updateTimer() {
    timerDisplay.textContent = timeLeft;
    if (timeLeft === 0) {
        endRound();
    } else {
        timeLeft--;
    }
}

// Start new round
function startRound() {
    isPlaying = true;
    timeLeft = 60;
    currentWord = getRandomWord();
    wordDisplay.textContent = currentWord;
    
    // Enable/disable buttons
    startBtn.disabled = true;
    correctBtn.disabled = false;
    skipBtn.disabled = false;
    
    // Start timer
    timer = setInterval(updateTimer, 1000);
}

// End current round
function endRound() {
    isPlaying = false;
    clearInterval(timer);
    wordDisplay.textContent = 'Round Over!';
    
    // Enable/disable buttons
    startBtn.disabled = false;
    correctBtn.disabled = true;
    skipBtn.disabled = true;
    
    // Switch teams
    currentTeam = currentTeam === 1 ? 2 : 1;
    startBtn.textContent = `Team ${currentTeam}'s Turn`;
}

// Handle correct guess
function handleCorrect() {
    if (!isPlaying) return;
    
    // Update score
    if (currentTeam === 1) {
        scores.team1++;
        team1Score.textContent = scores.team1;
    } else {
        scores.team2++;
        team2Score.textContent = scores.team2;
    }
    
    // Get new word
    currentWord = getRandomWord();
    wordDisplay.textContent = currentWord;
}

// Handle skip
function handleSkip() {
    if (!isPlaying) return;
    currentWord = getRandomWord();
    wordDisplay.textContent = currentWord;
}

// Event listeners
startBtn.addEventListener('click', startRound);
correctBtn.addEventListener('click', handleCorrect);
skipBtn.addEventListener('click', handleSkip);

// Initialize game
startBtn.textContent = `Team ${currentTeam}'s Turn`;
