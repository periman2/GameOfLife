var React = require("react");
var Box = require('./Box');

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.numOfCells = this.props.dimentions.columns * this.props.dimentions.rows;
        this.rowConstructor = this.rowConstructor.bind(this);
    }
    rowConstructor(i, columns){
        var row = []
        for(var j = 0; j < columns; j ++){
            var boxIndex = j + 1 + columns * i;
            
            row.push(<th key={j}><Box isAlive={this.props.Boxes[boxIndex.toString()]} dimentions={this.props.dimentions} onBoxClick={this.props.onBoxClick} boxIndex={boxIndex} /></th>)
        }
        return row;
    }
    render(){
        var columns = this.props.dimentions.columns;
        var rows = [];
        for(var i = 0; i < this.props.dimentions.rows; i ++){
            rows.push(
                <tr key={i}>{this.rowConstructor(i, columns)}</tr>
            )
        }
        return(
            <div>
                <div className='gen'>
                    <h3>Generations: {this.props.generation}</h3>
                </div>
                <div className='grid'>
                    <table >
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

module.exports = Grid;