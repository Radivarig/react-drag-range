const React = require('react')

const {
  Grid, Row,
} = require('react-bootstrap')

const DragRangeModifyEachProp = require('./Examples/DragRangeModifyEachProp.jsx')
const DragRangeTangleJS = require('./Examples/DragRangeTangleJS.jsx')
const DragRangeSimplePercent = require('./Examples/DragRangeSimplePercent.jsx')
const DragRangeHashProgressBar = require('./Examples/DragRangeHashProgressBar.jsx')
const DragRangeCssHighlight = require('./Examples/DragRangeCssHighlight.jsx')
const DragRangeAnalogStick = require('./Examples/DragRangeAnalogStick.jsx')
const DragRangeKnobControl = require('./Examples/DragRangeKnobControl.jsx')
const DragRangeSliderVertical = require('./Examples/DragRangeSliderVertical.jsx')
const DragRangeHorizontalSliders = require('./Examples/DragRangeHorizontalSliders.jsx')

const DragRangeViewer = React.createClass({
  render() {
    const rowStyle = {
      backgroundColor: '#ddd',
      textAlign: 'center',
      margin: 10,
      padding: 20,
      boxShadow: '0px 5px 10px #888',
    }
    return (
      <Grid style={{textAlign: 'center'}}>

        <h1>React Drag Range</h1>

        <Row style={rowStyle}>
          Drag Range is a React component that provides detection for click/drag rate changes and callbacks with value/delta/percent changes for both X and Y axis.
        </Row>

        <h1>Examples</h1>

        <Row style={rowStyle}><DragRangeModifyEachProp/></Row>
        <Row style={rowStyle}><DragRangeTangleJS/></Row>
        <Row style={rowStyle}><DragRangeSimplePercent/></Row>
        <Row style={rowStyle}><DragRangeHashProgressBar/></Row>
        <Row style={rowStyle}><DragRangeCssHighlight/></Row>
        <Row style={rowStyle}><DragRangeAnalogStick/></Row>
        <Row style={rowStyle}><DragRangeKnobControl/></Row>
        <Row style={rowStyle}><DragRangeSliderVertical/></Row>
        <Row style={rowStyle}><DragRangeHorizontalSliders/></Row>
      </Grid>
    )
  }
})

module.exports = DragRangeViewer
