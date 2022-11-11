const player = (type) => {
    return {type};
};

const player1 = player('x');
const player2 = player('o');

const gameBoard = (() => {
    let gamearray = [
        ['','',''],
        ['','',''],
        ['','','']
    ];

    function markSpot(playertype, space){
        if (_checkSpot(space)){
            gamearray[space[0]][space[1]] = playertype;
            updateScreen();
        }
    }

    function _checkSpot(space){
        if(gamearray[space[0]][space[1]] == ''){
            return true;
        }else return false;
    }
    function clearScreen(){
        for (let temparray in gamearray){
            for (let subarray in gamearray[temparray] ){
                gamearray[temparray][subarray] = ''
                let tempElement = document.getElementById(`${temparray}${subarray}`);
                tempElement.innerHTML = gamearray[temparray][subarray];
            }
        }
        document.querySelector("#announcer").textContent = "Play!";
        
    }
    function updateScreen(){
        let drawcounter=0;
        for (let temparray in gamearray){
            for (let subarray in gamearray[temparray] ){
    
                let tempElement = document.getElementById(`${temparray}${subarray}`);
                tempElement.innerHTML = gamearray[temparray][subarray];
                if(gamearray[temparray][subarray] != ''){
                    drawcounter++;
                    if(drawcounter == 9){
                        document.getElementById("announcer").textContent = "DRAW";
                        
                    }
                }
        }
    }
}

    return {
        markSpot: markSpot,
        clearScreen: clearScreen
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
const allBoxes = document.querySelectorAll(".box")
let counter = 1;
function evAction(){
    let tarray = Array.from(String(this.id),Number);
    if(counter%2 == 0){
        gameBoard.markSpot(player1.type, tarray);
        counter++;
    }else  {
        gameBoard.markSpot(player2.type, tarray);
        counter++;
    }
}
allBoxes.forEach((box) => {
    box.addEventListener("click",evAction);
});
document.querySelector("#restart").addEventListener("click",gameBoard.clearScreen);
