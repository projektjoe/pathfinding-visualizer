const START_ICON = 'url(assets/start.jpg)';
const END_ICON = 'url(assets/end.jpg)';


class Board{
    constructor(row,column){
        this.numOfSquaresRow = row
        this.NumOfSquaresColumn = column
        this.algorithm = "Breadth First Search"
        this.numericalBoard = Array(this.numOfSquaresRow).fill().map(()=>Array(this.NumOfSquaresColumn).fill(0));
        this.mouseClicked = [false]
        this.startInHands = [false]
        this.endInHands = [false]
        this.speed = "Fast"
        
    }
    
    initialize(){
        this.#createGameBoard()
        this.#resetStartNodePosition()
        this.#resetEndNodePosition()
        this.#addEventListenersToSquares()
    }

    #createGameBoard(){
        let gameBoard = document.getElementById("board")

        // css set max number of columns
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

    

    #resetStartNodePosition(){
        this.numericalBoard[0][0] = START
        coordinatesToSquare(0,0).style.backgroundImage = START_ICON;
    }

    #resetEndNodePosition(){
        this.numericalBoard[this.numOfSquaresRow-1][this.NumOfSquaresColumn-1] = END
        coordinatesToSquare(this.numOfSquaresRow-1,this.NumOfSquaresColumn-1).style.backgroundImage = END_ICON;
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
            let thisSquareCoordinates = [r,c]
            if(Board[r][c] === NOTHING){
              colorSquare(thisSquareCoordinates,"WALL")
              Board[r][c] = 1;
              }
              else if(Board[r][c]=== WALL) {
                colorSquare(thisSquareCoordinates,"NOTHING")
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
            let thisSquareCoordinates = [r,c]
            colorSquare([r,c], "HOVER")
            
        
            if (startInHands[0]){
              if(Board[r][c]!== END){
                colorSquare(thisSquareCoordinates,"START")
                Board[r][c]=START;
              }
              // if user puts start in end block, return end block to default pos
              else if(Board[r][c]===END){
                colorSquare(thisSquareCoordinates,"START")
                Board[r][c]=START;
                resetEndNodePosition();
              }
            }
    
            if (endInHands[0]){
              if(Board[r][c]!== START){
                colorSquare(thisSquareCoordinates,"END")
                Board[r][c]=END;
              }
              else if (Board[r][c]=== START){
                colorSquare(thisSquareCoordinates,"END")
                Board[r][c]=END;
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
            let thisSquareCoordinates = [r,c]
            if(!mouseClicked[0]) {
              
              if(thisSquare === NOTHING){
                colorSquare(thisSquareCoordinates, "NOTHING")
              }
              else if (thisSquare === WALL){
                colorSquare(thisSquareCoordinates, "WALL")
              }
              else if (thisSquare === START){
                colorSquare(thisSquareCoordinates,"START")
              }
              else if (thisSquare === END){
                colorSquare(thisSquareCoordinates,"END")
              }
              else if (thisSquare === VISITED){
                colorSquare(thisSquareCoordinates,"VISITED")
              }
              else if (thisSquare === PATH){
                colorSquare(thisSquareCoordinates,"PATH")
              }
            }
            else{
              if(thisSquare === NOTHING){
                colorSquare(thisSquareCoordinates, "ANIMATE-WALL")
                Board[r][c] = WALL;
              }
              else if(thisSquare=== WALL) {
                colorSquare(thisSquareCoordinates, "NOTHING")
                Board[r][c] = NOTHING;
              }
              else if(thisSquare=== START){
                colorSquare(thisSquareCoordinates, "NOTHING")
                startInHands[0] = true;
                Board[r][c]=NOTHING;
              }
              else if(thisSquare=== END){
                colorSquare(thisSquareCoordinates, "NOTHING")
                endInHands[0] = true;
                Board[r][c]=NOTHING;
              }
              
    
            }

          }
        
    }
    #addEventListenersToSquares(){
        for(let i=0; i<this.numOfSquaresRow; i++){
            for(let j = 0; j<this.NumOfSquaresColumn; j++){
                let square = coordinatesToSquare(i.toString(),j.toString())
                
                this.#addOnClick(square)
                this.#addOnMouseOver(square)
                this.#addOnMouseOut(square)
            }
        }
    }

}

function algopick() {  
    var mylist = document.getElementById("algolist");  
    board.algorithm = mylist.options[mylist.selectedIndex].text;  
}  
function speedpick() {  
    var mylist = document.getElementById("speedlist");  
    board.speed = mylist.options[mylist.selectedIndex].text;  
} 
  
function start(){ 
  switch(board.algorithm){
    case "A*":
      break;
    case "Dijsktra":
      break;
    case "Breadth First Search":
      bfs = new BFS(board.numericalBoard, board.speed)
      bfs.search()
      break;

    case "Depth First Search":
      break;
  }
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

