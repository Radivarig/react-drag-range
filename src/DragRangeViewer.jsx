const React = require('react')

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
      backgroundColor: '#eee',
      textAlign: 'center',
      margin: 10,
      padding: 20,
      boxShadow: '0px 5px 10px #888',
    }
    return (
      <div style={{textAlign: 'center'}}>

        <h1>React Drag Range</h1>

        <div style={rowStyle}>
          Drag Range is a React component that provides detection for click/drag rate changes and callbacks with value/delta/percent changes for both X and Y axis.
        </div>

        <h1>Examples</h1>

        <div style={rowStyle}><DragRangeModifyEachProp/></div>
        <div style={rowStyle}><DragRangeTangleJS/></div>
        <div style={rowStyle}><DragRangeSimplePercent/></div>
        <div style={rowStyle}><DragRangeHashProgressBar/></div>
        <div style={rowStyle}><DragRangeCssHighlight/></div>
        <div style={rowStyle}><DragRangeAnalogStick/></div>
        <div style={rowStyle}><DragRangeKnobControl/></div>
        <div style={rowStyle}><DragRangeSliderVertical/></div>
        <div style={rowStyle}><DragRangeHorizontalSliders/></div>
      </div>
    )
  }
})

module.exports = DragRangeViewer
