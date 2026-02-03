"use strict";

let oGameData = {};


oGameData.initGlobalObject = function() {

    oGameData.gameField = Array('', '', '', '', '', '', '', '', '');
    

    oGameData.playerOne = "X";

    oGameData.playerTwo = "O";

    oGameData.currentPlayer = "";

    oGameData.nickNamePlayerOne = "";

    oGameData.nickNamePlayerTwo = "";

    oGameData.colorPlayerOne = "";

    oGameData.colorPlayerTwo = "";

    oGameData.timerEnabled = false;

    oGameData.timerId = null;

    oGameData.timerCount = 5;

}

let name1 = document.getElementById("nick1");
let name2 = document.getElementById("nick2");
let color1 = document.getElementById("color1");
let color2 = document.getElementById("color2");
let errorM = document.getElementById("errorMsg");


oGameData.checkForGameOver = function() {
    let winner = 0;

    if(oGameData.checkHorizontal() === 1 || oGameData.checkVertical() === 1 || oGameData.checkDiagonalLeftToRight() === 1 || oGameData.checkDiagonalRightToLeft() === 1){
        winner = 1;
    }
    if(oGameData.checkHorizontal() === 2 || oGameData.checkVertical() === 2 || oGameData.checkDiagonalLeftToRight() === 2 || oGameData.checkDiagonalRightToLeft() === 2){
        winner = 2;
    }

    if(winner === 0) {
        winner = oGameData.checkForDraw();
    }

    return winner;
}

oGameData.checkHorizontal = function(){

    let xAmount = 0, oAmount = 0;
    
    for(let i = 0; i < 10; i+=3){
        for(let j = 0; j < 3; j++){
            if(oGameData.gameField[i] === 'X'){
                if(oGameData.gameField[i+j] === 'X'){
                    xAmount++;
                }
            }
            if(oGameData.gameField[i] === 'O'){
                if(oGameData.gameField[i+j] === 'O'){
                    oAmount++;
                }
            }

        }
        if(xAmount < 3){
            xAmount = 0;
        }
        else{
            return 1;
        }

        if(oAmount < 3){
            oAmount = 0;
        }
        else{
            return 2;       
        }
    }
    return 0;
}

oGameData.checkVertical = function(){
    let xAmount = 0, oAmount = 0;
    
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 7; j+=3){
            if(oGameData.gameField[i] === 'X'){
                if(oGameData.gameField[i+j] === 'X'){
                    xAmount++;
                }
            }
            if(oGameData.gameField[i] === 'O'){
                if(oGameData.gameField[i+j] === 'O'){
                    oAmount++;
                }   
            }
        }

        if(xAmount < 3){
            xAmount = 0;
        }
        else{
            return 1;
        }

        if(oAmount < 3){
            oAmount = 0;
        }
        else{
            return 2;       
        }
    }
    return 0;
}

oGameData.checkDiagonalLeftToRight = function(){
    
    if(oGameData.gameField[0] === 'X' && oGameData.gameField[4] === 'X' && oGameData.gameField[8] === 'X'){
        return 1;
    }
    if(oGameData.gameField[0] === 'O' && oGameData.gameField[4] === 'O' && oGameData.gameField[8] === 'O'){
        return 2;
    }
    return 0;
}

oGameData.checkDiagonalRightToLeft = function(){
    if(oGameData.gameField[2] === 'X' && oGameData.gameField[4] === 'X' && oGameData.gameField[6] === 'X'){
        return 1;
    }
    if(oGameData.gameField[2] === 'O' && oGameData.gameField[4] === 'O' && oGameData.gameField[6] === 'O'){
        return 2;
    }
    return 0;
}

oGameData.checkForDraw = function(){
    let test = 0;

    for(let i = 0; i < 9; i++){
        if(oGameData.gameField[i] === ''){
            test++;
        }
    }

    if(test === 0){
        return 3;
    }
    return 0;
}

