const NOTHING = 0
const WALL = 1
const START = 2
const END = 3

class BFS{
    constructor(board){
      this.board = board
      this.numOfSquaresRow = this.board.length
      this.NumOfSquaresColumn = this.board[0].length
      this.visitedNodes = []
      this.NeighborsToVisitQueue = []
      this.startPos = [0,0]
      this.endPos = [0,0]
      
    }
    #getStartEndPositions(){
        for(let i=0; i<this.numOfSquaresRow; i++){
            for(let j = 0; j < this.NumOfSquaresColumn; j++){
                if (this.board[i][j] === START){
                    this.startPos = [i,j]
                }
                if (this.board[i][j] === END){   
                    this.endPos = [i,j]
                }
            }
        }
    }
    search(){
        this.#getStartEndPositions()
    // get start position
    // add start to the neighborstovisitqueue
    // loop
    // if the first item in the neighborstovisitqueue isnt the end node, 
    // then find its neighbors that are left, up right down, not walls, not outside map, not in visited and not in neighborstovsisitqueue
    // append the nodes (right and down in this case) to the neighborstovisitqueue
    // dequeue the node and append it to visited
    // end loop
    }
  }
  
