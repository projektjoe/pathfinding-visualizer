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
        this.visitQueue = []
        this.visitQueuePrevious = [null]
        this.startPos = [0,0]
        this.endPos = [0,0]
        this.directions = ['up','right','down','left']
        this.directionCoordinate = {
            'up':[-1,0],
            'right':[0,1],
            'down':[1,0],
            'left':[0,-1]
        }
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

    #checkNodeValidity(Node){
        //example: Node = [0,1]
        // if x < 0 or > length then node is outside the board and invalid
        if(Node[0] < 0 || Node[0] >= this.numOfSquaresRow){
            return 0
        }
        if(Node[1] < 0 || Node[1] >= this.numOfSquaresColumn){
            return 0
        }
        if(elementIsInArray(Node, this.visitQueue)!==-1){
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
    breadthFirstSearch = async function(){
    let i = 0
        while (i<this.visitQueue.length){
            let currentNode = this.visitQueue[i]
            await sleep(this.speed);
            colorSquare(currentNode, "VISITED");
            this.board[currentNode[0]][currentNode[1]] = VISITED
            for(let direction of this.directions){
                let neighborNodeCoordinates = sumArray(this.directionCoordinate[direction], currentNode)
                let nodeValidity = this.#checkNodeValidity(neighborNodeCoordinates)
                if(nodeValidity){
                    this.visitQueue.push(neighborNodeCoordinates) 
                    this.visitQueuePrevious.push(currentNode)
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
        let index = this.visitQueue.length-1
        while(!arraysEqual(this.visitQueue[index],this.startPos)){
            index = elementIsInArray(this.visitQueuePrevious[index],this.visitQueue)
            colorSquare(this.visitQueue[index], "PATH")
            this.board[this.visitQueue[index][0]][this.visitQueue[index][1]] = PATH
            await sleep(this.speed+10);
        }

    }

    search = async function(){
        this.#getStartEndPositions()
        this.visitQueue.push(this.startPos)
        if(await this.breadthFirstSearch()){
            this.backtrack()    
        }
    }
}
    
