const gameBoard = (function(){

    let board = [];
    let columns = 3;
    let rows = 3;


    for (let i = 0; i < rows; i++) {

        board[i] = [];

        for (let j = 0; j < columns; j++) {
            board[i].push(createCell({i,j}))
        }
        
    }
})();


const createCell = function (rowNo,columnNo,mark){
    
}