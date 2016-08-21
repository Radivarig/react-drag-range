var React = require('react')
var DragRange = require('./DragRange.jsx')

var DragRangeViewer = React.createClass({
  render() {
    return (
      <div>
        <DragRange>
          drag range
        </DragRange>
      </div>
    )
  }
})

module.exports = DragRangeViewer
