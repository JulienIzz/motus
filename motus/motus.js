const numberOfTry = 5;
const dicoRaw = ["julien","pardon","banane","patate"];
const dico = dicoRaw.map(element => {return element.toUpperCase();});
var gameWord;
var playerTryNumber;
var hintWord = "";
var input;
var displayWord = "------"
var short = false;

'use strict';

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
    playerTryNumber = 0;
    gameWord = generateWord();
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
    if (wordToVerify.length != gameWord.length) {
        alert("Votre mot doit faire " + gameWord.length + " lettres.");
    } else {
    verifyWord(wordToVerify);
    }
}

// Checks if the word is right, if yes, it's a win, if no then :
// If last try, stop the game and display the hintword
// If not, display the hintword
// If error, instructions to reload the page
function verifyWord(wordToVerify) {
    playerTryNumber++;
    document.getElementById("numberOfTry").innerText = numberOfTry - playerTryNumber;
    if (wordToVerify == gameWord) {
        displayHintWord(wordToVerify);
        triggerWin(gameWord);
    } else if (wordToVerify != gameWord && playerTryNumber == 5) {
        displayHintWord(wordToVerify);
        document.getElementById("numberOfTryText").innerText = "Vous avez perdu ! Le mot à deviner était " + gameWord;
        gameEnd();
    } else if (wordToVerify != gameWord && gameWord != undefined) {
        displayHintWord(wordToVerify);
    } else {
        alert("Error, reload the page");
        gameEnd();
    }
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
    var rowToDisplay = "L" + playerTryNumber; // Create the index for the row corresponding in HTML
    fillBoxes(rowToDisplay, wordToVerify);
}

// Function dedicated to filling the boxes with the letters and colors
function fillBoxes(rowToDisplay, wordToVerify) {
    for (let indexLetter = 1; indexLetter < 7; indexLetter++) {
        var boxToDisplay = rowToDisplay + indexLetter; // Create the index for the box corresponding in HTML
        if (wordToVerify[indexLetter - 1] == gameWord[indexLetter - 1]) {
            document.getElementById(boxToDisplay).classList.add("ok");
            document.getElementById(boxToDisplay).innerText = wordToVerify[indexLetter - 1];
            displayWord = displayWord.replaceAt(indexLetter - 1, wordToVerify[indexLetter - 1]);
        } else if (gameWord.includes(wordToVerify[indexLetter - 1])) {
            document.getElementById(boxToDisplay).classList.add("oknotplaced");
            document.getElementById(boxToDisplay).innerText = wordToVerify[indexLetter - 1];
        } else {
            document.getElementById(boxToDisplay).innerText = wordToVerify[indexLetter - 1];
        }
    }
    alert(displayWord);
    // Checking if all the letters have been found, if yes, triggers the win and write the word with red boxes
    // If no, shows the letter found without color
    if (displayWord === gameWord && wordToVerify != gameWord) {
        fillNextRow(displayWord);
        var rowToDisplayNext = "L" + (playerTryNumber + 1);
        for (let indexLetter = 1; indexLetter < 7; indexLetter++) {
            document.getElementById(rowToDisplayNext + indexLetter).classList.add("ok");
        }
        triggerWin(displayWord)
    } else if (playerTryNumber < 5 && wordToVerify != gameWord) {
        fillNextRow(displayWord);
    }
}

// Function to write found letters in next row
function fillNextRow(displayWord) {
    for (let indexLetter = 1; indexLetter < 7; indexLetter++) {
        if (displayWord[indexLetter-1] != "-") {
            var rowToDisplayNext = "L" + (playerTryNumber + 1);
            document.getElementById(rowToDisplayNext + indexLetter).innerText = displayWord[indexLetter - 1];
        }
    }
}

// Stop current game and offer to restart
function gameEnd() {
    gameWord = undefined;
    playerTryNumber = undefined;
    document.getElementById("restartButton").classList.remove("hidden");
    document.getElementById("inputButton").classList.add("hidden");
    document.getElementById("wordInput").classList.remove("wordInput");
    document.getElementById("wordInput").classList.add("hidden");
}


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
        //alert(gameWord); // Shows the secret word
    });


// A l'avenir on peut penser rajouter du son quand on gagne, un ptit gif, etc.
// Ajouter les lettres déjà trouvées dans la grille
// Ajouter à chaque fois la première lettre du mot