


let blockClick = []
let MainGameTree = [];
const maxWinReq = 3
let playGame = true
let count = 0;

//Define Object for storing Game block data
let BlockState = {

    prevState: null,
    indexOfState: 0,
    webElementParagraph: null,
    stateData: "",
    nextState: null

}


function popBlockType(instanceGameTree, char) {

    temp = []
    for (let k = 0; k < instanceGameTree.length; k++)
        if (instanceGameTree[k].stateData !== char)
            temp.push(instanceGameTree[k]);

    return instanceGameTree.filter(gameState => gameState.stateData !== char)//temp;

}
function selectABlock(block, letter, color) {


    block.stateData = letter;
    block.webElementParagraph.textContent = letter;
    block.webElementParagraph.style.color = color;
}


/**
 * OnClick event to reset the Game
 */
function restartGame() {

    for (let k = 0; k < 9; k++) {
        MainGameTree[k].webElementParagraph.textContent = "";
        MainGameTree[k].stateData = "";
    }
    const randBlockClick = Math.round(Math.random() * 8);
    MainGameTree[randBlockClick].webElementParagraph.textContent = 'O';
    MainGameTree[randBlockClick].webElementParagraph.style.color = "blue";
    playGame = true;
}


/**
 * 0
 * @param {list of indexes of played moves by agent} list1 
 * @returns Whether player has won the game
 */
function checkIsWinner(list1) {

    //list of all winning game states
    const winStates = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    return winStates.some(winCombo => {
        return winCombo.every(chosenBlock => list1.includes(chosenBlock));
    });

}


//Onclick events for blocks
for (let k = 0; k < 9; k++) {



    let newBlockState = Object.assign({}, BlockState);
    newBlockState.indexOfState = k;
    MainGameTree.push(newBlockState);
    MainGameTree[k].webElementParagraph = document.getElementById("block" + (k + 1));

    //Onclick events for blocks
    blockClick.push(() => {

        if (playGame) {
            let hasBotCircled = MainGameTree[k].webElementParagraph.textContent === "O";
            let isBlockEmpty = MainGameTree[k].webElementParagraph.textContent === '';

            if (!hasBotCircled && isBlockEmpty) {

                playGame = false;
                selectABlock(MainGameTree[k], "X", "rgb(138, 21, 21)")

                //A.I. bot moves
                let tempRoot = JSON.parse(JSON.stringify(MainGameTree));
                count = 0;
                winningAIRoutes = []
                winningPlayerRoutes = []
                findVictoryPath(tempRoot, [], winningAIRoutes, [], winningPlayerRoutes, false);
    //            alert("^^^^\nMax Player winning route: " + winningPlayerRoutes.length + "\n^^^^^^^")
    //          alert("^^^^\nMax winning route: " + winningAIRoutes.length + "\n^^^^^^^")

                let blockOptions = MainGameTree.filter((element) => element.stateData === "")


                if (winningAIRoutes.length === 0 && (blockOptions.length !== 0)) {
                    
                    const randClick = Math.round(Math.random() * (blockOptions.length - 1))
                    selectABlock(MainGameTree[blockOptions[randClick].indexOfState], "O", "blue")
                }

                blockOptions = MainGameTree.filter((element) => element.stateData === "")

                if (winningAIRoutes.length === 0 && blockOptions.length === 0) {
                    
                    alert("It's a draw")
                    playGame = false
                    return
                }            
                
                /* 
                    Analyse dataset & make move
                */
                let playerHighWinRate = winningPlayerRoutes.filter(winRoute => winRoute.length <= Math.floor(maxWinReq / 2))
                let uniqPlayerHighRateWin = []
                playerHighWinRate.forEach((element) => {
                    if (!uniqPlayerHighRateWin.includes(Number(element)))
                        uniqPlayerHighRateWin.push(Number(element))
                })


                /*  
                If probability of player to win is High
                the A.I. will cohose a defensive strategy
                */
                if (uniqPlayerHighRateWin.length > 0) {
                    selectABlock(MainGameTree[uniqPlayerHighRateWin[0]], "O", "blue")

                } else {

                    /* 
                    Alternatively the A.I. will choose an offensive strategy
                    */

                    //Check if instant win
                    let listOfInstantWin = winningAIRoutes.filter(winRoute => winRoute.length == 1)

                    if (listOfInstantWin.length > 0) {

                        selectABlock(MainGameTree[listOfInstantWin[0]], "O", "blue")
                        alert("Winner is A.I.!")
                        playGame = false
                        

                    } else {
                        /*
                            Choose best strategic move for victory
                        */
                        uniqWinAIRoutes = []
                        winningAIRoutes.forEach((winRoute) => {
                            if (!uniqWinAIRoutes.includes(JSON.stringify(winRoute)))
                                uniqWinAIRoutes.push(JSON.stringify(winRoute));
                        })

                        //Score the best possible A.I. Move
                        let listOfBestAIMove = []

                        uniqWinAIRoutes.forEach((routes) => {
                            let numOfPossibleWins = 0;
                            temp = JSON.parse(routes)
                            uniqWinAIRoutes.forEach((routes2) => {
                                nestTemp = JSON.parse(routes2)
                                if (temp[0] === nestTemp[0]) {
                                    numOfPossibleWins += 1;
                                    uniqWinAIRoutes.splice(uniqWinAIRoutes.indexOf(routes), 1);
                                }

                            })

                            listOfBestAIMove.push([numOfPossibleWins, temp[0]])


                        })

                        /*
                        Get AI move with the best probability of winning
                        */
                        let bestAIMove = listOfBestAIMove[0];
                        listOfBestAIMove.forEach((AIMove) => {
                            if (bestAIMove[0] < AIMove[0])
                                bestAIMove = AIMove
                        })

                        selectABlock(MainGameTree[bestAIMove[1]], "O", "blue")

                    }

                }
                playGame = true
            }
        }
    });



}


