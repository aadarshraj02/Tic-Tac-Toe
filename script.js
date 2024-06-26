let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset')
let newGameButton = document.querySelector('#new-game')
let msgContainer = document.querySelector('.msg-container')
let msg = document.querySelector('#msg')

let turnO = true;
let count = 0;

function disableBoxes(){
    for(let box of boxes){
        box.disabled = true
    }
}
function enableBoxes(){
    for(let box of boxes){
        box.disabled = false;
        box.innerHTML = "";
    }
}

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        if(turnO){
            box.innerHTML = 'O'
            turnO = false;
        }else{
            box.innerHTML = 'X'
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
          gameDraw();
        }
    })
})

const checkWinner = ()=>{
    for(pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner")
                showWinner(pos1Val)
            }
        }
    }
}

function showWinner(winner){
    msg.innerHTML = `The winner is ${winner}`;
    msgContainer.classList.remove("hide")
    disableBoxes()
}

function resetGame(){
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide")
}
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

newGameButton.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame)
