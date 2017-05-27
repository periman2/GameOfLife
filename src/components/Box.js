var React = require("react");

class Box extends React.Component {
    render() {
        var boxStyle = {
            width: '1vw',
            height: '1vw'
        }
        if(this.props.isAlive.alive && !this.props.isAlive.old){
            boxStyle.backgroundColor = '#c3dcea';
        } else if (this.props.isAlive.alive && this.props.isAlive.old) {
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