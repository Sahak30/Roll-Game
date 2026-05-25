'use strict'


//  selecting the Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');


const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');




//     // starting condatioin

let score, currentScore, activePlayer, playing;
const init = function () {
    score = [0, 0];
    currentScore = 0;    // current score to store the score
    activePlayer = 0;   // active player 
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();

// Rolling Dices Funcationality


// switch to next player function
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');

};
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1: Genaret random dices roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        // 2:  Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3: cheach for rolled 1 
        if (dice !== 1) {
            // add dice to crent score
            currentScore = currentScore + dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //  switch to next player
            switchPlayer();
        }
    }
});



/// hold button 

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1: add current score to action player
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

        // 2: check if player's score => 100 
        if (score[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');
            // finish the game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            // 3: switch to next player to continoue the game
            switchPlayer();
        }
    }
});



//   New Game Button 

btnNew.addEventListener('click', init);
