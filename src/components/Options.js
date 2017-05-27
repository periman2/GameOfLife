var React = require("react");

class Options extends React.Component {
    render() {
        return (
            <div>
                <h3>Columns:</h3>
                <input placeholder="Number of columns" defaultValue='10' onChange={this.props.onChangeColumnNumber} type="number" name="columns" required/>
                <h3>Rows:</h3>
                <input placeholder="Number of rows" defaultValue='10' onChange={this.props.onChangeRowsNumber} type="number" name="rows" required/>
                <h3>Interval between Generations(in s):</h3>
                <input placeholder="Duration of Generations (in s)" defaultValue='0.5' onChange={this.props.onChangeDuration} type="number" name="duration" required/>
                <button name='start' onClick={this.props.onClickStartBtn}>Start Evolution</button>
                <button name='next' onClick={this.props.onClickNexttBtn}>Next Generation</button>
                <button name='pause' onClick={this.props.onClickPauseBtn} >Pause</button>
                <button name='clear' onClick={this.props.onClickClearBtn} >Clear</button>
            </div>
        )
    }
}

module.exports = Options;