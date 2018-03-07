import React from 'react'
import DragRange from '../DragRange.jsx'

const DragRangeViewer = React.Component({
  getInitialState() {
    return {
      value: 23,
    }
  },

  render() {
    const chunks = 25
    const integerPart = Math.max(0, Math.floor(this.state.value /100 * chunks))
    let progressBar = new Array(integerPart +1).join('#')
    progressBar += new Array(chunks -integerPart +1).join('-')

    const shellStyle = {
      fontFamily: 'monospace',
      backgroundColor: '#000',
      color: '#fff',
    }

    const percentStyle = {
      textAlign: 'right',
      display: 'inline-block',
      width: 35,
    }

    return (
      <div>
        Shell progress bar&nbsp;
        <span style={shellStyle}>
          <DragRange
            percent
            value={this.state.value}
            onChange={(value)=> this.setState({value})}
          >
            <span style={{cursor: 'col-resize'}}>
              [{progressBar}]
           </span>
        </DragRange>
        <span style={Object.assign({}, percentStyle)}>{this.state.value}%</span>
        </span>
        &nbsp;from Linux terminals.
      </div>
    )
  }
})

export default DragRangeViewer
