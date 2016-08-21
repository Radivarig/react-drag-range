var React = require('react')
var DragRange = require('./DragRange.jsx')

var DragRangeViewer = React.createClass({
  render() {
    const rangeContentStyle = {
      cursor: 'ew-resize',
    }

    return (
      <div>
        <DragRange
          changePercent={(a, e)=>console.log('percent', a)}
          changeX={(a, e)=>console.log('change x', a)}
          changeY={(a, e)=>console.log('change y', a)}
          dragStart={(e)=>console.log('drag start')}
          dragEnd={(e)=>console.log('drag end')}
        >
          <span style={rangeContentStyle}>
            drag range
          </span>
        </DragRange>
      </div>
    )
  }
})

module.exports = DragRangeViewer
