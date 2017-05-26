var React = require("react");

class Options extends React.Component {
    render() {
        return (
            <div>
                <input placeholder="Number of columns" defaultValue='10' onChange={this.props.onChangeColumnNumber} type="number" name="columns" required/>
                <input placeholder="Number of rows" defaultValue='10' onChange={this.props.onChangeRowsNumber} type="number" name="rows" required/>
                <button name='start' onClick={this.props.onClickStartBtn}>Start</button>
                <button name='pause' >Pause</button>
                <button name='clear' >Clear</button>
            </div>
        )
    }
}

module.exports = Options;