"use strict";

let oGameData = {};

oGameData.initGlobalObject = function() {

    oGameData.gameField = Array('', '', '', '', '', '', '', '', '');
    
    
    oGameData.gameField = Array('X', 'X', '', 'X', '', '', '', '', '');
   
    oGameData.playerOne = "X";

    
    oGameData.playerTwo = "O";

    
    oGameData.currentPlayer = "";

    
    oGameData.nickNamePlayerOne = "";

    oGameData.nickNamePlayerTwo = "";

    oGameData.colorPlayerOne = "";

    oGameData.colorPlayerTwo = "";

    oGameData.timerEnabled = false;

    oGameData.timerId = null;

}


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

oGameData.initGlobalObject();

console.log(oGameData.checkForGameOver());
