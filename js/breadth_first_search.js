const NOTHING = 0
const WALL = 1
const START = 2
const END = 3
const VISITED = 4
const PATH = 5
const speeds = {"Fast":1,
                "Medium":250,
                "Slow":500
                }
class BFS{
    constructor(board, speed){
        this.board = board
        this.numOfSquaresRow = this.board.length
        this.numOfSquaresColumn = this.board[0].length
        this.visitedNodes = []
        this.visitedNodesPrevious = [null]
        this.startPos = [0,0]
        this.endPos = [0,0]
        this.directions = ['up','right','down','left']
        this.directionCoordinate = {
            'up':[-1,0],
            'right':[0,1],
            'down':[1,0],
            'left':[0,-1]
        }
        this.speed = speed
        this.speed = speeds[speed]
    }
    #getStartEndPositions(){
        for(let i=0; i<this.numOfSquaresRow; i++){
            for(let j = 0; j < this.numOfSquaresColumn; j++){
                if (this.board[i][j] === START){
                    this.startPos = [i,j]
                }
                if (this.board[i][j] === END){   
                    this.endPos = [i,j]
                }
            }
        }
    }
    #sumArray(a, b) {
        var c = [];
        for (var i = 0; i < Math.max(a.length, b.length); i++) {
          c.push((a[i] || 0) + (b[i] || 0));
        }
        return c;
    }
    #arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
      }
    #elementIsInArray(Element,Array){
        for (let i =0; i<Array.length; i++){
            if(this.#arraysEqual(Array[i],Element)){
                return i;
            }
        }
        return -1;
    }
    #checkNodeValidity(Node){
        //example: Node = [0,1]
        // if x < 0 or > length then node is outside the board and invalid
        if(Node[0] < 0 || Node[0] >= this.numOfSquaresRow){
            return 0
        }
        if(Node[1] < 0 || Node[1] >= this.numOfSquaresColumn){
            return 0
        }
        if(this.#elementIsInArray(Node, this.visitedNodes)!==-1){
            return 0 //already visited
        }
        if(this.board[Node[0]][Node[1]] === WALL){
            return 0 //this node is a wall
        }
        if(this.board[Node[0]][Node[1]] === END){
            return END // found!!
        }
        return 1; //valid node

    }
    visitNodes = async function(){
    let i = 0
        while (i<this.visitedNodes.length){
            let currentNode = this.visitedNodes[i]
            await sleep(this.speed);
            colorSquare(currentNode, "VISITED");
            this.board[currentNode[0]][currentNode[1]] = VISITED
            for(let direction of this.directions){
                let neighborNodeCoordinates = this.#sumArray(this.directionCoordinate[direction], currentNode)
                let nodeValidity = this.#checkNodeValidity(neighborNodeCoordinates)
                if(nodeValidity){
                    this.visitedNodes.push(neighborNodeCoordinates) 
                    this.visitedNodesPrevious.push(currentNode)
                    if(nodeValidity===END){
                        return 1;
                    }
                }
            }
            i++
        }
    return 0; // no goal node was found or reached
    }
    backtrack = async function(){
        let index = this.visitedNodes.length-1
        while(!this.#arraysEqual(this.visitedNodes[index],this.startPos)){
            index = this.#elementIsInArray(this.visitedNodesPrevious[index],this.visitedNodes)
            colorSquare(this.visitedNodes[index], "PATH")
            this.board[this.visitedNodes[index][0]][this.visitedNodes[index][1]] = PATH
            await sleep(this.speed+10);
        }

    }

    search = async function(){
        this.#getStartEndPositions()
        this.visitedNodes.push(this.startPos)
        if(await this.visitNodes()){
            this.backtrack()    
        }
    }
}
    
