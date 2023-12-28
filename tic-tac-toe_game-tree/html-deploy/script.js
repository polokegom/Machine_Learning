let block = []

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


    GameTree.append(...GameState);
    GameTree[k].stateData =  Document.getElementById("block" + (k+1));

    block.append(()=>{

        let hadBotCircled = GameTree[k].stateData.textContent === 'O';

        if(!hadBotCircled){

            GameTree[k].stateData.textContent = "X";
        }


    });
}