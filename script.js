let turn = true;

const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');

const gameScreen = document.querySelector('.game-board');

const cells = document.querySelectorAll('.cell');

const player1Edit = document.getElementById('player-1-edit');
const player1Name = document.querySelector('.player-1-name');
player1Edit.addEventListener('click', ()=>{
    let p1Name = prompt('Player 1 name: ');
    player1Name.textContent = p1Name;
});

const player2Edit = document.getElementById('player-2-edit');
const player2Name = document.querySelector('.player-2-name');
player2Edit.addEventListener('click', ()=>{
    let p2Name = prompt('Player 2 name: ');
    player2Name.textContent = p2Name;
});

resetButton.addEventListener('click',()=>{
    gameBoard.resetBoard();
    // cells.forEach(cell=>{
    //     cell.removeChild('img');
    // })
})

const WIN_COMBOS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

cells.forEach(cell=> {
    cell.addEventListener("click",(e)=>{
        // const markedCell = e.target;
        const cellIndex = e.target.dataset.index;
        console.log(e.target);
        if(!(e.target.classList.contains('marked'))){
            e.target.classList.add('marked');
            console.log('marked')
            playRound(cellIndex);
        }
    })
})

class Cell {
    constructor(cellNo, mark = '', playerName = '', isMarked = false, isDisplayed = false) {
        this.cellNo = cellNo;
        this.mark = mark;
        this.playerName = playerName;
        this.isMarked = isMarked;
        this.isDisplayed = isDisplayed;   
    }
}

const gameBoard = (function () {

    let board = [];
    let columns = 3;
    let rows = 3;

    for (let i = 0; i < rows; i++) {
        board[i] = [];

        for (let j = 0; j < columns; j++) {
            board[i].push(new Cell(i * columns + j))
        }
    }

    const markCell = (cellNo, player) => {

        let chosenCell = board.flat().find(cell => cell.cellNo === parseInt(cellNo));
        
        chosenCell.isMarked = true;
        chosenCell.mark = player.mark;
        chosenCell.playerName = player.playerName;         
    }

    const getMarkedCells = (newBoard, player) => {
        let markedCells = [];
        newBoard.forEach(cell=>{
            if(cell.isMarked && player.mark === cell.mark){
                markedCells.push(cell.cellNo);
            }
        })
        return markedCells;
    }

    const getBoard = () => board;

    const resetBoard = ()=> {
        board = [];
    }

    return { getBoard, markCell, getMarkedCells, resetBoard };
})();

const gameController = (function () {

    const players = [
        { playerName: '', mark: 'X' },
        { playerName: '', mark: 'O' }];

    let currentPlayer = players[0];

    const switchTurn = () => {
        if (currentPlayer === players[0]) {
            currentPlayer = players[1];
        }
        else {
            currentPlayer = players[0];
        }
    }

    const getCurrentPlayer = () => currentPlayer;

    const setPlayersName = ()=>{
        players[0].playerName = player1Name.textContent;
        players[1].playerName = player2Name.textContent;
    }

    return { getCurrentPlayer, setPlayersName, switchTurn };

})();


const displayController = (function(){

    const displayBoard = function(currentPlayer, newBoard, cells){

        cells.forEach(cell=>{
            
            let cellIndex = cell.dataset.index

            if( newBoard[cellIndex].isMarked 
                && newBoard[cellIndex].isDisplayed === false ){

                newBoard[cellIndex].isDisplayed = true;
                let newMarkedCell = document.createElement('img');

                if(currentPlayer.mark === 'X'){
                    newMarkedCell.src = './images/x-mark.png'
                }
                else {
                    newMarkedCell.src = './images/o-mark.png'
                }

                cell.appendChild(newMarkedCell);
                return;
            }
        })
    }

    return {displayBoard}

})();


function playRound(cellIndex){

    gameController.setPlayersName();

    let currentPlayer = gameController.getCurrentPlayer();

    gameBoard.markCell(cellIndex, currentPlayer);

    let newBoard = gameBoard.getBoard().flat();

    let newMarkedCells = gameBoard.getMarkedCells(newBoard, currentPlayer);

    console.log(newMarkedCells);

    displayController.displayBoard(currentPlayer, newBoard , cells );

    checkWin(currentPlayer, newMarkedCells);

    gameController.switchTurn();

}


function checkWin(player, markedCells){

    let winCondition = WIN_COMBOS.some(comb=> comb.every(number=> markedCells.includes(number)));

    if(winCondition){
        console.log(`${player.playerName} WINS`);
        gameOver();
    }
}

function gameOver(){
    //
}







