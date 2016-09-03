const React = require('react')

const {
  Grid, Row,
} = require('react-bootstrap')

const DragRangeModifyEachProp = require('./Examples/DragRangeModifyEachProp.jsx')
const DragRangeSimplePercent = require('./Examples/DragRangeSimplePercent.jsx')
const DragRangeHashProgressBar = require('./Examples/DragRangeHashProgressBar.jsx')
const DragRangeCssHighlight = require('./Examples/DragRangeCssHighlight.jsx')
const DragRangeAnalogStick = require('./Examples/DragRangeAnalogStick.jsx')


const DragRangeViewer = React.createClass({
  render() {
    const rowStyle = {
      backgroundColor: '#ddd',
      textAlign: 'center',
      margin: 20,
    }
    return (
      <Grid>
        <Row style={rowStyle}><DragRangeModifyEachProp/></Row>
        <Row style={rowStyle}><DragRangeSimplePercent/></Row>
        <Row style={rowStyle}><DragRangeHashProgressBar/></Row>
        <Row style={rowStyle}><DragRangeCssHighlight/></Row>
        <Row style={rowStyle}><DragRangeAnalogStick/></Row>
      </Grid>
    )
  }
})

module.exports = DragRangeViewer
