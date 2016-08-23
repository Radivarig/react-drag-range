const React = require('react')

const DragRangeModifyEachProp = require('./Examples/DragRangeModifyEachProp.jsx')


const DragRangeViewer = React.createClass({
  render() {
    return (
      <div>
        <DragRangeModifyEachProp/>
      </div>
    )
  }
})

module.exports = DragRangeViewer
