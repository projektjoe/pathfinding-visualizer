const NOTHING = 0
const WALL = 1
const START = 2
const END = 3

const START_ICON = 'url(assets/start.jpg)';
const END_ICON = 'url(assets/end.jpg)';

class Board{
    constructor(row,column){
        this.numOfSquaresRow = row
        this.NumOfSquaresColumn = column
        this.algorithm = "A*"
        this.numericalBoard = Array(this.numOfSquaresRow).fill().map(()=>Array(this.NumOfSquaresColumn).fill(0));
        this.mouseClicked = [false]
        this.startInHands = [false]
        this.endInHands = [false]
        
    }
    
    initialize(){
        this.#createGameBoard()
        this.#resetStartNodePosition()
        this.#resetEndNodePosition()
        this.#addEventListenersToSquares()
    }
    #createGameBoard(){
        let gameBoard = document.getElementById("board")
        gameBoard.style["grid-template-columns"] = "repeat("+ this.NumOfSquaresColumn +", 1fr)";

        // create squares and append them to the board
        for(let i=0; i<this.numOfSquaresRow; i++){
            for(let j = 0; j < this.NumOfSquaresColumn; j++){
            let square = document.createElement("div")
            this.#initializeSquare(square,i,j)
            gameBoard.appendChild(square);
            }
        }
    }
    #initializeSquare(square,i,j){
      //set the class and row/ column of the square
      square.classList.add("square")
      square.setAttribute("row", i)
      square.setAttribute("column",j)

      // to prevent dragging of the square
      square.style["user-select"] = "none"
      square.style["-moz-user-select"] = "none"
      square.style["-ms-user-select"] = "none"
      square.style["-webkit-user-select"]= "none"
      square.style["-webkit-user-drag"]= "none"
      square.style["user-drag"] = "none"

      // for the pictures (start and end)
      square.style.backgroundSize = 'cover';

      // animations
      square.style.animationDuration = '1s';
      square.style.animationName = 'gray_to_black';
    }

    #coordinatesToSquare = function(i,  j){
      // takes in the row and the column and returns the desired square
        let query = "[row='" + i + "'][column='" + j + "']";
        let square = document.querySelector(query)
        return square;
    }

    #resetStartNodePosition(){
        this.numericalBoard[0][0] = 2
        this.#coordinatesToSquare(0,0).style.backgroundImage = START_ICON;
    }

    #resetEndNodePosition(){
        this.numericalBoard[this.numOfSquaresRow-1][this.NumOfSquaresColumn-1] = 3
        this.#coordinatesToSquare(this.numOfSquaresRow-1,this.NumOfSquaresColumn-1).style.backgroundImage = END_ICON;
    }

    // make sure start and end node did not disappear, if so reset their positions
    #check_if_board_valid(){
        let startfound = false;
        let endfound = false;
      
        for (let i=0; i<this.numOfSquaresRow; i++){
          for(let j =0; j < this.NumOfSquaresColumn; j++){
            if(this.numericalBoard[i][j]===2){
              startfound=true;
            }
            if(this.numericalBoard[i][j]===3){
              endfound=true;
            }
          }
        }
        if (!startfound){
            this.#resetStartNodePosition()
        }
        if(!endfound){
            this.#resetEndNodePosition()
        }
      }

    mouseDownHandle(){
        this.mouseClicked[0] = true
    }
    mouseUpHandle(){
        this.mouseClicked[0] = false
        this.startInHands[0] = false
        this.endInHands[0] = false
        this.#check_if_board_valid()
    }

    #addOnClick(square){        
        let Board = this.numericalBoard
        square.onclick = function(){
            let r = this.attributes.row.nodeValue
            let c = this.attributes.column.nodeValue
    
            if(Board[r][c] === NOTHING){
              this.style.backgroundColor = "cyan";
              Board[r][c] = 1;
              }
              else if(Board[r][c]=== WALL) {
                this.style.backgroundColor = "black";
                Board[r][c] = 0;
              }
          }
    }
    #addOnMouseOver(square){
        
        let Board = this.numericalBoard
        let startInHands = this.startInHands
        let endInHands = this.endInHands
        square.onmouseover= function(){
            let r = this.attributes.row.nodeValue
            let c = this.attributes.column.nodeValue
            this.style.backgroundColor = "white";
        
            if (startInHands[0]){
              if(Board[r][c]!== END){
              this.style.backgroundImage = START_ICON;
              Board[r][c]=2;
              }
              // if user puts start in end block, return end block to default pos
              else if(Board[r][c]===END){
                this.style.backgroundImage = START_ICON;
                Board[r][c]=2;
                resetEndNodePosition();
              }
            }
    
            if (endInHands[0]){
              if(Board[r][c]!== START){
              this.style.backgroundImage = END_ICON;
              Board[r][c]=3;
              }
              else if (Board[r][c]=== START){
                this.style.backgroundImage = END_ICON;
                Board[r][c]=3;
                resetStartNodePosition();
                
              }
            }
    
          }

    }
    #addOnMouseOut(square){
        let Board = this.numericalBoard
        let mouseClicked = this.mouseClicked
        let startInHands = this.startInHands
        let endInHands = this.endInHands
        square.onmouseout= function(){
            let r = this.attributes.row.nodeValue
            let c = this.attributes.column.nodeValue
            let thisSquare = Board[r][c]
            if(!mouseClicked[0]) {
              
              if(thisSquare === NOTHING){
              this.style.backgroundColor = "black";
              }
              else if (thisSquare === WALL){
                this.style.backgroundColor = "cyan";
              }
              else if (thisSquare === START){
                this.style.backgroundImage = START_ICON;
              }
              else if (thisSquare === END){
                this.style.backgroundImage = END_ICON;
              }
            }
            else{
              if(thisSquare === NOTHING){
              this.style.backgroundColor = "cyan";
              this.style.animationName = "black_to_cyan"
              Board[r][c] = 1;
              }
              else if(thisSquare=== WALL) {
                this.style.backgroundColor = "black";
                Board[r][c] = 0;
              }
              else if(thisSquare=== START){
                
                this.style.backgroundImage = "none";
                this.style.backgroundColor = "black";
                startInHands[0] = true;
                Board[r][c]=0;
              }
              else if(thisSquare=== END){
                
                this.style.backgroundImage = "none";
                this.style.backgroundColor = "black";
                endInHands[0] = true;
                Board[r][c]=0;
              }
              
    
            }

          }
        
    }
    #addEventListenersToSquares(){
        for(let i=0; i<this.numOfSquaresRow; i++){
            for(let j = 0; j<this.NumOfSquaresColumn; j++){
                let square = this.#coordinatesToSquare(i.toString(),j.toString())
                
                this.#addOnClick(square)
                this.#addOnMouseOver(square)
                this.#addOnMouseOut(square)
            }
        }
    }

}

function algopick() {  
    var mylist = document.getElementById("algolist");  
    algo = mylist.options[mylist.selectedIndex].text;  
}  
  
function start(){
console.log(algo)
}


document.addEventListener("DOMContentLoaded", ()=>{
    board = new Board(25,20)
    board.initialize()

})
document.addEventListener("mousedown", ()=>{
    board.mouseDownHandle()
   
})

document.addEventListener("mouseup", ()=>{
    board.mouseUpHandle()
})
