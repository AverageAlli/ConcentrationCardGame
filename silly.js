const cardFlipSound = document.getElementById('cardFlipSound');
const gameWinSound = document.getElementById('gameWinSound');

const gameBoard = document.getElementById('gameBoard');
const matchesRemainingDisplay = document.getElementById('matchesRemaining');
const replayButton = document.getElementById('replayButton');

let firstCard = null;
let secondCard = null;
let matchesRemaining = 8;
let isBoardLocked = false; 

function generateCards() {
    const values = [];
    for (let i = 1; i <= 8; i++) {
        values.push(i, i); 
    }

    values.sort(() => 0.5 - Math.random()); 

    values.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value);
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
}

function handleCardClick(event) {
    if (isBoardLocked) return; 
    const clickedCard = event.target;

    if (clickedCard === firstCard) return; 

    clickedCard.innerHTML = clickedCard.getAttribute('data-value');
    clickedCard.classList.add('flipped');

    if (!firstCard) {
        firstCard = clickedCard;
        playSound(cardFlipSound);
    } else {
        secondCard = clickedCard;
        playSound(cardFlipSound);
        checkForMatch();
    }
}

function checkForMatch() {
    isBoardLocked = true;
    const isMatch = firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value');

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    setTimeout(() => {
        firstCard.style.visibility = 'hidden';
        secondCard.style.visibility = 'hidden';
        resetBoard();

        matchesRemaining--;
        matchesRemainingDisplay.textContent = matchesRemaining;

        if (matchesRemaining === 0) {
            playSound(gameWinSound);
            replayButton.style.display = 'block'; 
        }
    }, 1000);
}

function unflipCards() {
    setTimeout(() => {
        firstCard.innerHTML = '';
        secondCard.innerHTML = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    isBoardLocked = false;
}

function resetGame() {
    matchesRemaining = 8;
    matchesRemainingDisplay.textContent = matchesRemaining;
    replayButton.style.display = 'none';
    gameBoard.innerHTML = '';
    generateCards(); 
}
function playSound(sound) {
    if (sound) {
        sound.currentTime = 0; 
        sound.play().then(() => {
            console.log('Sound played successfully.');
        }).catch(error => {
            console.error('Error playing sound:', error);
        });
    } else {
        console.error('Sound element is missing');
    } //because i had so many issues getting so=und to come out lol
}

replayButton.addEventListener('click', resetGame);

generateCards();