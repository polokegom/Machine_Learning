let blockClick = []

let BlockState = {

    prevState: null,
    indexOfState: 0,
    stateData: null,
    instanceData: "",
    nextState: null

}

let MainGameTree = [];


//list of all winning game states
const winStates = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8], [0,4,8],[2,4,6]]

function popBlockType(instanceGameTree, char){

    for (let k = 0; k < instanceGameTree.length; k++)
        if (instanceGameTree[k] ===char) 
            instanceGameTree.splice(k,1);
    
}


function checkListMatch(list1, list2){
    return list1.every(element => list2.includes(element));

}

alert(checkListMatch([0,2],[2,64,74,2,4,1,0,4,6,7]))



//Onclick events for blocks
for (let k=0; k < 9; k++) {

    let newBlockState = JSON.parse(JSON.stringify(BlockState));
    newBlockState.indexOfState = k;
    MainGameTree.push(newBlockState);
    MainGameTree[k].stateData =  document.getElementById("block" + (k+ 1));    
    blockClick.push(()=>{


        let hasBotCircled = MainGameTree[k].stateData.textContent === "O";
        let isBlockEmpty = MainGameTree[k].stateData.textContent === ''; 

        if(!hasBotCircled && isBlockEmpty){
            //alert("number: " + k);
           // alert(MainGameTree[k].stateData.textContent);
        

            MainGameTree[k].stateData.textContent = "X";
            MainGameTree[k].stateData.style.color = "rgb(138, 21, 21)";

            const tempRoot = Json.parse(Json.stringify(MainGameTree));
            popBlockType(tempRoot,"X");
            /*

            findVictoryPath = (root,historyMoves,score, winningRoute)=> {
                
                
                //find winning solution                
                const chosen_X_Blocks = Json.parse(Json.stringify(root));

                popBlockType(chosen_X_Blocks,"");
                for(let p=0;p< chosen_X_Blocks.length; p++)
                historyMoves.push(chosen_X_Blocks.indexOfState);

                

            }*/

        }

    });
}

const randBlockClick = Math.round(Math.random()*8);

MainGameTree[randBlockClick].stateData.textContent = 'O';
MainGameTree[randBlockClick].isntanceData = "O";
MainGameTree[randBlockClick].stateData.style.color = "blue";




function findVictoryPath(root,historicalMoves,score, winningRoute) {
                
                
    //find winning solution                
    const chosen_X_Blocks = Json.parse(Json.stringify(root));

    popBlockType(chosen_X_Blocks,"");
    for(let p=0;p< chosen_X_Blocks.length; p++)
        historicalMoves.push(chosen_X_Blocks.indexOfState);

    const isWinner = checkIfWinner(historicalMoves);
    alert(isWinner);
    

}




function restartGame() {

    for (let k=0; k< 9;k++) 
        GameTree[k].stateData.textContent = "";
    const randBlockClick = Math.round(Math.random()*8);

    MainGameTree[randBlockClick].stateData.textContent = 'O';
    MainGameTree[randBlockClick].stateData.style.color = "blue";


}