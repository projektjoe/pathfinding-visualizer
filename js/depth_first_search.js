class DFS{
    constructor(board,speed){
        this.board = board
        this.numOfSquaresRow = this.board.length
        this.numOfSquaresColumn = this.board[0].length
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
        if(this.board[Node[0]][Node[1]]===VISITED){
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
    #getValidNeighbors(currentNode){
        let validNodes = []
        for(let direction of this.directions){
            let neighborNodeCoordinates = sumArray(this.directionCoordinate[direction], currentNode)
            let nodeValidity = this.#checkNodeValidity(neighborNodeCoordinates)
            if (nodeValidity){
                validNodes.push(neighborNodeCoordinates)
            }
        }
        return validNodes
    }
    depthFirstSearch = async function(currentNode){
        if(this.board[currentNode[0]][currentNode[1]] === END){
            let path = [null]
            path.push(currentNode)
            return path
        }
        colorSquare(currentNode, "VISITED");
        await sleep(this.speed+10)
        if (!this.board[currentNode[0]][currentNode[1]]===START){this.board[currentNode[0]][currentNode[1]] = VISITED;}

        let validNodes = this.#getValidNeighbors(currentNode)
        for(let Node of validNodes){
            let path = await this.depthFirstSearch(Node)
            if (!(path === null)){
                path.push(currentNode)
                return path
            }
        }
        return null
    }
    animatePath = async function(path){
        path.shift()
        for(let Node of path){
            await sleep(this.speed)
            colorSquare(Node, "PATH")
            this.board[Node[0]][Node[1]] = PATH;
        }
    }

    search = async function(){
        this.#getStartEndPositions()
        let path = await this.depthFirstSearch(this.startPos)
        debugger;
        this.animatePath(path)
    }
}
    

