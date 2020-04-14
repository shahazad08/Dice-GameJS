/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, lastDice;
init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random No. Generate
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result in a DOM
        var domDice = document.querySelector('.dice');
        console.log(domDice)
        domDice.src = 'dice-' + dice + '.png'

        // 3. Update the Score if its not 1
        if (dice === 6 && lastDice === 6) {
            console.log("Roll Out")
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPLayer();
        }
        if (dice != 1) {
            // Add Score
            roundScore += dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            document.querySelector('.dice').style.display = 'block';
        }
        else {
            // Next Player
            nextPLayer();
        }
        lastDice = dice;
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add Current Score to a Global Score
        scores[activePlayer] += roundScore
        console.log("Active PLayer", scores[activePlayer])
        console.log("Score", scores);
        console.log("AP", activePlayer);

        // Update the UI
         document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
         var input = document.querySelector('.final-score').value;
         var winingInput = 0;
         if (input) {
             winingInput = input;
         }
         else {
             winingInput = 100;
         }


        //Check if the player won the game
        if (scores[activePlayer] > winingInput) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner"
            document.querySelector('.dice').style.display = "none";
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
            // Next PLayer
            nextPLayer()
        }
    }
})

function nextPLayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
    document.querySelector('.dice').style.display = 'none';
}
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').innerHTML = 'Player 1';
    document.getElementById('name-1').innerHTML = 'Player 2';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.btn-new').addEventListener('click', init);


// document.querySelector('#player-name').textContent = 'Shahazad'
// document.querySelector('#current-' + activePlayer).innerHTML = `<em>` + dice + `<em>`
// var a = document.querySelector('#current-' + activePlayer).textContent = dice
// document.querySelector('.dice').style.display = 'none';

