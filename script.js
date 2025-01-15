const playersContainer = document.getElementById('players');
const timerElement = document.getElementById('timer');

const players = [
    { name: 'Jugador 1', hiddenCard: null, exposedCard: null },
    { name: 'Jugador 2', hiddenCard: null, exposedCard: null }
];

const deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Cartas disponibles

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function dealCards() {
    const shuffledDeck = shuffle([...deck, ...deck]); // Duplicamos el mazo para 2 jugadores
    players.forEach(player => {
        player.hiddenCard = shuffledDeck.pop();
        player.exposedCard = shuffledDeck.pop();
    });
    updateUI();
    startTimer();
}

function updateUI() {
    playersContainer.innerHTML = '';
    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player');

        playerDiv.innerHTML = `
            <h3>${player.name}</h3>
            <div class="cards">
                <div class="card hidden" data-player="${player.name}">?</div>
                <div class="card">${player.exposedCard}</div>
            </div>
        `;

        playersContainer.appendChild(playerDiv);
    });
}

function revealCards() {
    const hiddenCards = document.querySelectorAll('.card.hidden');
    hiddenCards.forEach(hiddenCard => {
        const playerName = hiddenCard.getAttribute('data-player');
        const player = players.find(p => p.name === playerName);
        if (player) {
            hiddenCard.textContent = player.hiddenCard;
            hiddenCard.classList.remove('hidden');
        }
    });
    determineWinner();
}


function determineWinner() {
    const results = players.map(player => player.hiddenCard + player.exposedCard);
    const maxScore = Math.max(...results);
    const winners = players.filter((_, index) => results[index] === maxScore);

    if (winners.length > 1) {
        alert('¡Empate! Los ganadores son: ' + winners.map(w => w.name).join(', '));
    } else {
        alert('¡El ganador es ' + winners[0].name + '!');
    }
}

function startTimer() {
    let countdown = 5;
    timerElement.textContent = `Revelando cartas en: ${countdown} segundos`;

    const timer = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            timerElement.textContent = `Revelando cartas en: ${countdown} segundos`;
        } else {
            clearInterval(timer);
            timerElement.textContent = '';
            revealCards();
        }
    }, 1000);
}

// Iniciar el juego
dealCards();
