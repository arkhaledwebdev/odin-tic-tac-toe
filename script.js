const gameBoard = (function () {

    let board = [];
    let columns = 3;
    let rows = 3;


    for (let i = 0; i < rows; i++) {

        board[i] = [];

        for (let j = 0; j < columns; j++) {
            board[i].push(createCell(i * columns + j))
        }

    }

    const markCell = (cellNo, player) => {

        console.log(board.find(c => c.cellNo === cellNo));

    }

    const getBoard = () => board;

    return { getBoard, markCell };
})();

const gameController = (function (p1_name, p2_name) {

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

    let board = gameBoard.getBoard();

    const currentPlayer = gameController.getCurrentPlayer();

    // emulate p1 move

    gameBoard.markCell(4, currentPlayer);

    console.log(board);

    gameController.switchTurn();

    gameBoard.markCell(2, currentPlayer);

    console.log(board);

}

function createCell(cellNo) {

    let isMarked = false;

    let mark = '';

    let player = '';

    const setMark = (mark, player) => {
        this.isMarked = true;
        this.mark = mark;
        this.player = player;
    };

    const getMark = () => mark;

    const getPlayer = () => player;

    return { cellNo, isMarked, setMark, getMark, getPlayer };
}

playRound();



