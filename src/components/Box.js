var React = require("react");

class Box extends React.Component {
    render() {
        var biggestDimention = 0;
        var columns = this.props.dimentions.columns, rows = this.props.dimentions.rows
        if(columns > rows){
            biggestDimention = columns;
        } else {
            biggestDimention = rows;
        }
        var dimention = 1 + 4 / biggestDimention + "em";
        var boxStyle = {
            width: dimention,
            height: dimention,
            borderRadius: "0.1em"
        }
        if(this.props.isAlive.alive && !this.props.isAlive.old){
            boxStyle.backgroundColor = '#a73535';
        } else if (this.props.isAlive.alive && this.props.isAlive.old) {
            boxStyle.backgroundColor = '#7b4c4c';
        } else {
            boxStyle.backgroundColor = '#333333';
        }
        return (
            <div value={this.props.boxIndex} onClick={this.props.onBoxClick} style={boxStyle} className="Box">
            </div>
        )
    }
}

module.exports = Box;