window.addEventListener("load", function(e){
    oGameData.initGlobalObject();
    document.getElementById("game-area").classList.add("d-none");
    let startKnapp = document.getElementById("newGame");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "timer";

    let label = document.createElement("label");
    label.htmlFor = "timer";

    let labelText = document.createTextNode("Vill du begränsa tiden till 5 sekunder per drag?");

    label.appendChild(labelText);

    let div = document.createElement("div");

    div.classList.add("check");

    div.appendChild(label);
    div.appendChild(checkbox);

    let divInForm = document.querySelector("#div-in-form");

    divInForm.appendChild(div);
    
    let timerDiv = document.createElement("div");

    timerDiv.classList.add("d-none");
    
    timerDiv.setAttribute("id", "timerDiv");

    let timerText = document.createTextNode("Tid kvar: " + oGameData.timerCount);

    timerDiv.appendChild(timerText);

    let main = document.querySelector("main");

    let spelPlan = document.querySelector("#game-area");

    main.insertBefore(timerDiv, spelPlan);

    checkbox.addEventListener("change", ()=>{
        if(oGameData.timerEnabled === false){
            console.log("timer på");
            oGameData.timerEnabled = true;
        }
        else if(oGameData.timerEnabled === true){
            console.log("timer av");
            oGameData.timerEnabled = false;
        }  
    });

    startKnapp.addEventListener("click", ()=>{
        oGameData.validateForm();
    });
});


oGameData.validateForm = function(){
    let errors = 0;

    try{
        if(name1.value === name2.value){
            throw new Error ("Namnen får ej vara identiska.");
        }

        if(name1.value.length < 5 || name2.value.length < 5){
            throw new Error ("Namn måste vara längre än 5 tecken.");
        }

        if(color1.value === color2.value){
            throw new Error ("Färgerna får ej vara identiska.");
        }
        
        if(color1.value === "#000000" || color2.value === "#000000"){
            throw new Error("Färg får ej vara svart.");
        }

        if(color1.value === "#FFFFFF" || color2.value === "#FFFFFF"){
            throw new Error("Färg får ej vara vit.");
        }
    }
    catch (e){
        errorM.textContent = e.message;

        errors++;
    }
    if(errors === 0){
        oGameData.initiateGame();
    }
}

oGameData.initiateGame = function(){
    document.getElementById("game-area").classList.remove("d-none");
    document.querySelector("form").classList.add("d-none");
    errorM.textContent = "";

    oGameData.nickNamePlayerOne = name1.value;
    oGameData.nickNamePlayerTwo = name2.value;

    oGameData.colorPlayerOne = color1.value;
    oGameData.colorPlayerTwo = color2.value;

    let spelplan = document.querySelectorAll("td");
    for(let i = 0; i < spelplan.length; i++){
        spelplan[i].textContent = '';
        spelplan[i].style.backgroundColor = "white";
    }

    let playerChar, playerName;

    let spel = document.querySelector(".jumbotron h1");

    let random = Math.random();

    if(random < 0.5){
        playerChar = oGameData.playerOne;
        playerName = oGameData.nickNamePlayerOne;
        oGameData.currentPlayer = oGameData.playerOne;
        spel.textContent = "Aktuell spelare är " + playerName + " (" + playerChar + ")";
        console.log("p1");
    }
    if(random >= 0.5){
        playerChar = oGameData.playerTwo;
        playerName = oGameData.nickNamePlayerTwo;
        oGameData.currentPlayer = oGameData.playerTwo;
        spel.textContent = "Aktuell spelare är " + playerName + " (" + playerChar + ")";
        console.log("p2");
    }


    let timerText = document.querySelector("#timerDiv").firstChild;

    if(oGameData.timerEnabled)
    {
        document.querySelector("#timerDiv").classList.remove("d-none");
        oGameData.timerId = setInterval(()=>{
            console.log(oGameData.timerCount);
            timerText.nodeValue = "Tid kvar: " + oGameData.timerCount;

            if(oGameData.timerCount === 0){
            console.log("tiden ute!");

                if(oGameData.currentPlayer == oGameData.playerOne){   
                    oGameData.currentPlayer = oGameData.playerTwo;
                    spel.textContent = "Aktuell spelare är " + oGameData.nickNamePlayerTwo + " (" + oGameData.currentPlayer + ")";
                }
                else if(oGameData.currentPlayer == oGameData.playerTwo){
                    oGameData.currentPlayer = oGameData.playerOne;
                    spel.textContent = "Aktuell spelare är " + oGameData.nickNamePlayerOne + " (" + oGameData.playerOne + ")";
                }
                oGameData.timerCount = 5;
            }
            else{
                oGameData.timerCount--;
            }
            
        
        }, 1000);
    }

    let table = document.querySelector("table");

    table.addEventListener("click", oGameData.executeMove);
} 

