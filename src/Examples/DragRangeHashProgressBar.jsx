import React from "react"
import DragRange from "../DragRange.jsx"

class DragRangeViewer extends React.Component {
  state = {
    "value": 23,
  }

  render = () => {
    const chunks = 25
    const integerPart = Math.max (0, Math.floor (this.state.value / 100 * chunks))
    let progressBar = new Array (integerPart + 1).join ("#")
    progressBar += new Array (chunks - integerPart + 1).join ("-")

    const shellStyle = {
      "fontFamily": "monospace",
      "backgroundColor": "#000",
      "color": "#fff",
      "whiteSpace": "nowrap",
      "display": "inline-block",
      "marginLeft": 5,
      "marginRight": 5,
    }

    const percentStyle = {
      "textAlign": "right",
      "display": "inline-block",
      "width": 35,
    }

    return (
      <div>
        Shell progress bar
        <div style={shellStyle}>
          <DragRange
            percent
            value={this.state.value}
            onChange={(value) => this.setState ({ value })}
          >
            <span style={{ "cursor": "col-resize" }}>
              [{progressBar}]
            </span>
          </DragRange>
          <span style={Object.assign ({}, percentStyle)}>{this.state.value}%</span>
        </div>
        from Linux terminals.
      </div>
    )
  }
}

export default DragRangeViewer
