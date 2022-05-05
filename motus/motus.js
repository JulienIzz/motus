const dicoRaw = ["bleu","super","autre","bizarre","difficile","drôle","étrange","facile","grave","impossible","jeune","juste","libre","malade","même","pauvre","possible","propre","rouge","sale","simple","tranquille","triste","vide","bonne","toute","doux","français","gros","heureux","mauvais","sérieux","vieux","ancien","beau","blanc","certain","chaud","cher","clair","content","dernier","désolé","différent","droit","entier","fort","froid","gentil","grand","haut","humain","important","joli","léger","long","meilleur","mort","noir","nouveau","pareil","petit","plein","premier","prêt","prochain","quoi","seul","tout","vert","vivant","aide","chef","enfant","garde","gauche","geste","gosse","livre","merci","mort","ombre","part","poche","professeur","tour","fois","madame","paix","voix","affaire","année","arme","armée","attention","balle","boîte","bouche","carte","cause","chambre","chance","chose","classe","confiance","couleur","cour","cuisine","dame","dent","droite","école","église","envie","épaule","époque","équipe","erreur","espèce","face","façon","faim","famille","faute","femme","fenêtre","fête","fille","fleur","force","forme","guerre","gueule","habitude","heure","histoire","idée","image","impression","jambe","joie","journée","langue","lettre","lèvre","ligne","lumière","main","maison","maman","manière","marche","merde","mère","minute","musique","nuit","odeur","oreille","parole","partie","peau","peine","pensée","personne","peur","photo","pièce","pierre","place","police","porte","présence","prison","putain","question","raison","réponse","robe","route","salle","scène","seconde","sécurité","semaine","situation","soeur","soirée","sorte","suite","table","terre","tête","vérité","ville","voiture","avis","bois","bras","choix","corps","cours","gars","mois","pays","prix","propos","sens","temps","travers","vieux","accord","agent","amour","appel","arbre","argent","avenir","avion","bateau","bébé","besoin","bonheur","bonjour","bord","boulot","bout","bruit","bureau","café","camp","capitaine","chat","chemin","chéri","cheval","cheveu","chien","ciel","client","cœur","coin","colonel","compte","copain","côté","coup","courant","début","départ","dieu","docteur","doigt","dollar","doute","droit","effet","endroit","ennemi","escalier","esprit","état","être","exemple","fait","film","flic","fond","français","frère","front","garçon","général","genre","goût","gouvernement","grand","groupe","haut","homme","honneur","hôtel","instant","intérêt","intérieur","jardin","jour","journal","lieu","long","maître","mari","mariage","matin","médecin","mètre","milieu","million","moment","monde","monsieur","mouvement","moyen","noir","nouveau","numéro","oeil","oiseau","oncle","ordre","papa","papier","parent","passage","passé","patron","père","petit","peuple","pied","plaisir","plan","point","pouvoir","premier","présent","président","prince","problème","quartier","rapport","regard","reste","retard","retour","rêve","revoir","salut","sang","secret","seigneur","sentiment","service","seul","siècle","signe","silence","soir","soldat","soleil","sourire","souvenir","sujet","téléphone","tout","train","travail","trou","truc","type","vent","ventre","verre","village","visage","voyage","fils","gens","abandonner","accepter","accompagner","acheter","adorer","agir","aider","aimer","ajouter","aller","amener","amuser","annoncer","apercevoir","apparaître","appeler","apporter","apprendre","approcher","arranger","arrêter","arriver","asseoir","assurer","attaquer","atteindre","attendre","avancer","avoir","baisser","battre","boire","bouger","brûler","cacher","calmer","casser","cesser","changer","chanter","charger","chercher","choisir","commencer","comprendre","compter","conduire","connaître","continuer","coucher","couper","courir","couvrir","craindre","crier","croire","danser","décider","découvrir","dégager","demander","descendre","désoler","détester","détruire","devenir","deviner","devoir","dire","disparaître","donner","dormir","échapper","écouter","écrire","éloigner","embrasser","emmener","empêcher","emporter","enlever","entendre","entrer","envoyer","espérer","essayer","être","éviter","excuser","exister","expliquer","faire","falloir","fermer","filer","finir","foutre","frapper","gagner","garder","glisser","habiter","ignorer","imaginer","importer","inquiéter","installer","intéresser","inviter","jeter","jouer","jurer","lâcher","laisser","lancer","lever","lire","maintenir","manger","manquer","marcher","marier","mener","mentir","mettre","monter","montrer","mourir","naître","obliger","occuper","offrir","oser","oublier","ouvrir","paraître","parler","partir","passer","payer","penser","perdre","permettre","plaire","pleurer","porter","poser","pousser","pouvoir","préférer","prendre","préparer","présenter","prévenir","prier","promettre","proposer","protéger","quitter","raconter","ramener","rappeler","recevoir","reconnaître","réfléchir","refuser","regarder","rejoindre","remarquer","remettre","remonter","rencontrer","rendre","rentrer","répéter","répondre","reposer","reprendre","ressembler","rester","retenir","retirer","retourner","retrouver","réussir","réveiller","revenir","rêver","revoir","rire","risquer","rouler","sauter","sauver","savoir","sembler","sentir","séparer","serrer","servir","sortir","souffrir","sourire","souvenir","suffire","suivre","taire","tendre","tenir","tenter","terminer","tirer","tomber","toucher","tourner","traîner","traiter","travailler","traverser","tromper","trouver","tuer","utiliser","valoir","vendre","venir","vivre","voir","voler","vouloir"];
const dico = dicoRaw.map(element => {return element.toUpperCase();});
const maxNumberOfTry = 5;
var input;
var wordToFind;
var numberOfTry;
var foundLetters = "";

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

