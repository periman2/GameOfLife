var React = require("react");
var Options = require("./Options");
var Grid = require("./Grid");

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            columns: 10,
            rows: 10,
            Boxes: {},
            started: false
        }
        this.handleChangeColumns = this.handleChangeColumns.bind(this);
        this.handleChangeRows = this.handleChangeRows.bind(this);
        this.handleChangeOfGridDim = this.handleChangeOfGridDim.bind(this);
        this.handleBoxClick = this.handleBoxClick.bind(this);
        this.handleStartBtnClick = this.handleStartBtnClick.bind(this);
    }
    componentDidMount(){
        this.setState(function(prevState){
            var boxes = prevState.Boxes;
            var boxesNumber = prevState.columns * prevState.rows;
            for(var i = 1; i <= boxesNumber; i ++) {
                boxes[i] = false;
            }
            return {
                Boxes: boxes
            }
        });
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
            state.Boxes = {};
            this.setState(state);
        }
    }
    handleBoxClick(ev){
        var boxIndex = ev.target.getAttribute("value");
        this.setState(function(prevState){
            var boxes = prevState.Boxes;
            boxes[boxIndex] = !prevState.Boxes[boxIndex];
            return {Boxes: boxes};
        });
    }
    handleStartBtnClick(event){
        setInterval(function(){

        }, 1000);
    }
    render() {
        console.log(this.state);
        return (
            <div>
                <Options onClickStartBtn={this.handleStartBtnClick} onChangeColumnNumber={this.handleChangeColumns} onChangeRowsNumber={this.handleChangeRows}/>
                <Grid Boxes={this.state.Boxes} onBoxClick={this.handleBoxClick} columns={this.state.columns} rows={this.state.rows}/>
            </div>
        )
    }
}

module.exports = Game;