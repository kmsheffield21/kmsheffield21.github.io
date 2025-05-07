
let turn = 1;


function updateScore() {

    let blackPoints = 0;
    let whitePoints = 0;
    


    let letterArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
    for (let a of letterArray) {
        for (b=1; b < 9; b++) {
            let coord = a.concat(String(b))
            let imgName = document.getElementById(coord).src.split('/').pop();

            if (imgName == "blackPiece.png") {
                blackPoints++;
            }

            else if (imgName == "whitePiece.png") {
                whitePoints++;
            }


        }
    }

    let blackTable = document.getElementById("blackSB");
    blackTable.rows[1].cells[0].innerText = blackPoints;

    let whiteTable = document.getElementById("whiteSB");
    whiteTable.rows[1].cells[0].innerText = whitePoints;

    if (turn % 2 == 1) {
        document.getElementById("turnCounter").innerText = "BLACK'S TURN";
        document.getElementById("turnCounter").style.color = "#DBDDE9";
        document.getElementById("turnCounter").style.backgroundColor = "#3C3D41";
    }
    else {
        document.getElementById("turnCounter").innerText = "WHITE'S TURN";
        document.getElementById("turnCounter").style.color = "#3C3D41";
        document.getElementById("turnCounter").style.backgroundColor = "#DBDDE9";
    }


}

function testButton(id) {
    let button = document.getElementById(id);

    let imgName = button.src.split('/').pop();
    
    if (imgName == "blackHighlighted.png") {
        button.src = "blackPiece.png";
        flipTiles(id);
        turn++;
    }

    else if (imgName == "whiteHighlighted.png") {
        button.src = "whitePiece.png";
        flipTiles(id);
        turn++;
    }
    
    updateScore();
    updateHighlights()

    if (checkGameEnd() == true) {
        turn++;
        updateScore();
        updateHighlights();

        if (turn % 2 == 1) {
            document.getElementById("turnCounter").innerText = "BLACK'S TURN (WHITE HAS NO VALID MOVES)";
            document.getElementById("turnCounter").style.color = "#DBDDE9";
            document.getElementById("turnCounter").style.backgroundColor = "#3C3D41";
        }
        else {
            document.getElementById("turnCounter").innerText = "WHITE'S TURN (BLACK HAS NO VALID MOVES";
            document.getElementById("turnCounter").style.color = "#3C3D41";
            document.getElementById("turnCounter").style.backgroundColor = "#DBDDE9";
        }

        if (checkGameEnd() == true) {
            returnWinner();
        }
    }
    
    
}


function resetBoard() {

    turn = 1;
    
    let letterArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
    for (let a of letterArray) {
        for (b=1; b < 9; b++) {
            let coord = a.concat(String(b));
            document.getElementById(coord).src = "blankTile.png";
        }
    }
    document.getElementById("d4").src = "whitePiece.png";
    document.getElementById("d5").src = "blackPiece.png";
    document.getElementById("e4").src = "blackPiece.png";
    document.getElementById("e5").src = "whitePiece.png";
    document.getElementById("c4").src = "blackHighlighted.png";
    document.getElementById("d3").src = "blackHighlighted.png";
    document.getElementById("e6").src = "blackHighlighted.png";
    document.getElementById("f5").src = "blackHighlighted.png";

    updateScore();

}

function updateHighlights() {

    let letterArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
    for (let a of letterArray) {
        for (b=1; b < 9; b++) {
            let coord = a.concat(String(b));
            let imgName = document.getElementById(coord).src.split('/').pop();

            if (imgName == "blackHighlighted.png" || imgName == "whiteHighlighted.png") {
                document.getElementById(coord).src = "blankTile.png";
            }
        }
    }

    let directionVector = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];

    let primCol = "";
    let secCol = "";
    highCol = "";
    if (turn % 2 == 1) {
        primCol = "blackPiece.png";
        secCol = "whitePiece.png";
        highCol = "blackHighlighted.png";
    }
    else {
        primCol = "whitePiece.png";
        secCol = "blackPiece.png";
        highCol = "whiteHighlighted.png";
    }

    for (a=0; a < 8; a++) {
        for (b=1; b < 9; b++) {
            let coord = letterArray[a].concat(String(b));
            let imgName = document.getElementById(coord).src.split('/').pop();
            if (imgName == "blankTile.png") {
                validMove = false;

                for (let c of directionVector) {
                    let secCheck = false;
                    let xCoord = a+c[0];
                    let yCoord = b+c[1];
                    while (xCoord >= 0 && xCoord <= 7 && yCoord >= 1 && yCoord <= 8) {
                        let newCoord = letterArray[xCoord].concat(String(yCoord));
                        let newImgName = document.getElementById(newCoord).src.split('/').pop();

                        if (newImgName == "blankTile.png" || newImgName == "blackHighlighted.png" || newImgName == "whiteHighlighted.png") {
                            break;
                        }

                        if (secCheck == false) {
                            if (secCol == newImgName) {
                                secCheck = true;
                            }
                            else {
                                break;
                            }
                        }

                        else {
                            if (primCol == newImgName) {
                                validMove = true;
                            }
                        }

                        xCoord += c[0];
                        yCoord += c[1];
                    }
                }

                if (validMove == true) {
                    document.getElementById(coord).src = highCol;
                }
            }
        }
    }


}