function main() {

    const randBlockClick = Math.round(Math.random() * 8);
    selectABlock(MainGameTree[randBlockClick], "O", "blue")

}


main()

function findVictoryPath(root, historicalAIMoves, winningAIRoute, historicalPlayerMoves, winningPlayerRoute, isEnemiesTurn) {

    //Checks number of instance the game tree is running
    count += 1;
    console.log("Instances running: " + count)

    let playerMoves = []
    let aiMoves = []
    let emptyBlockIndexes = [];
    let isPlayerWinner = false;
    let isAIWinner = false;

    //Get all moves Player & AI made using Game State
    root.forEach((move) => {

        if (move.stateData === "X")
            playerMoves.push(move.indexOfState);
        else if (move.stateData === "O")
            aiMoves.push(move.indexOfState);
        else if (move.stateData === "")
            emptyBlockIndexes.push(move.indexOfState);

    });


    //Check if Player or A.I. has won
    isAIWinner = checkIsWinner(aiMoves);
    isPlayerWinner = checkIsWinner(playerMoves);



    if (isAIWinner && historicalAIMoves.length > 0) {


        //alert("you have won");
        winningAIRoute.push(historicalAIMoves)
        //findVictoryPath(nextChosen_Block, historicalAIMoves,historicalPlayerMoves, null, !isEnemiesTurn)

    } else if (isPlayerWinner && historicalPlayerMoves.length > 0) {

        winningPlayerRoute.push(historicalPlayerMoves)
    } else {

        //Create new instance
        emptyBlockIndexes.forEach((emptyBlockIndex) => {
            let newGameTree = JSON.parse(JSON.stringify(root));
            let pastAIMoves = JSON.parse(JSON.stringify(historicalAIMoves));
            let pastPlayerMoves = JSON.parse(JSON.stringify(historicalPlayerMoves));

            if (!isEnemiesTurn) {

                newGameTree[emptyBlockIndex].stateData = "O";
                pastAIMoves.push(emptyBlockIndex);
            } else {

                newGameTree[emptyBlockIndex].stateData = "X";
                pastPlayerMoves.push(emptyBlockIndex);
            }
            findVictoryPath(newGameTree, pastAIMoves, winningAIRoutes, pastPlayerMoves, winningPlayerRoute, !isEnemiesTurn);

        });

    }
}





