let blockClick = []

//Define data-structure for storing block information
let BlockState = {

    prevState: null,
    indexOfState: 0,
    webElementParagraph: null,
    stateData: "",
    nextState: null

}

let MainGameTree = [];


//list of all winning game states
const winStates = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8], [0,4,8],[2,4,6]];




function popBlockType(instanceGameTree, char){

    for (let k = 0; k < instanceGameTree.length; k++)
        if (instanceGameTree[k].stateData ===char) 
            instanceGameTree.splice(k,1);
    
}



function restartGame() {

    for (let k=0; k< 9;k++) 
        GameTree[k].webElementParagraph.textContent = "";
    const randBlockClick = Math.round(Math.random()*8);

    MainGameTree[randBlockClick].webElementParagraph.textContent = 'O';
    MainGameTree[randBlockClick].webElementParagraph.style.color = "blue";


}

function checkIsWinner(list1, list2){
    return list1.every(element => list2.includes(element));

}




//Onclick events for blocks
// ------------------------------------------------------------
///
for (let k=0; k < 9; k++) {

    let newBlockState = JSON.parse(JSON.stringify(BlockState));
    newBlockState.indexOfState = k;
    MainGameTree.push(newBlockState);
    MainGameTree[k].webElementParagraph =  document.getElementById("block" + (k+ 1));    

    //Onclick events for blocks
    //-------------------------------------------------------------
    blockClick.push(()=>{


        let hasBotCircled = MainGameTree[k].webElementParagraph.textContent === "O";
        let isBlockEmpty = MainGameTree[k].webElementParagraph.textContent === ''; 

        if(!hasBotCircled && isBlockEmpty){
           // alert(MainGameTree[k].webElementParagraph.textContent);
        
            MainGameTree[k].webElementParagraph.textContent = "X";
            MainGameTree[k].stateData = "X";
            MainGameTree[k].webElementParagraph.style.color = "rgb(138, 21, 21)";
            //alert((MainGameTree));

            const tempRoot = [].concat(MainGameTree);;
    

            popBlockType(tempRoot,"X");
           //for (let q=0;q < tempRoot.length;q++)
           //     alert(tempRoot[q].indexOfState);

            findVictoryPath(tempRoot,[],null, null);
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
    //-------------------------------------------------------------

}


//
//  -------------------------------------------------------------
//



function main() {

    const randBlockClick = Math.round(Math.random()*8);
    MainGameTree[randBlockClick].webElementParagraph.textContent = 'O';
    MainGameTree[randBlockClick].stateData = "O";
    MainGameTree[randBlockClick].webElementParagraph.style.color = "blue";

}

main();



function findVictoryPath(root,historicalMoves,score, winningRoute) {
                

    //find winning solution                
    // ---------------------------------------------------
    alert("ound")
    const chosen_X_Blocks = [].concat(root);

    popBlockType(chosen_X_Blocks,"");
    alert(chosen_X_Blocks);


    for(let p=0;p< chosen_X_Blocks.length; p++)
        historicalMoves.push(chosen_X_Blocks[p].indexOfState);
    alert(historicalMoves);
    const isWinner = checkIsWinner(historicalMoves,winStates);
    
    // -----------------------------------------------------


}



