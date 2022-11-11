const player = (type) => {
    return {type};
};

const player1 = player('x');
const player2 = player('o');
const gameBoard = (() => {
    let gamearray = [
        ['x','o','x'],
        ['o','x','o'],
        ['x','o','x']];
    
    function markSpot(playertype, space){
        if (_checkSpot){

        }
    }

    function _checkSpot(space){
        if(gamearray[space[0]][space[1]] == ''){
            return true;
        }else return false;
    }

    function updateScreen(){
        for (let temparray in gamearray){
            for (let subarray in gamearray[temparray] ){
                console.log(temparray, subarray);
    
                let tempElement = document.getElementById(`${temparray}${subarray}`);
                tempElement.innerHTML = gamearray[temparray][subarray];
            }
        }
    }

    return {
        markSpot: markSpot,
        updateScreen: updateScreen
    }
})();

/*function updateScreen(inArray){

    for (let temparray in inArray){
        for (let subarray in inArray[temparray] ){
            console.log(temparray, subarray);

            let tempElement = document.getElementById(`${temparray}${subarray}`);
            tempElement.innerHTML = inArray[temparray][subarray];
        }
    }
}
updateScreen(gameBoard.gamearray);
*/
gameBoard.updateScreen();
const testarray = [0,1];
gameBoard.markSpot(player2.type, testarray);