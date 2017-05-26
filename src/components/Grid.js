var React = require("react");
var Box = require('./Box');

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.numOfCells = this.props.columns * this.props.rows;
        this.rowConstructor = this.rowConstructor.bind(this);
    }
    rowConstructor(i, columns){
        var row = []
        for(var j = 0; j < columns; j ++){
            var boxIndex = j + 1 + columns * i;
            row.push(<th key={j}><Box isAlive={this.props.Boxes[boxIndex.toString()]} onBoxClick={this.props.onBoxClick} boxIndex={boxIndex} /></th>)
        }
        return row;
    }
    render(){
        var columns = this.props.columns;
        var rows = [];
        for(var i = 0; i < this.props.rows; i ++){
            rows.push(
                <tr key={i}>{this.rowConstructor(i, columns)}</tr>
            )
        }
        return(
            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}

module.exports = Grid;