const numberOfTry = 5;
const dico = ["julien","pardon","banane","patate"];
var gameWord;
var playerTryNumber;
var hintWord = "";
var input;
var short = false;

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
        alert("Vous n'avez plus d'essai !");
        gameEnd();
    }
}
 
function verifyWordLength(wordToVerify) {
    short = false;
    if (wordToVerify.length != gameWord.length) {
        alert("Votre mot doit faire " + gameWord.length + " lettres.");
        short = true;
        return(short);
    }
    verifyWord(wordToVerify);
}

function verifyWord(wordToVerify) {
    playerTryNumber++;
    document.getElementById("numberOfTry").innerText = numberOfTry - playerTryNumber;
    //alert(playerTryNumber);
    if (wordToVerify == gameWord) {
        gameEnd();
        alert("You won !");
    } else if (wordToVerify != gameWord && gameWord != undefined) {
        createHintWordForDisplay(wordToVerify);
    } else {
        alert("No game started");
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
    //alert(hintWord);
}

function displayHintWord (hintWord) {
    var rowToDisplay = "L" + playerTryNumber
    //alert(rowToDisplay); //Renvoie L1, L2, etc.
    for (let indexLetter = 1 ; indexLetter < 7 ; indexLetter++) {
        var boxToDisplay = rowToDisplay + indexLetter
        //alert(boxToDisplay); // Renvoie L11, L12, etc.        
        if (hintWord[indexLetter-1] == "X") {
            document.getElementById(boxToDisplay).classList.add("oknotplaced");
            document.getElementById(boxToDisplay).innerText = input[indexLetter-1];
        } else if (hintWord[indexLetter-1] == "O") {
            document.getElementById(boxToDisplay).classList.add("ok");
            document.getElementById(boxToDisplay).innerText = input[indexLetter-1];
        } else {
            document.getElementById(boxToDisplay).innerText = input[indexLetter-1];
        }
    }
}

function gameEnd() {
    gameWord = undefined;
    playerTryNumber = undefined;
}

document
    .getElementById("startGameButton")
    .addEventListener("click", function() {
        document.getElementById("startButton").classList.add("hidden");
        document.getElementById("tableau").classList.remove("hidden");
        document.getElementById("wordInput").classList.remove("hidden");
        document.getElementById("numberOfTryDiv").classList.remove("hidden");
        document.getElementById("inputButton").classList.remove("hidden");
        document.getElementById("wordInput").classList.add("wordInput");
        document.getElementById("numberOfTryDiv").classList.add("numberOfTryDiv");
        startGame();
        alert(gameWord);
    });

document
    .getElementById("tryWordButton")
    .addEventListener("click", function() {
        input = document.getElementById("word").value;
        //alert(input);
        tryWord(input);
        if (short != true) {displayHintWord(hintWord);} // a déplacer dans la suite de fct tryWord ensuite
    });