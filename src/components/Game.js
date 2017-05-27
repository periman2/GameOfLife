var React = require("react");
var Options = require("./Options");
var Grid = require("./Grid");

class Game extends React.Component {
    constructor(props){
        super(props);
        var boxes = {};
        var boxesNumber = 400;
        for(var i = 1; i <= boxesNumber; i ++) {
            boxes[i] = {alive: false, neighbors: 0, old: false};
        }
        this.state = {
            columns: 20,
            rows: 20,
            Boxes: boxes,
            generation: 0,
            speed: 1
        }
        this.started = false;
        this.handleChangeColumns = this.handleChangeColumns.bind(this);
        this.handleChangeRows = this.handleChangeRows.bind(this);
        this.handleChangeOfGridDim = this.handleChangeOfGridDim.bind(this);
        this.handleBoxClick = this.handleBoxClick.bind(this);
        this.handleNextBtnClick = this.handleNextBtnClick.bind(this);
        this.handleStartBtnClick = this.handleStartBtnClick.bind(this);
        this.handlePauseBtnClick = this.handlePauseBtnClick.bind(this);
        this.checkIfAlive = this.checkIfAlive.bind(this);
        this.findAliveNeighborsNumber = this.findAliveNeighborsNumber.bind(this);
        this.checkForholocaust = this.checkForHolocaust.bind(this);
        this.handleClearAll = this.handleClearAll.bind(this);
        this.initiateBoxes = this.initiateBoxes.bind(this);
        this.updateBoxes = this.updateBoxes.bind(this);
        this.loop = null;
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
    handleClearAll(){
        var boxes = this.initiateBoxes('columns', this.state.columns);
        this.setState({
            Boxes: boxes, started: false, generation: 0
        })
    }
    initiateBoxes(dim, num){
        var boxes = {};
        var boxesNumber = 400;
        if(dim === 'rows'){
            boxesNumber = num * this.state.columns;
        } else {
            boxesNumber = num * this.state.rows;
        }
        
        for(var i = 1; i <= boxesNumber; i ++) {
            boxes[i] = {alive: false, neighbors: 0, old: false};
        }
        return boxes;
    }
    handleBoxClick(ev){
        var boxIndex = ev.target.getAttribute("value");
        this.setState(function(prevState){
            var boxes = prevState.Boxes;
            boxes[boxIndex].alive = !prevState.Boxes[boxIndex].alive;
            boxes[boxIndex].old = false;
            // boxes[boxIndex].neighbors = this.findAliveNeighborsNumber(Number(boxIndex));
            return {Boxes: boxes};
        });
    }
    handleNextBtnClick(){
        if(this.started){
            return false;
        }
        this.updateBoxes();
    }
    handleStartBtnClick(){
        var deadOrNot = this.checkForHolocaust();
        console.log(deadOrNot);
        if(deadOrNot){
            return alert("You need to make at least one cell alive first");
        }
        this.started = true;
        this.loop = setInterval(this.updateBoxes, this.state.speed * 1000);
    }
    handlePauseBtnClick(){
        if(this.started){
            clearInterval(this.loop);
            this.started = false;
        }
    }
    checkForHolocaust(){
        var areTheyAllDead = true
        var boxes = this.state.Boxes;
        for (var box in boxes){
            if(boxes[box].alive){
                areTheyAllDead = false;
                break;
            }
        }
        return areTheyAllDead;
    }
    updateBoxes(){
        console.log("im in update")
        var deadOrNot = this.checkForHolocaust();
        if(deadOrNot){
            clearInterval(this.loop);
            this.setState(function(prevState){
                return{
                    Boxes: this.initiateBoxes("rows", prevState.rows),
                    generation: 0,
                    started: false
                }
            })
        } else {
            
            this.setState(function(prevState){
                var boxes = prevState.Boxes;
                for (var boxIndex in boxes){
                    var numIndex = Number(boxIndex);
                    var box = boxes[boxIndex];
                    box.neighbors = this.findAliveNeighborsNumber(numIndex);
                    //logic to keep alive to kill or to birth a box
                    box.old = false;
                    
                    
                    boxes[boxIndex] = box;
                }
                for (var boxIndex2 in boxes){
                    var box2 = boxes[boxIndex2];
                    if(box2.alive){
                        if ((box2.neighbors !== 2) && (box2.neighbors !== 3)){
                            box2.alive = false;
                        } else {
                            box2.old = true;
                        }
                    } else {
                        if (box2.neighbors === 3){
                            box2.alive = true;
                        }
                    }
                    boxes[boxIndex2] = box2;
                }
                return {Boxes: boxes, generation: prevState.generation + 1, started: this.started}
            });
        }

        // return boxes;
    }
    findAliveNeighborsNumber(boxIndex){
        var columns = this.state.columns;
        var numOfAliveNeighbors = 0;
        
        numOfAliveNeighbors = this.checkUp(boxIndex, 0, columns);
        
        return numOfAliveNeighbors;
    }
    checkUp(boxIndex, num, columns){
        var rows = this.state.rows;
        var number = num;
        
        if(boxIndex > columns){
            if(this.checkIfAlive(boxIndex - columns)) {
                number ++
                //console.log("UP")
            }
        }
        if(boxIndex % columns !== 0){
            if(this.checkIfAlive(boxIndex + 1)) {
                number ++
                //console.log("RI")
            }
        }
        if(((boxIndex - 1) % columns) !== 0){
            var index = boxIndex - 1;
            if(this.checkIfAlive(index)) {
                number ++;
                //console.log("LE");
            }
        }
        if(boxIndex <= (columns * (rows - 1))){
            if(this.checkIfAlive(boxIndex + columns)) {
                number ++;
                //console.log("DO");
            }
        }
        if((boxIndex > columns) && ((boxIndex - 1) % columns !== 0)){
            if(this.checkIfAlive(boxIndex - columns - 1)) {
                number ++
                //console.log("UL")
            }
        }
        if((boxIndex % columns !== 0) && (boxIndex > columns)){
            if(this.checkIfAlive(boxIndex - columns + 1)) {
                number ++
                //console.log("UR")
            }
        }
        if(boxIndex <= (columns * (rows - 1)) && (boxIndex % columns !== 0)){
            if(this.checkIfAlive(boxIndex + columns + 1)) {
                number ++
                //console.log("DR")
            }
        }
        if(boxIndex <= (columns * (rows - 1)) && ((boxIndex - 1) % columns !== 0)){
            if(this.checkIfAlive(boxIndex + columns - 1)) {
                number ++
                //console.log("DL")
            }
        }
        return number;
    }
    checkIfAlive(MyIndex){
        if(this.state.Boxes[MyIndex.toString()].alive){
            return true;
        } 
        return false;
    }
    render() {
        console.log(this.state);
        return (
            <div>
                <Options 
                onClickStartBtn={this.handleStartBtnClick} 
                onClickNexttBtn={this.handleNextBtnClick}
                onClickPauseBtn={this.handlePauseBtnClick}
                onClickClearBtn={this.handleClearAll}
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