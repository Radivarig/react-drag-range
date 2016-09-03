const React = require('react')
const DragRange = require('../DragRange.jsx')

const {
  OverlayTrigger, Tooltip,
} = require('react-bootstrap')

const DragRangeModifyEachProp = React.createClass({
  getInitialState() {
    return {
      unit: 20,
      rate: 1,
      strict: true,

      percentWidth: 0,
      percentHeight: 0,

      valueX: 0,
      valueY: 0,

      min: undefined,
      max: undefined,

      decimals: 2,
      doubleClickTimeout: 500,

    }
  },

  onChange (name, e) {
    const value = e && e.target ? e.target.value : e
    let s = {}
    s[name] = value
    this.setState(s)
  },

  getSimpleDragRangeX(name, passProps, text) {
    return (
      <DragRange
        value={this.state[name]}
        onChange={this.onChange.bind(this, name)}
        {...passProps}
      >
      {
        <span style={{cursor: 'ew-resize', borderBottom: '1px dotted #000'}}>
          {text ? text : name}:
          (
          <span style={{display: 'inline-block', width: 35}}>
            {this.state[name]}
          </span>
          )
        </span>

      }
      </DragRange>
    )
  },

  render() {
    const rowStyle = {
      backgroundColor: '#ddd',
      textAlign: 'center',
    }

    // name, title, passProps
    const propList = [
      {name: 'unit', title: 'Distance in pixels', passProps: {min: 5}},
      {name: 'rate', title: 'Added value per unit for dragging', passProps: {rate: 0.01}},
      {name: 'value', title: 'Goes with `onChange` callback'},
      [
        {name: 'min', title: 'Minimum clamp value'},
        {name: 'max', title: 'Maximum clamp value'},
      ],
      {name: 'default', title: 'Reset value to this on double click', passProps: {rate: 0.01}},
      {name: 'decimals', title: 'Decimal places for rounding values', passProps: {min: 0}},
      {name: 'doubleClickTimeout', title: 'Miliseconds for doubleClick detection'}
    ]

    const overlay = (title) => <Tooltip id='tooltip'>{title}</Tooltip> 

    return (
      <div>
        <div>
        {
          propList.map ((p, i) => {
            const wrap = (item) => {
              return (
                <OverlayTrigger placement='right' overlay={overlay(item.title)}>
                  <span>{this.getSimpleDragRangeX(item.name, item.passProps)}</span>
                </OverlayTrigger>
              )
            }
            return (
              <div key={i} style={rowStyle}>
                {
                  Array.isArray(p) ?
                    p.map ((c, j) => <span key={j}>{wrap(c)}&nbsp;</span>)
                  : wrap(p)
                }
              </div>

            )
          })
        }
        </div>
        <br/>
        <div style={Object.assign({}, rowStyle)}>
          This is a&nbsp;
          {this.getSimpleDragRangeX('value', this.state, 'drag range component')}
          &nbsp; with above props.
        </div>
      </div>
    )
  }
})

module.exports = DragRangeModifyEachProp