function initializeLength(wordToFind) {
    for (let rowNumber = 1 ; rowNumber <= maxNumberOfTry ; rowNumber++) {
        var rowToComplete = "L" + rowNumber;
        for (let boxNumber = 1 ; boxNumber <= wordToFind.length; boxNumber++) {
            boxToCreate = rowToComplete + boxNumber;
            var child = document.createElement("div");
            child.id = boxToCreate;
            document.getElementById(rowToComplete).appendChild(child);
            document.getElementById("word").setAttribute("maxlength",wordToFind.length);
        }
    }
    for (let index = 0 ; index < wordToFind.length ; index++) { // Adust the size of the found letters string
        foundLetters += (".");
    }
}

// Generates a word for the game and sets the count of try to 0 
// also showing grid and play components, hiding start game button
function startGame() {
    numberOfTry = 0;
    wordToFind = generateWord();
    initializeLength(wordToFind);
    document.getElementById("startButton").classList.add("hidden");
    document.getElementById("tableau").classList.remove("hidden");
    document.getElementById("wordInput").classList.remove("hidden");
    document.getElementById("numberOfTryDiv").classList.remove("hidden");
    document.getElementById("inputButton").classList.remove("hidden");
    document.getElementById("wordInput").classList.add("wordInput");
    document.getElementById("numberOfTryDiv").classList.add("numberOfTryDiv");
    document.getElementById("word").focus();
    document.getElementById("word").select();
    document.getElementById("word").style.width = document.getElementById("tableau").offsetWidth + "px"; // Set the width of the textinput to match the size of the word
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
    for (let indexLetter = 1; indexLetter <= wordToFind.length; indexLetter++) {
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
    for (let indexLetter = 1; indexLetter <= wordToFind.length; indexLetter++) {
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
        for (let indexLetter = 1; indexLetter <= wordToFind.length; indexLetter++) {
            document.getElementById(rowToDisplayNext + indexLetter).classList.add("ok"); // Fills the row in red for the win
        }
        triggerWin();
    } else {
        fillNextRow(foundLetters);
    }
}

// Function to write found letters in next row
function fillNextRow(foundLetters) {
    for (let indexLetter = 1; indexLetter <= wordToFind.length; indexLetter++) {
        var rowToDisplayNext = "L" + (numberOfTry + 1);
        document.getElementById(rowToDisplayNext + indexLetter).innerText = foundLetters[indexLetter - 1];
    }
}

// Stop current game and offer to restart
function gameEnd() {
    wordToFind = undefined;
    numberOfTry = undefined;
    foundLetters = ""
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
// Clean le code - DONE
// Ajouter la gestion de mots de longueur N - DONE
// Animations et design
// Connexion API pour le dico ?
// Implanter la vérif de dictionnaire à l'input

// Améliorations tech :
// Mes boutons ont changé de style ???
// Regrouper certains trucs avec getElementsByClassName
// Input direct dans la grille