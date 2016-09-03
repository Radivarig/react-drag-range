const React = require('react')
const DragRange = require('../DragRange.jsx')

const DragRangeViewer = React.createClass({
  getInitialState() {
    return {
      value: 23,
    }
  },

  getHashProgressBar () {
    const chunks = 25
    const integerPart = Math.max(0, Math.floor(this.state.value /100 * chunks))
    let progressBar = new Array(integerPart +1).join('#')
    progressBar += new Array(chunks -integerPart +1).join('_')
    const style = {
      cursor: 'col-resize',
      fontFamily: 'monospace',
      backgroundColor: '#000',
      color: '#fff',
    }
    return (
      <span style={style}>
        [{progressBar}]
      </span>
    )
  },

  render() {
    return (
      <div>
        Char progress bar&nbsp;
        <DragRange
          percent
          value={this.state.value}
          onChange={(value)=> this.setState({value})}
        >
          <span style={{cursor: 'ew-resize'}}>
            {this.getHashProgressBar()}
          </span>
        </DragRange>
        &nbsp; <span style={{display: 'inline-block', width: 30}}> {this.state.value}%</span>
      </div>
    )
  }
})

module.exports = DragRangeViewer
