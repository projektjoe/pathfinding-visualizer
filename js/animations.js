const sleep = async function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
coordinatesToSquare = function(i,  j){
    // takes in the row and the column and returns the desired square
      let query = "[row='" + i + "'][column='" + j + "']";
      let square = document.querySelector(query)
      return square;
  }
colorSquare = async function(Node,type){// Node = [x,y] 
  let square = coordinatesToSquare(Node[0],Node[1])
  switch(type){
    case "NOTHING":
      square.style.backgroundImage = "none";
      square.style.backgroundColor = "black";
      break;
    case "HOVER":
      square.style.backgroundColor = "white";
      break;
    case "WALL":
      square.style.backgroundColor = "cyan";
      break;
    case "START":
      square.style.backgroundImage = START_ICON;
      break;
    case "END":
      square.style.backgroundImage = END_ICON;
      break;
    case "ANIMATE-WALL":
      square.style.backgroundColor = "cyan";
      square.style.animationName = "black_to_cyan"
      break;
    case "VISITED":
      square.style.backgroundColor = "gray";
      square.style.animationName = "black_to_gray";
      break;
    case "PATH":
      square.style.backgroundColor = "yellow";
      square.style.animationName = "gray_to_orange";
      break;
  }
} 