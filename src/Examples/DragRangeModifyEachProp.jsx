const React = require('react')
const DragRange = require('../DragRange.jsx')

const {
  Grid, Row, Col,
  OverlayTrigger, Tooltip,
} = require('react-bootstrap')

const DragRangeModifyEachProp = React.createClass({
  getInitialState() {
    return {
      unit: 20,

      rate: 1,

      percentWidth: 0,
      percentHeight: 0,

      valueX: 0,
      valueY: 0,

      min: undefined,
      max: undefined,

      initial: 0,
      decimals: 2,
      doubleClickTimeout: 500,

    }
  },

  onChange (name, e) {
    const value = e.target ? e.target.value : e
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
      {name: 'initial', title: 'Reset progress value to this on double click', passProps: {rate: 0.01}},
      {name: 'decimals', title: 'Decimal places for rounding values', passProps: {min: 0}},
      {name: 'doubleClickTimeout', title: 'Miliseconds for doubleClick reset, 0 to skip'},
    ]

    const gridMargin = {margin: 20}

    const overlay = (title) => <Tooltip id='tooltip'>{title}</Tooltip> 

    return (
      <div>
        <Grid>
          <Row style={gridMargin}>
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
                <Row key={i} style={rowStyle}>
                  {
                    Array.isArray(p) ?
                      p.map ((c, j) => <Col key={j}>{wrap(c)}</Col>)
                    : wrap(p)
                  }
                </Row>

              )
            })
          }
          </Row>
          <Row style={Object.assign({}, gridMargin, rowStyle)}>
            This is a&nbsp;
            {this.getSimpleDragRangeX('value', this.state, 'drag range component')}
            &nbsp; with above props.
          </Row>
        </Grid>
      </div>
    )
  }
})

module.exports = DragRangeModifyEachProp
