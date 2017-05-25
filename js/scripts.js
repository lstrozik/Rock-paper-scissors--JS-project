// new game start button

var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

// player pick

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('Rock') });
pickPaper.addEventListener('click', function() { playerPick('Paper') });
pickScissors.addEventListener('click', function() { playerPick('Scissors') });

// Beginning state

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Play again';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}
setGameElements();

// Beginnig of the game

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
    player.name = prompt('Please enter your name', 'player name');
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();

        playerNameElem.innerHTML = player.name;
        setGamePoints();
  }
}

// Player's pick

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

// Computer's pick

function getComputerPick() {
    var possiblePicks = ['Rock', 'Paper', 'Scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

// Assigning points

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // draw
    } else if (
        (computerPick == 'Rock' &&  playerPick == 'Scissors') ||
        (computerPick == 'Scissors' &&  playerPick == 'Paper') ||
        (computerPick == 'Paper' &&  playerPick == 'Rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "You win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Computer wins!";
        computer.score++;
    }


    setGameElements();
    setGamePoints();
    winner();
}

function winner() {
    if (player.score === 10) {
            alert("You win!");
            gameState = "ended";
    } else if (computer.score === 10) {
            alert("Computer won")
            gameState = "ended";
    }
}
// Score updating

function setGamePoints() {
    playerPointsElem.innerText = player.score;
    computerPointsElem.innerText = computer.score;
}
