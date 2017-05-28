var React = require("react");

class Options extends React.Component {
    render() {
        return (
            <div className="Options">
                <div className="dimCol">
                    <h3>Columns:</h3>
                    <input placeholder="Number of columns" defaultValue='20' onChange={this.props.onChangeColumnNumber} type="number" name="columns" autoFocus required/> 
                </div>
                <div className="dimRow">
                    <h3>Rows:</h3>
                    <input placeholder="Number of rows" defaultValue='20' onChange={this.props.onChangeRowsNumber} type="number" name="rows" required/> 
                </div>
                <div className="intSettings">
                    <h3>Interval(in s):</h3>
                    <input placeholder="Duration of Generations (in s)" defaultValue='0.5' onChange={this.props.onChangeDuration} type="number" name="duration" required/> 
                </div>
                <div className="btnSettings">
                    <button name='start' onClick={this.props.onClickStartBtn}>Start</button>
                    <button name='next' onClick={this.props.onClickNexttBtn}>Next Gen</button>
                    <button name='pause' onClick={this.props.onClickPauseBtn} >Pause</button>
                    <button name='clear' onClick={this.props.onClickClearBtn} >Clear</button>
                    <button name='random' onClick={this.props.onClickRandomBtn} >Randomize</button>
                    <h4><a href="https://github.com/periman2/GameOfLife" target="_blank">Github Repository</a><em>  Created by </em><a href="https://github.com/periman2" target="_blank">Periklis Arnaoutis</a></h4>
                </div>
            </div>
        )
    }
}

module.exports = Options;