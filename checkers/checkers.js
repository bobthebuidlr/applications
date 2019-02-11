//Still need to add if you go too far + backwards --> should throw error

var gameBoard = [
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0, 2, 0],
];

var playerTurn = 1;
var player1Tiles = 20;
var player2Tiles = 20;

function checked() {
    document.getElementById("player1").innerHTML = player1Tiles;
    document.getElementById("player2").innerHTML = player2Tiles;
}

function turn() {

    if (playerTurn == 1) {
        document.getElementById("playerTurn").innerHTML = playerTurn;
        console.log(playerTurn);
        playerTurn = 2;
    } else if (playerTurn == 2) {
        document.getElementById("playerTurn").innerHTML = playerTurn;
        console.log(playerTurn);
        playerTurn = 1;
    }
}

function drawBoard() {
    turn();
    checked();
    var element = document.getElementById('table');
    if (element != null) {
        element.parentNode.removeChild(element);
    }

    var div = document.getElementById('main');
    var table = document.createElement('table');
    var i = 1;

    for (row in gameBoard) {
        newRow = document.createElement('tr');

        for (column in gameBoard) {
            newColumn = document.createElement('td');
            newColumn.setAttribute("onclick", "clicked(this)")

            if (i % 2 == 0) {
                newColumn.setAttribute("class", "black");
            }

            if (gameBoard[row][column] == 1) {
                player1Piece = document.createElement('div');
                player1Piece.className = 'player1Piece';
                newColumn.appendChild(player1Piece);

            } else if (gameBoard[row][column] == 2) {
                player2Piece = document.createElement('div');
                player2Piece.className = 'player2Piece';
                newColumn.appendChild(player2Piece);
            }

            newRow.appendChild(newColumn);
            i++;
        }

        table.setAttribute("id", "table");
        table.setAttribute("style", "text-align:center;margin:auto;");
        table.style.borderCollapse = 'collapse';
        table.appendChild(newRow);
        div.appendChild(table);
        i++;
    };

};

function deleteTable() {
    var elem = document.getElementById('table');
    return elem.parentNode.removeChild(elem);
};

var clickedCells = 1;
var position1, position2;
var rowNums = [];
var colNums = [];

function clicked(x) {
    rowNum = x.parentNode.rowIndex;
    colNum = x.cellIndex;
    if (clickedCells == 1) {
        tile1 = gameBoard[rowNum][colNum];
        position1 = x;
        x.setAttribute("class", "selected");
        rowNums[0] = rowNum;
        colNums[0] = colNum;

    } else if (clickedCells == 2) {
        tile2 = gameBoard[rowNum][colNum];
        position2 = x;
        rowNums[1] = rowNum;
        colNums[1] = colNum;

        validTile = x.getAttribute("class");

        if (rowNums[0] == rowNums[1] && colNums[0] == colNums[1]) {
            position1.removeAttribute("class");
            position2.removeAttribute("class");
            clickedCells = 1;
            turn();
            drawBoard();
            return;
        }
        //Check if a checker is being put on an empty black tile
        if ((tile1 == 1 || tile1 == 2) && tile2 == 0 && validTile == "black") {

            if (tile1 == (playerTurn - 1) || tile1 == (playerTurn + 1)) {

                //Check the distance of the move = 1
                if (Math.abs(rowNums[0] - rowNums[1]) == 1 && Math.abs(colNums[0] - colNums[1]) == 1) {

                    //Check whether the stones are moving forward, relative to their position
                    if ((rowNums[0] - rowNums[1]) == 1 && tile1 == 2) {
                        gameBoard[rowNums[0]][colNums[0]] = 0;
                        gameBoard[rowNums[1]][colNums[1]] = tile1;
                    } else if ((rowNums[0] - rowNums[1]) == -1 && tile1 == 1) {
                        gameBoard[rowNums[0]][colNums[0]] = 0;
                        gameBoard[rowNums[1]][colNums[1]] = tile1;
                    } else {
                        alert("You can only move forward...")
                        return;
                    }

                }

                //If distance is too far, but there is another check in between...
                else if (Math.abs(rowNums[0] - rowNums[1]) == 2 && Math.abs(colNums[0] - colNums[1]) == 2) {

                    if (rowNums[0] > rowNums[1]) {
                        rowDir = rowNums[0] - 1;
                    } else {
                        rowDir = rowNums[0] + 1;
                    }

                    if (colNums[0] > colNums[1]) {
                        colDir = colNums[0] - 1;
                    } else {
                        colDir = colNums[0] + 1;
                    }

                    //Check if there is a stone
                    if (gameBoard[rowDir][colDir] == 1 || gameBoard[rowDir][colDir] == 2) {
                        gameBoard[rowNums[0]][colNums[0]] = 0;
                        gameBoard[rowNums[1]][colNums[1]] = tile1;
                        playerBeat = gameBoard[rowDir][colDir];
                        if (playerBeat == 1) {
                            player1Tiles--
                        } else if (playerBeat == 2) {
                            player2Tiles--
                        }
                        gameBoard[rowDir][colDir] = 0;
                    }

                } else { //If the distance is not right
                    alert("That's too far!")
                    return;
                }
            } else { //If the player turn does not match the initial tile
                alert("It's the other player's move! Too bad..")
                return;
            }

            drawBoard();
        } else { //Any other invalid move
            alert("Invalid move!");
            return;

        }
        //Clear out the memory of the moves
        rowNums = [];
        rowNums = [];
    }

    x.setAttribute("class", "selected");

    //Delete the selected class after second click
    if (clickedCells > 1) {
        position1.removeAttribute("class");
        position2.removeAttribute("class");
        clickedCells = 0;
    }

    clickedCells++;
};