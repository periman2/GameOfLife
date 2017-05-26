var React = require("react");

class Box extends React.Component {
    render() {
        var boxStyle = {
            width: '15px',
            height: '15px'
        }
        if(this.props.isAlive){
            boxStyle.backgroundColor = '#4a96bf';
        } else {
            boxStyle.backgroundColor = '#454545';
        }
        return (
            <div value={this.props.boxIndex} onClick={this.props.onBoxClick} style={boxStyle} className="Box">
            </div>
        )
    }
}

module.exports = Box;