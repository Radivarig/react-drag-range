var React = require('react')
var ReactDOM = require('react-dom')

var DragRange = React.createClass({
  getInitialState() {
    return {
      isDragging: false,
      mouseStartX: 0,
      mouseStartY: 0,
      baseX: this.props.initialX,
      baseY: this.props.initialY,
      valueX: this.getValue(0, 0, this.props.initialX),
      valueY: this.getValue(0, 0, this.props.initialY),
    }
  },

  propTypes: {
    unit: React.PropTypes.number, // unit in pixels

    rate: React.PropTypes.number, // how much to change per unit
    percentRate: React.PropTypes.number,

    minX: React.PropTypes.number,
    maxX: React.PropTypes.number,

    minY: React.PropTypes.number,
    maxY: React.PropTypes.number,

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
    doubleClickTimeout: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      unit: 50,
      rate: 1,
      percentRate: 1,
      valueX: 0,
      valueY: 0,
      initialX: 0,
      initialY: 0,
      decimals: 2,
      percentDecimals: 2,
      percent: 0,
      changePercent: () => {},
      changeX: () => {},
      changeY: () => {},
      dragStart: () => {},
      dragEnd: () => {},
      disableUserSelectNone: false,
      doubleClickTimeout: 500,
    }
  },

  startIsDragging(e) {
    if (this.state.isDragging)
      return
    this.setState({
      isDragging: true,
      startIsDraggingOnMove: false,
      mouseStartX: e.clientX,
      mouseStartY: e.clientY,
      baseX: this.props.valueX,
      baseY: this.props.valueY,
    })
    this.props.dragStart(e)
  },

  clamp(min, max, value) {
    return value < min ? min : value > max ? max : value
  },

  getValue(client, start, base, min, max) {
    var delta = client - start
    var val = Math.floor(delta / this.props.unit) * this.props.rate + base
    var clamped = this.clamp(min, max, val)
    return Number(clamped.toFixed(this.props.decimals))
  },

  trackDelta(e) {
    if ( ! this.state.isDragging) return
    const s = this.state
    const p = this.props
    var valueX = this.getValue(e.clientX, s.mouseStartX, s.baseX, p.minX, p.maxX)
    var valueY = this.getValue(e.clientY, s.mouseStartY, s.baseY, p.minY, p.maxY)
    if (valueX !== this.props.valueX) {this.props.changeX(valueX, e)}
    if (valueY !== this.props.valueY) {this.props.changeY(valueY, e)}
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

    if (percent !== this.props.percent)
      this.props.changePercent(percent, e)
  },

  endSetPercent(e) {
    this.isSettingPercent = false
  },

  handleMouseDown(e) {
    this.startSetPercent(e)
    if ( ! this.state.isDragging)
      this.setState({startIsDraggingOnMove: true})
    this.handleDoubleClick(e)
  },

  handleDoubleClick(e) {
    if (this.firstClick) {
      console.log ('double click', this.props, this.state)
      if (this.props.valueX !== this.props.initialX) {this.props.changeX(this.props.initialX, e)}
      if (this.props.valueY !== this.props.initialY) {this.props.changeY(this.props.initialY, e)}
      this.setState(this.getInitialState())
    }
    else {
      this.firstClick = true
      setTimeout(() => this.firstClick = false, this.props.doubleClickTimeout)
    }
  },

  handleMouseMove(e) {
    this.setPercent(e)
    if (this.state.startIsDraggingOnMove)
      this.startIsDragging(e)
    this.trackDelta(e)
  },

  handleMouseUp(e) {
    this.endSetPercent(e)
    this.setState({startIsDraggingOnMove: false})
    this.endIsDragging(e)
  },

  endIsDragging(e) {
    if ( ! this.state.isDragging)
      return
    this.setState({
      isDragging: false
    })
    this.props.dragEnd(e)
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
    }
    return (
      <span style={noSelectStyle} ref='range' onMouseDown={this.handleMouseDown}>
        {this.props.children}
      </span>
    )
  }
})

module.exports = DragRange
