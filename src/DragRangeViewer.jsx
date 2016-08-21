var React = require('react')
var DragRange = require('./DragRange.jsx')

var DragRangeViewer = React.createClass({
  render() {
    const rangeContentStyle = {
      cursor: 'ew-resize',
    }

    return (
      <div>
        <DragRange>
          <span style={rangeContentStyle}>
            drag range
          </span>
        </DragRange>
      </div>
    )
  }
})

module.exports = DragRangeViewer
