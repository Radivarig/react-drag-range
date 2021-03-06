import React from "react"

import DragRangeModifyEachProp from "./Examples/DragRangeModifyEachProp.jsx"
import DragRangeTangleJS from "./Examples/DragRangeTangleJS.jsx"
import DragRangeSimplePercent from "./Examples/DragRangeSimplePercent.jsx"
import DragRangeHashProgressBar from "./Examples/DragRangeHashProgressBar.jsx"
import DragRangeCssHighlight from "./Examples/DragRangeCssHighlight.jsx"
import DragRangeAnalogStick from "./Examples/DragRangeAnalogStick.jsx"
import DragRangeKnobControl from "./Examples/DragRangeKnobControl.jsx"
import DragRangeSliderVertical from "./Examples/DragRangeSliderVertical.jsx"
import DragRangeHorizontalSliders from "./Examples/DragRangeHorizontalSliders.jsx"

export default () => {
  const rowStyle = {
    "backgroundColor": "#eee",
    "textAlign": "center",
    "margin": 10,
    "padding": 20,
    "boxShadow": "0px 5px 10px #888",
  }
  return (
    <div style={{ "textAlign": "center" }}>

      <div style={rowStyle}><DragRangeModifyEachProp /></div>
      <div style={rowStyle}><DragRangeTangleJS /></div>
      <div style={rowStyle}><DragRangeSimplePercent /></div>
      <div style={rowStyle}><DragRangeHashProgressBar /></div>
      <div style={rowStyle}><DragRangeCssHighlight /></div>
      <div style={rowStyle}><DragRangeAnalogStick /></div>
      <div style={rowStyle}><DragRangeKnobControl /></div>
      <div style={rowStyle}><DragRangeSliderVertical /></div>
      <div style={rowStyle}><DragRangeHorizontalSliders /></div>

    </div>
  )
}
