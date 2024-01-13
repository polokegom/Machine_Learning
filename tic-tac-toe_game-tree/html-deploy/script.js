


let blockClick = []
let MainGameTree = [];
const maxWinReq  = 3
let count = 0;

//Define Object for storing Game block data
let BlockState = {

    prevState: null,
    indexOfState: 0,
    webElementParagraph: null,
    stateData: "",
    nextState: null

}


function popBlockType(instanceGameTree, char){
    
    temp = []
    for (let k = 0; k < instanceGameTree.length; k++)
        if (instanceGameTree[k].stateData !==char) 
            temp.push(instanceGameTree[k]);

    return  instanceGameTree.filter(gameState => gameState.stateData !==char)//temp;
    
}


/**
 * OnClick event to reset the Game
 */
function restartGame() {

    for (let k=0; k< 9;k++) 
        GameTree[k].webElementParagraph.textContent = "";
    const randBlockClick = Math.round(Math.random()*8);
    MainGameTree[randBlockClick].webElementParagraph.textContent = 'O';
    MainGameTree[randBlockClick].webElementParagraph.style.color = "blue";

}


/**
 * 0
 * @param {list of indexes of played moves by agent} list1 
 * @returns Whether player has won the game
 */
function checkIsWinner(list1){
    
    //list of all winning game states
    const winStates = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8], [0,4,8],[2,4,6]];
    return winStates.some(winCombo => {
        return winCombo.every(chosenBlock =>list1.includes(chosenBlock));
    });

}


//Onclick events for blocks
for (let k=0; k < 9; k++) {



    let newBlockState = JSON.parse(JSON.stringify(BlockState));
    newBlockState.indexOfState = k;
    MainGameTree.push(newBlockState);
    MainGameTree[k].webElementParagraph =  document.getElementById("block" + (k+ 1));    

    //Onclick events for blocks
    blockClick.push(()=>{


        let hasBotCircled = MainGameTree[k].webElementParagraph.textContent === "O";
        let isBlockEmpty = MainGameTree[k].webElementParagraph.textContent === ''; 

        if(!hasBotCircled && isBlockEmpty){
        
            MainGameTree[k].webElementParagraph.textContent = "X";
            MainGameTree[k].stateData = "X";
            MainGameTree[k].webElementParagraph.style.color = "rgb(138, 21, 21)";
            //A.I. bot moves
            let tempRoot = JSON.parse(JSON.stringify(MainGameTree));       
            count =0;
            winningAIRoutes = []
            winningPlayerRoutes = []

            findVictoryPath(tempRoot,[], winningAIRoutes,[], winningPlayerRoutes,false);
            //Analyse dataset & make move
            playerHighWinRate = winningPlayerRoutes.filter(winRoute => winRoute.length <= Math.floor(maxWinReq/2))
            
            alert("All possible ways A.I. to wins: " + winningAIRoutes.length)
            alert("All possible ways Player to wins: " + winningPlayerRoutes.length)
            alert("All definite Player win states:" + playerHighWinRate.length)

        }

    });
    

}


function main() {

    const randBlockClick = Math.round(Math.random()*8);
    MainGameTree[randBlockClick].webElementParagraph.textContent = 'O';
    MainGameTree[randBlockClick].stateData = "O";
    MainGameTree[randBlockClick].webElementParagraph.style.color = "blue";

}


main()

function findVictoryPath(root,historicalAIMoves,winningAIRoute, historicalPlayerMoves, winningPlayerRoute, isEnemiesTurn) {
                
    //Checks number of instance the game tree is running
    count += 1;
    console.log("Instances running: " + count)

    let playerMoves = []
    let aiMoves = []
    
    //Get all moves Player & AI made using Game State
    root.forEach((move)=> {

        if (move.stateData == "X")
            playerMoves.push(move.indexOfState);
        if (move.stateData == "O")
            aiMoves.push(move.indexOfState);
    });

 
    let isPlayerWinner = false;
    let isAIWinner = false;
    
    //Indexes of empty blocks
    let emptyBlockIndexes = [];
    for (let r =0; r < root.length; r++)
        if (root[r].stateData == "")
            emptyBlockIndexes.push(root[r].indexOfState);

            
    //Check if Player or A.I. has won
    if (!isEnemiesTurn){
        isAIWinner = checkIsWinner(aiMoves);
        
    } else{
        isPlayerWinner = checkIsWinner(playerMoves);

    }

    
    if(isAIWinner){   


        //alert("you have won");
        winningAIRoute.push(historicalAIMoves)
        //findVictoryPath(nextChosen_Block, historicalAIMoves,historicalPlayerMoves, null, !isEnemiesTurn)

    }else if (isPlayerWinner) {

        winningPlayerRoute.push(historicalPlayerMoves)
    } else {

        //Create new instance
        emptyBlockIndexes.forEach((emptyBlockIndex)=>{
            let newGameTree = JSON.parse(JSON.stringify(root));
            let pastAIMoves =  JSON.parse(JSON.stringify(historicalAIMoves));
            let pastPlayerMoves =  JSON.parse(JSON.stringify(historicalPlayerMoves));

            if (!isEnemiesTurn){
                    
                newGameTree[emptyBlockIndex].stateData  = "O"; 
                pastAIMoves.push(emptyBlockIndex);                    
            } else {

                newGameTree[emptyBlockIndex].stateData  = "X";
                pastPlayerMoves.push(emptyBlockIndex); 
            }                
            findVictoryPath(newGameTree, pastAIMoves, winningAIRoutes, pastPlayerMoves, winningPlayerRoute, !isEnemiesTurn);

        });

        }
    }
    // -----------------------------------------------------






