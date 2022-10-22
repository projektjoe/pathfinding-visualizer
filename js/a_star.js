class Node{
    constructor(Coordinates,distanceFromStartingPoint,Cost,Previous){
        this.Coordinates = Coordinates
        this.distanceFromStartingPoint = distanceFromStartingPoint
        this.Cost = Cost
        this.Previous = Previous
    }
}
class priorityQueue{
    constructor(){
        this.data = []
        this.visited = []
    }
    append(Node){
        this.data.push(Node)
    }
    deque(){
        let node = this.data[0]
        this.visited.push(node)
        this.data.shift()
        return node
    }
}

class aStar{
    constructor(board, speed, algo){
        this.board = board
        this.algo = algo
        this.numOfSquaresRow = this.board.length
        this.numOfSquaresColumn = this.board[0].length
        this.priorityQueue = new priorityQueue()
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
    #calculateHeuristic(Node1,Node2){
        return Math.sqrt((Node1[1] - Node2[1])**2 +(Node1[0] - Node2[0])**2)
    }
    #calculateDistFromStart(Node){
        return Math.sqrt((Node[1] - this.startPos[1])**2 +(Node[0] - this.startPos[0])**2)
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
    #nodeInQueue(node){
        for(let currentNode of this.priorityQueue.data){
            if (arraysEqual(currentNode.Coordinates,node)){
                return true;
            }
        }
        return false;
    }
    aStarSearch = async function(){
        this.priorityQueue.append(new Node(this.startPos,0,0+this.#calculateHeuristic(this.startPos,this.endPos), null))
        while(!arraysEqual(this.priorityQueue.data[0].Coordinates,this.endPos)){ // while we dont reach the end node
            await sleep(this.speed);

            let currentNode = this.priorityQueue.data[0].Coordinates
            colorSquare(currentNode, "VISITED")
            if (!this.board[currentNode[0]][currentNode[1]]===START){this.board[currentNode[0]][currentNode[1]] = VISITED;}
            let validNeighbors = this.#getValidNeighbors(currentNode)
            for(let currentNodeNeighbor of validNeighbors){
                let distFromStart = 1+this.priorityQueue.data[0].distanceFromStartingPoint
                let cost = this.#calculateHeuristic(currentNodeNeighbor,this.endPos) // +  distFromStart
                if (this.algo == "Dijkstra"){ cost += distFromStart}// this.#calculateDistFromStart(currentNodeNeighbor)}
                if(!this.#nodeInQueue(currentNodeNeighbor)){
                this.priorityQueue.append(new Node(currentNodeNeighbor,
                                                   distFromStart,
                                                   cost, 
                                                   this.priorityQueue.data[0]))                            
                }
            }  
            this.priorityQueue.deque()  
            this.priorityQueue.data.sort((a, b) => (a.Cost - b.Cost))
        }
    }
    backtrack = async function(){
        let currentNode = this.priorityQueue.visited[this.priorityQueue.visited.length - 1]
        while (!arraysEqual(currentNode.Coordinates,this.startPos)){
            await sleep(this.speed);
            colorSquare(currentNode.Coordinates,"PATH")
            this.board[currentNode.Coordinates[0]][currentNode.Coordinates[1]] = PATH
            currentNode = currentNode.Previous
            
        }
    }
    search = async function(){
        this.#getStartEndPositions()
        await this.aStarSearch()
        await this.backtrack()
    }

}
