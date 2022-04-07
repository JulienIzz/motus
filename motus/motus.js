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

// Test
// Test3
// Test 2

 console.log("Git");
 
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
    for (let indexPlayerWord = 0 ; indexPlayerWord < gameWord.length - 1 ; indexPlayerWord++) {
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

// Idée pour quand il y aura une lettre qui apparait 2 fois dans le mot à tester, et une fois dans le mot référence :
// On fait un mot "tampon" du mot référence, duquel on pop-off chaque lettre comparée
// Attention ça va emêcher le includes() => A méditer

function gameEnd() {
    gameWord = undefined;
    playerTryNumber = undefined;
}