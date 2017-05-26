var React = require("react");
var Options = require("./Options");
var Grid = require("./Grid");

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            columns: 20,
            rows: 20,
            aliveBoxes: []
        }
        this.handleChangeColumns = this.handleChangeColumns.bind(this);
        this.handleChangeRows = this.handleChangeRows.bind(this);
        this.handleChangeOfGridDim = this.handleChangeOfGridDim.bind(this);
        this.handleBoxClick = this.handleBoxClick.bind(this);
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
            this.setState(state);
        }
    }
    handleBoxClick(ev){
        var boxIndex = Number(ev.target.getAttribute("value"));
        console.log(boxIndex);
    }
    render() {
        console.log(this.state);
        return (
            <div>
                <Options onChangeColumnNumber={this.handleChangeColumns} onChangeRowsNumber={this.handleChangeRows}/>
                <Grid onBoxClick={this.handleBoxClick} columns={this.state.columns} rows={this.state.rows}/>
            </div>
        )
    }
}

module.exports = Game;