import React from "react"
import DragRange from "../DragRange.jsx"

require ("style-loader!css-loader!../tooltip.css")

class DragRangeModifyEachProp extends React.Component {
  state = {
    "unit": 20,
    "rate": 1,
    "strict": true,

    "percentWidth": 0,
    "percentHeight": 0,

    "valueX": 0,
    "valueY": 0,

    "min": undefined,
    "max": undefined,

    "decimals": 2,
    "doubleClickTimeout": 500,
  }

  onChange = (key, e) => {
    const value = e && e.target ? e.target.value : e
    const s = {}
    s[key] = value
    this.setState (s)
  }

  getSimpleDragRangeX = (key, passProps, text) => (
    <DragRange
      value={this.state[key]}
      onChange={this.onChange.bind (this, key)}
      {...passProps}
    >
      {
        <span style={{ "cursor": "ew-resize", "borderBottom": "1px dotted #000" }}>
          {text ? text : key}:
          (
          <span style={{ "display": "inline-block", "width": 35 }}>
            {this.state[key]}
          </span>
          )
        </span>

      }
    </DragRange>
  )

  render = () => {
    const rowStyle = {
      "backgroundColor": "#ddd",
      "textAlign": "center",
    }

    // name, title, passProps
    const propList = [
      { "name": "unit", "title": "Distance in pixels", "passProps": { "min": 5 } },
      { "name": "rate", "title": "Added value per unit for dragging", "passProps": { "rate": 0.01 } },
      { "name": "value", "title": "Goes with `onChange` callback" },
      [
        { "name": "min", "title": "Minimum clamp value" },
        { "name": "max", "title": "Maximum clamp value" },
      ],
      { "name": "default", "title": "Reset value to this on double click", "passProps": { "rate": 0.01 } },
      { "name": "decimals", "title": "Decimal places for rounding values", "passProps": { "min": 0 } },
      { "name": "doubleClickTimeout", "title": "Miliseconds for doubleClick detection" },
    ]

    return (
      <div>
        <div>
          {
            propList.map ((p, i) => {
              const wrap = (item) => (
                <div className='tooltip'>
                  {this.getSimpleDragRangeX (item.name, item.passProps)}
                  <span className='tooltiptext'>{item.title}</span>
                </div>
              )
              return (
                <div key={i} style={rowStyle}>
                  {
                    Array.isArray (p) ?
                      p.map ((c, j) => <span key={j}>{wrap (c)}&nbsp;</span>)
                      : wrap (p)
                  }
                </div>

              )
            })
          }
        </div>
        <br />
        <div style={Object.assign ({}, rowStyle)}>
          This is a&nbsp;
          {this.getSimpleDragRangeX ("value", this.state, "drag range component")}
          &nbsp; with above props.
        </div>
      </div>
    )
  }
}

export default DragRangeModifyEachProp
