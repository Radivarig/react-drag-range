import React from "react"
import DragRange from "../DragRange.jsx"

class DragRangeViewer extends React.Component {
  state = {
    "value": 0,
  }

  onChange = (key, e) => {
    const value = e && e.target ? e.target.value : e
    const s = {}
    s[key] = value
    this.setState (s)
  }

  render = () => (
    <div>
        This is a&nbsp;
      <DragRange
        percent
        value={this.state.value}
        onChange={this.onChange.bind (this, "value")}
      >
        <span style={{ "cursor": "ew-resize", "borderBottom": "1px dotted #000" }}>
            simple percent component
        </span>
      </DragRange>
        &nbsp;({this.state.value})
    </div>
  )
}

export default DragRangeViewer