oGameData.executeMove = function(e){
    let spel = document.querySelector(".jumbotron h1");
    let currentTD = null;

    if(e.target.nodeName === 'TD') { // från Föreläsning 8
        currentTD = e.target.getAttribute('data-id');
        
        if(oGameData.gameField[currentTD] == ''){

            if(oGameData.currentPlayer == oGameData.playerOne){   
                oGameData.gameField[currentTD] = oGameData.currentPlayer;
                e.target.style.backgroundColor = oGameData.colorPlayerOne;
                e.target.textContent = oGameData.currentPlayer;
                oGameData.currentPlayer = oGameData.playerTwo;
                
                spel.textContent = "Aktuell spelare är " + oGameData.nickNamePlayerTwo + " (" + oGameData.currentPlayer + ")";
                oGameData.timerCount = 5;
            }
            else if(oGameData.currentPlayer == oGameData.playerTwo){
                oGameData.gameField[currentTD] = oGameData.currentPlayer;
                e.target.style.backgroundColor = oGameData.colorPlayerTwo;
                e.target.textContent = oGameData.currentPlayer;
                oGameData.currentPlayer = oGameData.playerOne;

                spel.textContent = "Aktuell spelare är " + oGameData.nickNamePlayerOne + " (" + oGameData.playerOne + ")";
                oGameData.timerCount = 5;
            }
            let winCheck = oGameData.checkForGameOver();
            
            

            if(winCheck > 0){
                oGameData.timerId = clearInterval(oGameData.timerId);
                document.querySelector("#timerDiv").classList.add("d-none");
                let table = document.querySelector("table"); 
                table.removeEventListener("click", oGameData.executeMove);

                document.getElementById("game-area").classList.add("d-none");
                document.querySelector("form").classList.remove("d-none");
            
                if(winCheck === 1){
                    // X winner
                    //spel.textContent = "Vinnare är " + oGameData.nickNamePlayerOne + " (" + oGameData.playerOne + ")! " + "Spela igen?";
                    spel.textContent = "Vinnare är " + oGameData.playerOne + "! " + "Spela igen?";
                    }
                else if(winCheck === 2){
                    // O winner
                    //spel.textContent = "Vinnare är " + oGameData.nickNamePlayerTwo + " (" + oGameData.playerTwo + ")! " + "Spela igen?";
                    spel.textContent = "Vinnare är " + oGameData.playerTwo + "! " + "Spela igen?";
                }
                else if(winCheck === 3){
                    // Oavgjort
                    spel.textContent = "Det blev oavgjort! " + "Spela igen?";
                }

                oGameData.initGlobalObject();
                //document.querySelector('input[type="checkbox"]').checked = false;
                if(document.querySelector('input[type="checkbox"]').checked == true){
                    oGameData.timerEnabled = true;
                }
            }
            else{
                oGameData.timerCount = 5;
            }
        }
    }
}