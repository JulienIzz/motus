const dicoRaw = ["julien","pardon","banane","patate"];
const dico = dicoRaw.map(element => {return element.toUpperCase();});
const maxNumberOfTry = 5;
var input;
var wordToFind;
var numberOfTry;
var foundLetters = "------";

'use strict';

//
// Game's logic
//

// Function to modify a string without creating a new one
String.prototype.replaceAt = function (i, char) {
    return this.substring(0, i) + char + this.substring(i + char.length);
}

// Generates an int between 0 and max
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Generates a word from the array "dicoRaw"
function generateWord() {
    return dico[getRandomInt(dico.length)];
}

// Generates a word for the game and sets the count of try to 0 
// also showing grid and play components, hiding start game button
function startGame() {
    numberOfTry = 0;
    wordToFind = generateWord();
    document.getElementById("startButton").classList.add("hidden");
    document.getElementById("tableau").classList.remove("hidden");
    document.getElementById("wordInput").classList.remove("hidden");
    document.getElementById("numberOfTryDiv").classList.remove("hidden");
    document.getElementById("inputButton").classList.remove("hidden");
    document.getElementById("wordInput").classList.add("wordInput");
    document.getElementById("numberOfTryDiv").classList.add("numberOfTryDiv");
    document.getElementById("word").focus();
    document.getElementById("word").select();
}

// Verifies the length of the word tried and go on if it's 6 letters long
function tryWord(wordToVerify) {
    if (wordToVerify.length != wordToFind.length) {
        alert("Votre mot doit faire " + wordToFind.length + " lettres.");
    } else {
    verifyWord(wordToVerify);
    }
}

// Checks if the word is right, if yes, it's a win, if no then :
// If last try, stop the game and display the hintword
// If not, display the hintword
// If error, instructions to reload the page
function verifyWord(wordToVerify) {
    numberOfTry++;
    document.getElementById("numberOfTry").innerText = maxNumberOfTry - numberOfTry;
    if (wordToVerify === wordToFind) {
        winByInput();
    } else if (wordToVerify != wordToFind && numberOfTry === 5) {
        displayHintWord(wordToVerify);
        document.getElementById("numberOfTryText").innerText = "Vous avez perdu ! Le mot à deviner était " + wordToFind;
        gameEnd();
    } else if (wordToVerify != wordToFind) {
        displayHintWord(wordToVerify);
    }
}

function winByInput() {
    var rowToDisplay = "L" + numberOfTry;
    for (let indexLetter = 1; indexLetter < 7; indexLetter++) {
        var boxToDisplay = rowToDisplay + indexLetter; // Create the index for the box corresponding in HTML
        document.getElementById(boxToDisplay).classList.add("ok");
        document.getElementById(boxToDisplay).innerText = wordToFind[indexLetter - 1];
    }
    triggerWin();
}

function triggerWin() {
    document.getElementById("numberOfTryText").innerText = "Vous avez gagné !";
    gameEnd();
}

// Changes the color of the boxes to fit the letter place in the game word
// No change : not in the game word
// Yellow : in the game word but wrong place
// Red : In the game word an well placed
function displayHintWord (wordToVerify) {
    var rowToDisplay = "L" + numberOfTry; // Create the index for the row corresponding in HTML
    fillBoxes(wordToVerify, rowToDisplay);
}

// Function dedicated to filling the boxes with the letters and colors
function fillBoxes(wordToVerify, rowToDisplay) {
    for (let indexLetter = 1; indexLetter < 7; indexLetter++) {
        var boxToDisplay = rowToDisplay + indexLetter; // Create the index for the box corresponding in HTML
        if (wordToVerify[indexLetter - 1] === wordToFind[indexLetter - 1]) {
            document.getElementById(boxToDisplay).classList.add("ok");
            document.getElementById(boxToDisplay).innerText = wordToVerify[indexLetter - 1];
            foundLetters = foundLetters.replaceAt(indexLetter - 1, wordToVerify[indexLetter - 1]);
        } else if (wordToFind.includes(wordToVerify[indexLetter - 1])) {
            document.getElementById(boxToDisplay).classList.add("oknotplaced");
            document.getElementById(boxToDisplay).innerText = wordToVerify[indexLetter - 1];
        } else {
            document.getElementById(boxToDisplay).innerText = wordToVerify[indexLetter - 1];
        }
    }
    // Checking if all the letters have been found, if yes (and not last try), triggers the win and write the word with red boxes
    // If no, shows the letter found without color
    if (numberOfTry < 5) {
        checkFoundLetters();
    }
}

// Triggers if not last try to show the already found letters in the row to fill
function checkFoundLetters() {
    if (foundLetters === wordToFind) {
        fillNextRow(foundLetters);
        var rowToDisplayNext = "L" + (numberOfTry + 1);
        for (let indexLetter = 1; indexLetter < 7; indexLetter++) {
            document.getElementById(rowToDisplayNext + indexLetter).classList.add("ok"); // Fills the row in red for the win
        }
        triggerWin();
    } else {
        fillNextRow(foundLetters);
    }
}

// Function to write found letters in next row
function fillNextRow(foundLetters) {
    for (let indexLetter = 1; indexLetter < 7; indexLetter++) {
        if (foundLetters[indexLetter-1] != "-") {
            var rowToDisplayNext = "L" + (numberOfTry + 1);
            document.getElementById(rowToDisplayNext + indexLetter).innerText = foundLetters[indexLetter - 1];
        }
    }
}

// Stop current game and offer to restart
function gameEnd() {
    wordToFind = undefined;
    numberOfTry = undefined;
    foundLetters = "------"
    document.getElementById("restartButton").classList.remove("hidden");
    document.getElementById("inputButton").classList.add("hidden");
    document.getElementById("wordInput").classList.remove("wordInput");
    document.getElementById("wordInput").classList.add("hidden");
}

//
// CTA and events listening
//

// Start game button and its interactions, showing grid and play components, hiding start game button
document
    .getElementById("startGameButton")
    .addEventListener("click", function() {
        startGame();
});

// Triggers all the necessary functions to try a word by clicking the button
document
    .getElementById("tryWordButton")
    .addEventListener("click", function() {
        input = document.getElementById("word").value.toUpperCase(); // Get the input frome textarea
        tryWord(input); // Launch the functions to verify the word, and trigger the win, the loss, or the display of the word in the grid
        document.getElementById("word").value = ""; // Clear textarea after playing
        document.getElementById("word").focus(); // Select textarea after playing
        document.getElementById("word").select(); // Select textarea after playing
});

// Triggers all the necessary functions to try a word by pressing enter anywhere on the page
document
    .getElementById("body")
    .addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        input = document.getElementById("word").value.toUpperCase(); // Get the input frome textarea
        tryWord(input); // Launch the functions to verify the word, and trigger the win, the loss, or the display of the word in the grid
        document.getElementById("word").value = ""; // Clear textarea after playing
        document.getElementById("word").focus(); // Select textarea after playing
        document.getElementById("word").select(); // Select textarea after playing
    }
});

// Allows to restart the game by reloading the page
document
    .getElementById("restartButton")
    .addEventListener("click", function() {
        location.reload();
        startGame();
});

// A l'avenir on peut penser rajouter du son quand on gagne, un ptit gif, etc.
// Next steps : 
// Clean le code
// Ajouter la gestion de mots de longueur N
// Animations et design
// Connexion API pour le dico
// Implanter la vérif de dictionnaire à l'input

// Mes boutons ont changé de style ???
// Regrouper certains trucs avec getElementsByClassName