let turn = true;

const playButton = document.getElementById('play-button');

playButton.addEventListener('click', playRound);

class Cell {
    constructor(cellNo, mark = '', playerName = '', isMarked = false) {
        this.cellNo = cellNo;
        this.mark = mark;
        this.playerName = playerName;
        this.isMarked = isMarked;
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

        let chosenCell = board.flat().find(cell => cell.cellNo === cellNo);

        chosenCell.isMarked = true;
        chosenCell.mark = player.mark;
        chosenCell.playerName = player.playerName;

        console.log(chosenCell);

        updateBoard(cellNo, chosenCell, board);

    }

    const getBoard = () => board;

    return { getBoard, markCell };
})();

const gameController = (function (p1_name = 'AhmedKh', p2_name = "AI_Bot") {

    const players = [
        { playerName: p1_name, mark: 'X' },
        { playerName: p2_name, mark: 'O' }];

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

    return { getCurrentPlayer, switchTurn };

})();


function playRound() {

    const currentPlayer = gameController.getCurrentPlayer();

    gameBoard.markCell(1, currentPlayer);

    console.log(gameBoard.getBoard());

    gameController.switchTurn();

}


function updateBoard(cellNo, newCell, board){

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if(board[i][j].cellNo === cellNo){
                board[i][j] = newCell;
                return;
            }
        }
    }
}



