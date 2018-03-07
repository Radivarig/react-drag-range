import React from 'react'
import DragRange from '../DragRange.jsx'

const DragRangeViewer = React.Component({
  getInitialState() {
    return {
      value: 3,
    }
  },

  setHover(value) {
    return (e) => {
      this.setState({hover: value})
    }
  },

  render() {
    const tangleStyle = {
      cursor: 'ew-resize',
      borderBottom: '1px dotted',
      color: 'royalBlue',
      position: 'relative',
    }

    // const hoverStyle ={
    //   position: 'absolute',
    //   left: '50%',
    //   fontSize: '0.8em',
    //   transform: 'translate(-50%, -50%)',
    // }
    // const hoverText = this.state.hover ? <span style={hoverStyle}>drag</span> : ''
    const hoverText = ''
 
    return (
      <div>
        This is a drag range component inspired by <a href='http://worrydream.com/Tangle/' target='_blank'>TangleJS</a>.
        <br/>
        If you eat &nbsp;
        <DragRange
          value={this.state.value}
          onChange={(value) => this.setState({value})}
          min={0}
        >
          <span style={tangleStyle}>
            {hoverText}
            <span ref='hover'
              onMouseOver={this.setHover(true)}
              onMouseOut={this.setHover(false)}
            >
              {this.state.value} cookies
            </span>
          </span>
        </DragRange>
        &nbsp; you consume {this.state.value * 50} calories.
      </div>
    )
  }
})

export default DragRangeViewer
