var React = require('react')
var DragRange = require('./DragRange.jsx')

var DragRangeViewer = React.createClass({
  render() {
    return (
      <div>
        <DragRange />
      </div>
    )
  }
})

module.exports = DragRangeViewer
