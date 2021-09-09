// Rock paper scissors
// Need user to select input
// Randomly select input for opponent
// Check who wins
// Display winner or draw

//variables
const weaponMap = {
    0: "rock",
    1: "paper",
    2: "scissors",
};
const matchOutcomeEl = document.querySelector("#match-outcome");
const rockButton = document.querySelector("#player-rock");
const paperButton = document.querySelector("#player-paper");
const scissorsButton = document.querySelector("#player-scissors");
const resetButton = document.querySelector("#reset-button");
const gamesWonEl = document.querySelector("#games-won");
const weaponButtons = [rockButton, paperButton, scissorsButton];
let gamesWon = 0;

const loadPage = function() {
    registerButtonEvents();
}

const resetGame = function() {
    weaponButtons.forEach(button => button.classList.remove("hide-button"))
    resetButton.classList.add("hide-button");

    matchOutcomeEl.innerHTML = "";
}

const registerButtonEvents = function() {
    weaponButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            beginGame(parseInt(e.target.dataset.id));
        })
    })
    resetButton.addEventListener("click", resetGame);
}

const beginGame = function(playerSelectionId) {
    const opponentWeaponId = generateOponentWeapon();
    determineWinner(playerSelectionId, opponentWeaponId);
}

const generateOponentWeapon = function() {
    // randomly generate number from 0 to 2
    const rand = Math.floor(Math.random() * 3);
    return rand;
};

const determineWinner = function(playerSelectionId, opponentWeaponId) {
    if (playerSelectionId === opponentWeaponId) {
        showDraw(playerSelectionId)
        return
    }
    //Rock wins
    if (playerSelectionId === 0 && opponentWeaponId === 2) {
        showWinner(2, "player");
        return
    }
    if (playerSelectionId === 2 && opponentWeaponId === 0) {
        showWinner(0, "opp");
        return
    }
    //paper wins
    if (playerSelectionId === 1 && opponentWeaponId === 0) {
        showWinner(0, "player");
        return
    }
    if (playerSelectionId === 0 && opponentWeaponId === 1) {
        showWinner(1, "opp");
        return
    }
    // scissors wins
    if (playerSelectionId === 2 && opponentWeaponId === 1) {
        showWinner(1, "player");
        return
    }
    if (playerSelectionId === 1 && opponentWeaponId === 2) {
        showWinner(2, "opp");
        return
    }
};

const showDraw = function(weaponId) {
    hideWeaponButtons();
    const weapon = weaponMap[weaponId];

    const strToAppend = document.createTextNode(`You both selected ${weapon}. It was a DRAW!`);
    matchOutcomeEl.appendChild(strToAppend);
}

const showWinner = function(oppSelectionId, winner) {
    hideWeaponButtons();
    const oppSelection = weaponMap[oppSelectionId];
    let winnerStr;
    if (winner === "player") {
        winnerStr = "YOU";
        increaseGamesWon();
    } else {
        winnerStr = "the OPPONENT";
    }
    const strToAppend = document.createTextNode(`${winnerStr} has won this round. We chose ${oppSelection}`);

    matchOutcomeEl.appendChild(strToAppend);
}

const increaseGamesWon = function() {
    gamesWon++;
    let strToAppend;
    if (gamesWon <= 1) {
        strToAppend = document.createTextNode(`You have won 1 game.`)
    } else {
        strToAppend = document.createTextNode(`You have won ${gamesWon} games`)
    }

    gamesWonEl.innerHTML = "";
    gamesWonEl.appendChild(strToAppend);

}

const hideWeaponButtons = function() {
    weaponButtons.forEach(button => button.classList.add("hide-button"))
    resetButton.classList.remove("hide-button");
};

loadPage();


