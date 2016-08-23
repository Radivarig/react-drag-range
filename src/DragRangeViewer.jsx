const React = require('react')

const {
  Grid
} = require('react-bootstrap')

const DragRangeModifyEachProp = require('./Examples/DragRangeModifyEachProp.jsx')


const DragRangeViewer = React.createClass({
  render() {
    return (
      <Grid>
        <DragRangeModifyEachProp/>
      </Grid>
    )
  }
})

module.exports = DragRangeViewer
