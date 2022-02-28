// Global Variables
no_of_squares_row = 26
no_of_squares_column = 25
algo = "A*"
board = Array(no_of_squares_row).fill().map(()=>Array(no_of_squares_column).fill(0));
mouseclicked = false
startInHands = false
endInHands = false

// Helper Functions
indices_to_square = function( i,  j){
  query = "[row='" + i + "'][column='" + j + "']";
  return query;
}

// start node in default position

startNodeDefault = function(){
  board[0][0] = 2
  let query = indices_to_square(0,0)
  const square = document.querySelector(query)
  square.style.backgroundImage = 'url(assets/start.jpg)';
}
// return end node in default position

endNodeDefault = function(){
  board[0][1] = 3
  let query = indices_to_square(0,1)
  const square = document.querySelector(query)
  square.style.backgroundImage = 'url(assets/end.jpg)';
  // square.style.animationName = 'endNode';
  // square.style.animationDuration='2s';
  // square.style.animationFillMode = 'both';
  // square.style.animationIterationCount= 'infinite';
  // square.style.animationDirection = 'alternate-reverse';
}


check_if_board_valid = function(){
  startfound = false;
  endfound = false;

  for (let i=0; i<no_of_squares_row; i++){
    for(let j =0; j < no_of_squares_column; j++){
      if(board[i][j]==2){
        startfound=true;
      }
      if(board[i][j]==3){
        endfound=true;
      }
    }
  }
  if (!startfound){
    startNodeDefault()
  }
  if(!endfound){
    endNodeDefault()
  }
}


document.addEventListener("mousedown", ()=>{
  mouseclicked = true
 
})
document.addEventListener("mouseup", ()=>{
  mouseclicked = false
  startInHands = false
  endInHands = false
  check_if_board_valid()
})



document.addEventListener("DOMContentLoaded", ()=>{
  createSquares()
  function createSquares(){
    let gameBoard = document.getElementById("board")

    for(let i=0; i<no_of_squares_row; i++){
      for(let j = 0; j < no_of_squares_column; j++){
      let square = document.createElement("div")
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
      gameBoard.appendChild(square);
      }
    }
    startNodeDefault()
    endNodeDefault()

    // set properties for squares
    for(let i=0; i<no_of_squares_row; i++){
      for(let j = 0; j<no_of_squares_column; j++){

      let query = indices_to_square(i.toString(),j.toString())
      let square = document.querySelector(query)
      
      square.onclick = function(){
        let r = this.attributes.row.nodeValue
        let c = this.attributes.column.nodeValue

        if(board[r][c] ===0){
          this.style.backgroundColor = "cyan";
          board[r][c] = 1;
          }
          else if(board[r][c]===1) {
            this.style.backgroundColor = "black";
            board[r][c] = 0;
          }

        
      }

      square.onmouseover= function(){
        let r = this.attributes.row.nodeValue
        let c = this.attributes.column.nodeValue
        this.style.backgroundColor = "white";
    
        if (startInHands){
          if(board[r][c]!==3){
          this.style.backgroundImage = 'url(assets/start.jpg)';
          board[r][c]=2;
          }
          // if user puts start in end block, return end block to default pos
          else if(board[r][c]===3){
            this.style.backgroundImage = 'url(assets/start.jpg)';
            board[r][c]=2;
            endNodeDefault();
          }
        }

        if (endInHands){
          if(board[r][c]!==2){
          this.style.backgroundImage = 'url(assets/end.jpg)';
          board[r][c]=3;
          }
          else if (board[r][c]===2){
            this.style.backgroundImage = 'url(assets/end.jpg)';
            board[r][c]=3;
            startNodeDefault();
            
          }
        }

      }

      square.onmouseout= function(){
        let r = this.attributes.row.nodeValue
        let c = this.attributes.column.nodeValue
        if(!mouseclicked) {
          
          if(board[r][c] === 0){
          this.style.backgroundColor = "black";
          }
          else if (board[r][c] ===1){
            this.style.backgroundColor = "cyan";
            this.style.animationName = "black_to_cyan"
          }
          else if (board[r][c] ===2){
            this.style.backgroundImage = 'url(assets/start.jpg)';
          }
          else if (board[r][c] ===3){
            this.style.backgroundImage = 'url(assets/end.jpg)';
          }
        }
        else{
          if(board[r][c] ===0){
          this.style.backgroundColor = "cyan";
          this.style.animationName = "black_to_cyan"
          board[r][c] = 1;
          }
          else if(board[r][c]===1) {
            this.style.backgroundColor = "black";
            board[r][c] = 0;
          }
          else if(board[r][c]===2){
            
            this.style.backgroundImage = "none";
            this.style.backgroundColor = "black";
            startInHands = true;
            board[r][c]=0;
          }
          else if(board[r][c]===3){
            
            this.style.backgroundImage = "none";
            this.style.backgroundColor = "black";
            endInHands = true;
            board[r][c]=0;
          }
          

        }
      }
    }
  }
  }
})


function algopick() {  
  var mylist = document.getElementById("algolist");  
  algo = mylist.options[mylist.selectedIndex].text;  
}  

function start(){
  console.log(algo)
  
  
}