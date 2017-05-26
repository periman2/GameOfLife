var React = require("react");

class Options extends React.Component {
    render() {
        return (
            <div>
                <input placeholder="Number of columns" defaultValue='20' onChange={this.props.onChangeColumnNumber} type="number" name="columns" required/>
                <input placeholder="Number of rows" defaultValue='20' onChange={this.props.onChangeRowsNumber} type="number" name="rows" required/>
                <button name='start' >Start</button>
                <button name='stop' >Stop</button>
            </div>
        )
    }
}

module.exports = Options;