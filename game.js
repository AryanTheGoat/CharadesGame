// Word lists for different categories
const words = {
    movies: ['Star Wars', 'Titanic', 'Jurassic Park', 'The Matrix', 'Finding Nemo', 'Avatar', 'The Lion King', 'The Godfather', 'The Shawshank Redemption', "Schindler's List", 'Pulp Fiction', 'The Dark Knight', 'The Lord of the Rings: The Return of the King', 'Forrest Gump', 'Inception', 'Fight Club', 'The Matrix', 'Goodfellas', 'The Empire Strikes Back', 'The Silence of the Lambs', 'Gladiator', 'Saving Private Ryan', 'The Green Mile', 'Interstellar', 'The Prestige', 'Back to the Future', 'The Departed', 'Casablanca', 'The Lion King', 'The Terminator', 'Avatar', 'The Avengers', 'Citizen Kane', 'The Wizard of Oz', 'Star Wars: A New Hope', 'The Social Network', 'The Godfather Part II', '12 Angry Men', 'Psycho', 'The Big Lebowski', 'A Clockwork Orange', 'Jaws', 'Blade Runner', 'Apocalypse Now', 'The Shining', "One Flew Over the Cuckoo's Nest", 'The Dark Knight Rises', 'Good Will Hunting', 'No Country for Old Men', 'The Revenant', 'The Breakfast Club', 'The Exorcist', 'Rear Window', 'Gone with the Wind', 'The Usual Suspects', 'The Great Escape', 'Reservoir Dogs', 'The Big Short'],
    animals: ['Elephant', 'Penguin', 'Giraffe', 'Kangaroo', 'Monkey', 'Lion', 'Dolphin' 'Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra', 'Kangaroo', 'Panda', 'Koala', 'Penguin', 'Dolphin', 'Shark', 'Whale', 'Eagle', 'Owl', 'Hawk', 'Bat', 'Cheetah', 'Leopard', 'Rhino', 'Hippo', 'Crocodile', 'Alligator', 'Monkey', 'Gorilla', 'Chimpanzee', 'Bear', 'Wolf', 'Fox', 'Rabbit', 'Squirrel', 'Deer', 'Moose', 'Otter', 'Beaver', 'Horse', 'Cow', 'Sheep', 'Goat', 'Chicken', 'Duck', 'Turkey', 'Peacock', 'Flamingo', 'Pelican', 'Swan', 'Parrot', 'Canary', 'Goldfish', 'Turtle', 'Snake', 'Lizard', 'Frog'],
    actions: ['Swimming', 'Dancing', 'Cooking', 'Sleeping', 'Running', 'Jumping', 'Laughing', 'Run', 'Jump', 'Walk', 'Sit', 'Stand', 'Dance', 'Sing', 'Speak', 'Write', 'Read', 'Listen', 'Clap', 'Kneel', 'Bow', 'Laugh', 'Cry', 'Shout', 'Whisper', 'Hug', 'Kiss', 'Wave', 'Frown', 'Smile', 'Stare', 'Look', 'Reach', 'Throw', 'Catch', 'Throw', 'Push', 'Pull', 'Kick', 'Punch', 'Stretch', 'Bend', 'Lift', 'Carry', 'Drop', 'Pick', 'Build', 'Destroy', 'Create', 'Destroy', 'Cook', 'Clean', 'Play', 'Work', 'Rest', 'Sleep', 'Think', 'Meditate'],
    objects: ['Chair', 'Telephone', 'Umbrella', 'Guitar', 'Clock', 'Camera', 'Book', 'Table', 'Lamp', 'Computer', 'Sofa', 'Bed', 'Cupboard', 'Pillow', 'Coffee', 'Bed', 'Spoon', 'Blanket', 'Knife', 'Stove', 'Sink', 'Washing machine', 'Pot', 'Dish', 'Fridge', 'Sofa', 'Stool', 'Cup', 'Fork', 'Glass'],
Read more at: https://blog.abaenglish.com/objects-in-english/]
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
