var React = require("react");
var Options = require("./Options");
var Grid = require("./Grid");

class Game extends React.Component {
    constructor(props){
        super(props);
        var boxes = {};
        var boxesNumber = 100;
        for(var i = 1; i <= boxesNumber; i ++) {
            boxes[i] = {alive: false, neighbors: 0, old: false};
        }
        this.state = {
            columns: 10,
            rows: 10,
            Boxes: boxes,
            started: false,
            generation: 0
        }
        this.handleChangeColumns = this.handleChangeColumns.bind(this);
        this.handleChangeRows = this.handleChangeRows.bind(this);
        this.handleChangeOfGridDim = this.handleChangeOfGridDim.bind(this);
        this.handleBoxClick = this.handleBoxClick.bind(this);
        this.handleNextBtnClick = this.handleNextBtnClick.bind(this);
        this.handleStartBtnClick = this.handleStartBtnClick.bind(this);
        this.checkIfAlive = this.checkIfAlive.bind(this);
        this.findAliveNeighborsNumber = this.findAliveNeighborsNumber.bind(this);
        // this.handleClearAll = this.handleClearAll.bind(this);
        this.initiateBoxes = this.initiateBoxes.bind(this);
        this.updateBoxes = this.updateBoxes.bind(this);
    }
    handleChangeColumns(ev){
        var columnsNum = ev.target.value;
        this.handleChangeOfGridDim('columns', columnsNum);
    }
    handleChangeRows(ev) {
        var rowsNum = ev.target.value;
        this.handleChangeOfGridDim('rows', rowsNum);
    }
    handleChangeOfGridDim(dimention, num){
        if(num <= 100 && num >= 2){
            var state = {}
            state[dimention] = Math.floor(Number(num));
            state.Boxes = this.initiateBoxes(dimention, num);
            console.log(state);
            this.setState(state);
        }
    }
    // handleClearAll(){
    //     var boxes = this.initiateBoxes();
    //     this.setState({
    //         Boxes: boxes, started: false
    //     })
    // }
    initiateBoxes(dim, num){
        var boxes = {};
        var boxesNumber = 100;
        if(dim === 'rows'){
            boxesNumber = num * this.state.columns;
        } else {
            boxesNumber = num * this.state.rows;
        }
        
        for(var i = 1; i <= boxesNumber; i ++) {
            boxes[i] = {alive: false, neighbors: 0};
        }
        return boxes;
    }
    handleBoxClick(ev){
        var boxIndex = ev.target.getAttribute("value");
        this.setState(function(prevState){
            var boxes = prevState.Boxes;
            boxes[boxIndex].alive = !prevState.Boxes[boxIndex].alive;
            boxes[boxIndex].old = false;
            boxes[boxIndex].neighbors = this.findAliveNeighborsNumber(Number(boxIndex));
            // console.log(boxes[boxIndex].neighbors);
            return {Boxes: boxes};
        });
    }
    handleNextBtnClick(){
        this.updateBoxes();
        // setInterval(function(){

        // }, 1000);
    }
    handleStartBtnClick(){

    }
    updateBoxes(){
        var boxes = this.state.Boxes;
        for (var boxIndex in boxes){
            var numIndex = Number(boxIndex);
            var box = boxes[boxIndex];
            box.neighbors = this.findAliveNeighborsNumber(numIndex);
            //logic to keep alive to kill or to birth a box
            box.old = false;
            if(box.alive){
                if (box.neighbors !== 2 && box.neighbors !== 3){
                    box.alive = false;
                } else {
                    box.old = true;
                }
            } else {
                if (box.neighbors === 3){
                    box.alive = true;
                }
            }
            boxes[boxIndex] = box;
        }
        this.setState(function(prevState){
            return {Boxes: boxes, generation: prevState.generation + 1}
        });
        // return boxes;
    }
    findAliveNeighborsNumber(boxIndex){
        var columns = this.state.columns;
        var numOfAliveNeighbors = 0;
        // console.log(boxIndex);
        
        numOfAliveNeighbors = this.checkUp(boxIndex, numOfAliveNeighbors, columns);
        numOfAliveNeighbors = this.checkLeft(boxIndex, numOfAliveNeighbors, columns);
        numOfAliveNeighbors = this.checkRight(boxIndex, numOfAliveNeighbors, columns);
        numOfAliveNeighbors = this.checkDown(boxIndex, numOfAliveNeighbors, columns);
        numOfAliveNeighbors = this.checkUpLeft(boxIndex, numOfAliveNeighbors, columns);
        numOfAliveNeighbors = this.checkUpRight(boxIndex, numOfAliveNeighbors, columns);
        numOfAliveNeighbors = this.checkDownLeft(boxIndex, numOfAliveNeighbors, columns);
        numOfAliveNeighbors = this.checkDownRight(boxIndex, numOfAliveNeighbors, columns);

        return numOfAliveNeighbors;

    }
    checkUp(boxIndex, num, columns){
        if(boxIndex > columns){
            if(this.checkIfAlive(boxIndex - columns)) {
                num ++
                // console.log("UP")
            }
        }
        return num;
    }
    checkRight(boxIndex, num, columns){
        if(boxIndex % columns !== 0){
            if(this.checkIfAlive(boxIndex + 1)) {
                num ++
                // console.log("RI")
            }
        }
        return num;
    }
    checkLeft(boxIndex, num, columns){
        if((boxIndex - 1) % columns !== 0){
            if(this.checkIfAlive(boxIndex - 1)) {
                num ++
                // console.log("LE")
            }
        }
        return num;
    }
    checkDown(boxIndex, num, columns){
        var rows = this.state.rows;
        if(boxIndex <= (columns * (rows - 1))){
            if(this.checkIfAlive(boxIndex + columns)) {
                num ++
                // console.log("DO")
            }
        }
        return num;
    }
    checkUpLeft(boxIndex, num, columns){
        if((boxIndex > columns) && ((boxIndex - 1) % columns !== 0)){
            if(this.checkIfAlive(boxIndex - columns - 1)) {
                num ++
                // console.log("UL")
            }
        }
        return num;
    }
    checkUpRight(boxIndex, num, columns){
        if((boxIndex % columns !== 0) && (boxIndex > columns)){
            if(this.checkIfAlive(boxIndex - columns + 1)) {
                num ++
                // console.log("UR")
            }
        }
        return num;
    }
    checkDownRight(boxIndex, num, columns){
        var rows = this.state.rows;
        if(boxIndex <= (columns * (rows - 1)) && (boxIndex % columns !== 0)){
            if(this.checkIfAlive(boxIndex + columns + 1)) {
                num ++
                // console.log("DR")
            }
        }
        return num;
    }
    checkDownLeft(boxIndex, num, columns){
        var rows = this.state.rows;
        if(boxIndex <= (columns * (rows - 1)) && ((boxIndex - 1) % columns !== 0)){
            if(this.checkIfAlive(boxIndex + columns - 1)) {
                num ++
                // console.log("DL")
            }
        }
        return num;
    }
    checkIfAlive(boxIndex){
        if(this.state.Boxes[boxIndex].alive){
            return true
        }
    }
    render() {
        console.log(this.state);
        return (
            <div>
                <Options 
                onClickStartBtn={this.handleStartBtnClick} 
                onClickNexttBtn={this.handleNextBtnClick} 
                onChangeColumnNumber={this.handleChangeColumns} 
                onChangeRowsNumber={this.handleChangeRows}/>
                <Grid generation={this.state.generation} 
                Boxes={this.state.Boxes} 
                onBoxClick={this.handleBoxClick} 
                columns={this.state.columns} 
                rows={this.state.rows}/>
            </div>
        )
    }
}

module.exports = Game;