function flipTiles(id) {

    let letterArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let directionVector = [[-1,-1,false], [-1,0,false], [-1,1,false], [0,-1,false], [0,1,false], [1,-1,false], [1,0,false], [1,1,false]];

    let primCol = "";
    let secCol = "";
    highCol = "";
    if (turn % 2 == 1) {
        primCol = "blackPiece.png";
        secCol = "whitePiece.png";
        highCol = "blackHighlighted.png";
    }
    else {
        primCol = "whitePiece.png";
        secCol = "blackPiece.png";
        highCol = "whiteHighlighted.png";
    }

    let a = "";
    for (n=0; n < 8; n++) {
        if (id[0] == letterArray[n]) {
            a = n;
        }
    }

    let b = Number(id[1]);

    let coord = letterArray[a].concat(String(b));
    let imgName = document.getElementById(coord).src.split('/').pop();

    for (c=0; c < 8; c++) {
        let secCheck = false;
        let direcCheck = false;
        let xCoord = a+directionVector[c][0];
        let yCoord = b+directionVector[c][1];
        while (xCoord >= 0 && xCoord <= 7 && yCoord >= 1 && yCoord <= 8) {
            let newCoord = letterArray[xCoord].concat(String(yCoord));
            let newImgName = document.getElementById(newCoord).src.split('/').pop();

            if (newImgName == "blankTile.png" || newImgName == "blackHighlighted.png" || newImgName == "whiteHighlighted.png") {
                break;
            }

            if (secCheck == false) {
                if (secCol == newImgName) {
                    secCheck = true;
                }
                else {
                    break;
                }
            }

            else {
                if (primCol == newImgName) {
                    direcCheck = true;
                }
            }

            xCoord += directionVector[c][0];
            yCoord += directionVector[c][1];
        }

        if (direcCheck == true) {
            directionVector[c][2] = true;
        }
    }

    for (c=0; c < 8; c++) {
        if (directionVector[c][2] == true) {
            let xCoord = a+directionVector[c][0];
            let yCoord = b+directionVector[c][1];

            while (xCoord >= 0 && xCoord <= 7 && yCoord >= 1 && yCoord <= 8) {
                let newCoord = letterArray[xCoord].concat(String(yCoord));
                let newImgName = document.getElementById(newCoord).src.split('/').pop();

                if (newImgName == secCol) {
                    document.getElementById(newCoord).src = primCol;
                }
                else {
                    break;
                }
    
                xCoord += directionVector[c][0];
                yCoord += directionVector[c][1];
            }

        }
    }
}

function checkGameEnd() {

    counter = 0;

    let letterArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
    for (let a of letterArray) {
        for (b=1; b < 9; b++) {
            let coord = a.concat(String(b));
            let imgName = document.getElementById(coord).src.split('/').pop();
            if (imgName == "blackHighlighted.png" || imgName == "whiteHighlighted.png") {
                counter++;
            }
        }
    }

    if (counter == 0) {
        return true;
    }

    else {
        return false;
    }

}

function returnWinner() {
    let blackPoints = 0;
    let whitePoints = 0;

    let letterArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
    for (let a of letterArray) {
        for (b=1; b < 9; b++) {
            let coord = a.concat(String(b))
            let imgName = document.getElementById(coord).src.split('/').pop();

            if (imgName == "blackPiece.png") {
                blackPoints++;
            }

            else if (imgName == "whitePiece.png") {
                whitePoints++;
            }


        }
    }

    if (blackPoints > whitePoints) {
        document.getElementById("turnCounter").innerText = "GAME OVER: BLACK WINS!";
        document.getElementById("turnCounter").style.color = "#DBDDE9";
        document.getElementById("turnCounter").style.backgroundColor = "#3C3D41";
    }

    else if (blackPoints < whitePoints) {
        document.getElementById("turnCounter").innerText = "GAME OVER: WHITE WINS!";
        document.getElementById("turnCounter").style.color = "#3C3D41";
        document.getElementById("turnCounter").style.backgroundColor = "#DBDDE9";
    }

    else {
        document.getElementById("turnCounter").innerText = "GAME OVER: IT'S A DRAW.";
        document.getElementById("turnCounter").style.color = "#3C3D41";
        document.getElementById("turnCounter").style.backgroundColor = "#DBDDE9";
    }
}