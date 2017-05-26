var React = require("react");

class Box extends React.Component {
    render() {
        var boxStyle = {
            width: '20px',
            height: '20px'
        }
        if(this.props.isAlive){
            boxStyle.backgroundColor = '#dbd15c';
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