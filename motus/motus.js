const numberOfTry = 5;
const dico = ["julien","pardon","banane","patate"];
var gameWord;
var playerTryNumber;
var hintWord = "";
var input;

'use strict';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateWord() {
    return dico[getRandomInt(dico.length)];
}

function startGame() {
    playerTryNumber = 0;
    gameWord = generateWord();
}

function tryWord(input) {
    if (playerTryNumber < numberOfTry) {
        verifyWordLength(input);
    } else {
        console.log("Vous n'avez plus d'essai !");
        gameEnd();
    }
}
 
function verifyWordLength(wordToVerify) {
    if (wordToVerify.length != gameWord.length) {
        return("Votre mot doit faire " + gameWord.length + " lettres.");
    }
    verifyWord(wordToVerify);
}

function verifyWord(wordToVerify) {
    playerTryNumber++;
    if (wordToVerify == gameWord) {
        gameEnd();
        console.log("You won !");
    } else if (wordToVerify != gameWord && gameWord != undefined) {
        createHintWordForDisplay(wordToVerify);
        return hintWord;
    } else {
        console.log("No game started");
    }
}

function createHintWordForDisplay(wordToVerify) {
    hintWord = "";
    for (let indexPlayerWord = 0 ; indexPlayerWord < gameWord.length; indexPlayerWord++) {
        if (wordToVerify[indexPlayerWord] == gameWord[indexPlayerWord]) {
            hintWord += "O";
        } else if (gameWord.includes(wordToVerify[indexPlayerWord])) {
            hintWord += "X";
        } else {
            hintWord += "-";
        }
    }
    console.log(hintWord);
}

function gameEnd() {
    gameWord = undefined;
    playerTryNumber = undefined;
}

let nbrappuijs = 0;

document
    .getElementById("tryWordButton")
    .addEventListener("click", function() {
    document
      .getElementById("nbrappui")
      .innerText = (++nbrappuijs) + '';
  });

  document
    .getElementById("startGameButton")
    .addEventListener("click", function() {
        // A REMPLIR POUR LANCER LES FONCTIONS DE GENERATION DE MOT, VIRER LE BOUTON, ET AFFICHER LE NOMBRE D'ESSAIS RESTANTS + TOUTE LA GRILLES ETC
        document.getElementById("tableau").classList.replace("gameNotStarted", "gameStarted");
        document.getElementById("startButton").classList.replace("gameStarted", "gameNotStarted");
        document.getElementById("wordInput").classList.replace("gameNotStarted", "gameStarted");
        document.getElementById("wordInput").classList.add("wordInput");
        document.getElementById("inputButton").classList.replace("gameNotStarted", "gameStarted");
  });