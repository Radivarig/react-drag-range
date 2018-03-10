import React from "react"
import DragRange from "../DragRange.jsx"

class DragRangeViewer extends React.Component {
  state = {
    "value": 23,
  }

  render = () => {
    const width = 200
    const borderWidth = 2
    const sliderStyle = {
      width,
      "height": "0.7em",
      "cursor": "pointer",
      "display": "inline-block",
      "border": `${borderWidth}px solid black`,
      "backgroundImage": `radial-gradient(circle at ${
        this.state.value}% 50%, #5577dd, black)`,
    }

    const indicatorStyle = {
      "width": 8,
      "cursor": "ew-resize",
      "height": 18,
      "border": "2px solid black",
      "position": "relative",
      "left": (this.state.value / 100 * width) - borderWidth,
      "top": "50%",
      "transform": "translate(-50%, -50%)",
      "backgroundImage": "radial-gradient(circle at 50% 50%, cyan, blue)",

    }

    return (
      <div>
        This is a simple vertical slider that fits nicely inside the text as an inline element.
        <br />
        Some text before &nbsp;
        <DragRange
          percent
          getTarget={() => this.target}
          value={this.state.value}
          onChange={(value) => this.setState ({ value })}
        >
          <div
            style={{ "display": "inline-block"/*, border: '1px solid red'*/ }}
            ref={((ref) => {this.target = ref})}
          >
            <div style={sliderStyle}>
              <div style={indicatorStyle} />
            </div>
          </div>
        </DragRange>
      &nbsp; and some text after.
      </div>
    )
  }
}

export default DragRangeViewer
