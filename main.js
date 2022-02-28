

class Board{
    constructor(row,column){
        this.numOfSquaresRow = row
        this.NumOfSquaresColumn = column
        this.algorithm = "A*"
        this.numericalBoard = Array(this.numOfSquaresRow).fill().map(()=>Array(this.NumOfSquaresColumn).fill(0));
        this.mouseClicked = false
        this.startInHands = false
        this.endInHands = false
    }
    
    initialize(){
        this.#createGameBoard()
        this.#resetStartNodePosition()
        this.#resetEndNodePosition()
        this.#addEventListenersToSquares()
    }
    #createGameBoard(){
        let gameBoard = document.getElementById("board")
        for(let i=0; i<this.numOfSquaresRow; i++){
            for(let j = 0; j < this.NumOfSquaresColumn; j++){
            let square = document.createElement("div")
            this.#initializeSquare(square,i,j)
            gameBoard.appendChild(square);
            }
        }
    }
    #initializeSquare(square,i,j){
        square.classList.add("square")
        square.setAttribute("row", i)
        square.setAttribute("column",j)
        square.style["user-select"] = "none"
        square.style["-moz-user-select"] = "none"
        square.style["-ms-user-select"] = "none"
        square.style["-webkit-user-select"]= "none"
        square.style["-webkit-user-drag"]= "none"
        square.style["user-drag"] = "none"
        square.style.backgroundSize = 'cover';
        square.style.animationDuration = '1s';
        square.style.animationName = 'gray_to_black';
    }
    #indices_to_square = function( i,  j){
        let query = "[row='" + i + "'][column='" + j + "']";
        return query;
    }

    #resetStartNodePosition(){
        this.numericalBoard[0][0] = 2
        let query = this.#indices_to_square(0,0)
        let square = document.querySelector(query)
        square.style.backgroundImage = 'url(assets/start.jpg)';
    }
    #resetEndNodePosition(){
        this.numericalBoard[0][1] = 3
        let query = this.#indices_to_square(0,1)
        let square = document.querySelector(query)
        square.style.backgroundImage = 'url(assets/end.jpg)';
    }
    #check_if_board_valid(){
        let startfound = false;
        let endfound = false;
      
        for (let i=0; i<this.no_of_squares_row; i++){
          for(let j =0; j < this.no_of_squares_column; j++){
            if(board[i][j]==2){
              startfound=true;
            }
            if(board[i][j]==3){
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
        this.mouseClicked = true
    }
    mouseUpHandle(){
        this.mouseClicked = false
        this.startInHands = false
        this.endInHands = false
        this.#check_if_board_valid()
    }

    #addOnClick(square){        
        let Board = this.numericalBoard
        square.onclick = function(){
            let r = this.attributes.row.nodeValue
            let c = this.attributes.column.nodeValue
    
            if(Board[r][c] ===0){
              this.style.backgroundColor = "cyan";
              Board[r][c] = 1;
              }
              else if(Board[r][c]===1) {
                this.style.backgroundColor = "black";
                Board[r][c] = 0;
              }
    
            
          }
    }
    #addOnMouseOver(square){
        let Board = this.numericalBoard
        let startInHands = this.startInHands
        let endInHands = this.endInHands
        let resetStartNodePosition = this.#resetStartNodePosition()
        let resetEndNodePosition = this.#resetEndNodePosition()
        square.onmouseover= function(){
            let r = this.attributes.row.nodeValue
            let c = this.attributes.column.nodeValue
            this.style.backgroundColor = "white";
        
            if (startInHands){
              if(Board[r][c]!==3){
              this.style.backgroundImage = 'url(assets/start.jpg)';
              Board[r][c]=2;
              }
              // if user puts start in end block, return end block to default pos
              else if(Board[r][c]===3){
                this.style.backgroundImage = 'url(assets/start.jpg)';
                Board[r][c]=2;
                resetEndNodePosition();
              }
            }
    
            if (endInHands){
              if(Board[r][c]!==2){
              this.style.backgroundImage = 'url(assets/end.jpg)';
              Board[r][c]=3;
              }
              else if (Board[r][c]===2){
                this.style.backgroundImage = 'url(assets/end.jpg)';
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
            debugger;
            if(startInHands){
                
            }
            if(endInHands){

            }
            if(!mouseClicked) {
              
              if(Board[r][c] === 0){
              this.style.backgroundColor = "black";
              }
              else if (Board[r][c] ===1){
                this.style.backgroundColor = "cyan";
                this.style.animationName = "black_to_cyan"
              }
              else if (Board[r][c] ===2){
                this.style.backgroundImage = 'url(assets/start.jpg)';
              }
              else if (Board[r][c] ===3){
                this.style.backgroundImage = 'url(assets/end.jpg)';
              }
            }
            else{
              if(Board[r][c] ===0){
              this.style.backgroundColor = "cyan";
              this.style.animationName = "black_to_cyan"
              Board[r][c] = 1;
              }
              else if(Board[r][c]===1) {
                this.style.backgroundColor = "black";
                Board[r][c] = 0;
              }
              else if(Board[r][c]===2){
                
                this.style.backgroundImage = "none";
                this.style.backgroundColor = "black";
                startInHands = true;
                Board[r][c]=0;
              }
              else if(Board[r][c]===3){
                
                this.style.backgroundImage = "none";
                this.style.backgroundColor = "black";
                endInHands = true;
                Board[r][c]=0;
              }
              
    
            }
          }
        
    }
    #addEventListenersToSquares(){
        for(let i=0; i<this.numOfSquaresRow; i++){
            for(let j = 0; j<this.NumOfSquaresColumn; j++){
                let query = this.#indices_to_square(i.toString(),j.toString())
                let square = document.querySelector(query)
                
                this.#addOnClick(square)
                this.#addOnMouseOver(square)
                this.#addOnMouseOut(square)
            }
        }
    }

}




document.addEventListener("DOMContentLoaded", ()=>{
    board = new Board(26,25)
    board.initialize()

})
document.addEventListener("mousedown", ()=>{
    board.mouseDownHandle()
   
})

document.addEventListener("mouseup", ()=>{
    board.mouseUpHandle()
})