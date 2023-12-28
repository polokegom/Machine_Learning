let blockClick = []

let GameState = {

    prevState: null,
    stateData: null,
    nextState: null

}

let GameTree = [];
//list of all winning game states
const winStates = [(0,1,2),(3,4,5),(6,7,8),(0,3,6),(1,4,7),(2,5,8), (0,4,8),(2,4,6)]

//functions for the buttons
for (let k=0; k < 9; k++) {


    GameTree.push(JSON.parse(JSON.stringify(GameState)));
    GameTree[k].stateData =  document.getElementById("block" + (k+ 1));
    
    blockClick.push(()=>{


        let hasBotCircled = GameTree[k].stateData.textContent === "O";
        let isBlockEmpty = GameTree[k].stateData.textContent === ''; 

        if(!hasBotCircled && isBlockEmpty){
            //alert("number: " + k);
           // alert(GameTree[k].stateData.textContent);
        

            GameTree[k].stateData.textContent = "X";
        }

    });
}