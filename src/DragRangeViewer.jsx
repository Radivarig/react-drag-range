const React = require('react')

const {
  Grid, Row,
} = require('react-bootstrap')

const DragRangeModifyEachProp = require('./Examples/DragRangeModifyEachProp.jsx')
const DragRangeSimplePercent = require('./Examples/DragRangeSimplePercent.jsx')
const DragRangeCssHighlight = require('./Examples/DragRangeCssHighlight.jsx')


const DragRangeViewer = React.createClass({
  render() {
    const rowStyle = {
      backgroundColor: '#ddd',
      textAlign: 'center',
    }
    return (
      <Grid>
        <Row style={rowStyle}><DragRangeModifyEachProp/></Row>
        <Row style={rowStyle}><DragRangeSimplePercent/></Row>
        <Row style={rowStyle}><DragRangeCssHighlight/></Row>
      </Grid>
    )
  }
})

module.exports = DragRangeViewer
