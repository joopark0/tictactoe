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
    const boxgrid = document.querySelectorAll(".box")

    function markSpot(playertype, space){
        if (_checkSpot(space)){
            gamearray[space[0]][space[1]] = playertype;
            _updateScreen();
            return true;
        }else return false;
    }
    function _executeWin(winningplayer){
        document.querySelector("#announcer").textContent=`'${winningplayer}' wins!`;
        boxgrid.forEach((box) => {
            box.removeEventListener("click",evAction);
        });
    }
    function _executeDraw(){
        document.querySelector("#announcer").textContent="Draw!"
        boxgrid.forEach((box) => {
            box.removeEventListener("click",evAction);
        });
    }
    function _getColumn(inarray, columnnum){
        return inarray.map(row => row[columnnum]);
    }
    function winCheck(){
        if(gamearray[0].toString() == 'x,x,x' || gamearray[0].toString() == 'o,o,o'){
            _executeWin(gamearray[0][0].toString());
        }else if(gamearray[1].toString() == 'x,x,x' || gamearray[1].toString() == 'o,o,o'){
            _executeWin(gamearray[1][0].toString());
        }else if(gamearray[2].toString() == 'x,x,x' || gamearray[2].toString() == 'o,o,o'){
            _executeWin(gamearray[2][0].toString());
        }else if(_getColumn(gamearray,0) == 'x,x,x' || _getColumn(gamearray,0) == 'o,o,o'){
            _executeWin(gamearray[0][0].toString());
        }else if(_getColumn(gamearray,1) == 'x,x,x' || _getColumn(gamearray,1) == 'o,o,o'){
            _executeWin(gamearray[0][1].toString());
        }else if(_getColumn(gamearray,2)== 'x,x,x' || _getColumn(gamearray,2)== 'o,o,o'){
            _executeWin(gamearray[0][2].toString());
        }else if((gamearray[0][0] == 'x' && gamearray[1][1] == 'x' && gamearray[2][2] == 'x') || (gamearray[0][0] == 'o' && gamearray[1][1] == 'o' && gamearray[2][2] == 'o')){
            _executeWin(gamearray[0][0].toString());
        }else if((gamearray[0][2] == 'x' && gamearray[1][1] == 'x' && gamearray[2][0] == 'x') || (gamearray[0][2] == '0' && gamearray[1][1] == '0' && gamearray[2][0] == '0')){
            _executeWin(gamearray[0][2].toString());
        }else if(!gamearray.some(e => e.includes(''))){
            _executeDraw();
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
        boxgrid.forEach((box) => {
            box.addEventListener("click",evAction);
        });

    }
    function _updateScreen(){
        let drawcounter=0;
        for (let temparray in gamearray){
            for (let subarray in gamearray[temparray] ){
                let tempElement = document.getElementById(`${temparray}${subarray}`);
                tempElement.innerHTML = gamearray[temparray][subarray];
            }
        }
    }

    return {
        markSpot: markSpot,
        clearScreen: clearScreen,
        winCheck: winCheck
    }
})();

const allBoxes = document.querySelectorAll(".box")
let counter = 1;
function evAction(){
    let tarray = Array.from(String(this.id),Number);
    if(counter%2 == 0){
        if(!gameBoard.markSpot(player1.type, tarray)){
            return;
        }
        counter++;
        document.querySelector("#announcer").textContent = "Player 'O' turn";
        gameBoard.winCheck();
    }else  {
        if(!gameBoard.markSpot(player2.type, tarray)){
            return;
        }else
        gameBoard.markSpot(player2.type, tarray);
        counter++;
        document.querySelector("#announcer").textContent = "Player 'X' turn";
        gameBoard.winCheck();
    }
}



allBoxes.forEach((box) => {
    box.addEventListener("click",evAction);
});
document.querySelector("#restart").addEventListener("click",gameBoard.clearScreen);
