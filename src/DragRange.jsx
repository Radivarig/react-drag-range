var React = require('react')
var ReactDOM = require('react-dom')

var DragRange = React.createClass({
  getInitialState() {
    return {
      isDragging: false,
      startX: 0,
      startY: 0,
      initialX: this.props.initialX,
      initialY: this.props.initialY,
      valueX: this.treat(0, 0, this.props.initialX),
      valueY: this.treat(0, 0, this.props.initialY),
    }
  },

  propTypes: {
    unit: React.PropTypes.number, // unit in pixels
    rate: React.PropTypes.number, // how much to change per unit
    percentRate: React.PropTypes.number,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    initialX: React.PropTypes.number,
    initialY: React.PropTypes.number,
    decimals: React.PropTypes.number,
    percentDecimals: React.PropTypes.number,
    changePercent: React.PropTypes.func,
    changeX: React.PropTypes.func,
    changeY: React.PropTypes.func,
    dragStart: React.PropTypes.func,
    dragEnd: React.PropTypes.func,
    disableUserSelectNone: React.PropTypes.bool, // allow text selection
  },

  getDefaultProps() {
    return {
      unit: 50,
      rate: 1,
      percentRate: 1,
      initialX: 0,
      initialY: 0,
      decimals: 2,
      percentDecimals: 2,
      changePercent: () => {},
      changeX: () => {},
      changeY: () => {},
      dragStart: () => {},
      dragEnd: () => {},
      disableUserSelectNone: false,
    }
  },

  setIsDragging(val) {
    return (evt) => {
      var s = {isDragging: val}
      if (val) {
        s.startX = evt.clientX
        s.startY = evt.clientY
      }
      else {
        s.initialX = this.state.valueX
        s.initialY = this.state.valueY
      }
      if (val && ! this.state.isDragging)
        this.props.dragStart(evt)
      else if (! val && this.state.isDragging)
        this.props.dragEnd(evt)
      this.setState(s)
    }
  },

  clamp(min, max, value) {
    return value < min ? min : value > max ? max : value
  },

  treat(client, start, initial) {
    var delta = client -start
    var val = Math.floor(delta/this.props.unit)*this.props.rate +initial
    var clamped = this.clamp(this.props.min, this.props.max, val)
    return Number(clamped.toFixed(this.props.decimals))
  },

  trackDelta(e) {
    if ( ! this.state.isDragging) return
    var s = {}
    var valueX = this.treat(e.clientX, this.state.startX, this.state.initialX)
    var valueY = this.treat(e.clientY, this.state.startY, this.state.initialY)
    if (valueX != this.state.valueX) s.valueX = valueX
    if (valueY != this.state.valueY) s.valueY = valueY

    if (valueX != this.state.valueX) this.props.changeX(valueX, e)
    if (valueY != this.state.valueY) this.props.changeY(valueY, e)
    this.setState(s)
  },

  startSetPercent(e) {
    this.isSettingPercent = true
    this.setPercent(e)
  },

  setPercent(e) {
    if ( ! this.isSettingPercent)
      return
    const target = ReactDOM.findDOMNode(this.refs['range'])
    const rect = target.getBoundingClientRect()
    let percent = (e.clientX -rect.left)*100/rect.width
    percent = Math.floor(percent/this.props.percentRate)*this.props.percentRate
    percent = this.clamp(0, 100, percent)
    percent = Number(percent.toFixed(this.props.percentDecimals))

    if (this.state.percent !== percent) {
      this.setState({percent})
      this.props.changePercent(percent, e)
    }
  },

  endSetPercent(e) {
    this.isSettingPercent = false
  },

  handleMouseDown(e) {
    this.startSetPercent(e)
    this.setIsDragging(true)(e)
  },

  handleMouseMove(e) {
    this.trackDelta(e)
    this.setPercent(e)
  },

  handleMouseUp(e) {
    this.endSetPercent()
    this.setIsDragging(false)(e)
  },

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  },

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  },

  render() {
    const noSelectStyle = this.props.disableUserSelectNone ? {} : {
      WebkitTouchCallout: 'none',// iOS Safari
      WebkitUserSelect: 'none',  // Chrome/Safari/Opera
      KhtmlUserSelect: 'none',   // Konqueror
      MozUserSelect: 'none',     // Firefox
      MsUserSelect: 'none',      // Internet Explorer/Edge
      userSelect: 'none',        // Non-prefixed, currently not supported by any browser
      display: 'block',
    }
    return (
      <span style={noSelectStyle} ref='range' onMouseDown={this.handleMouseDown}>
        {this.props.children}
      </span>
    )
  }
})

module.exports = DragRange
