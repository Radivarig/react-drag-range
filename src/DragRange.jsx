const React = require('react')
const ReactDOM = require('react-dom')

const DragRange = React.createClass({
  getInitialState() {
    return {
      mouseStart: {x: 0, y: 0},
      base: this.props.default,
    }
  },

  propTypes: {
    yAxis: React.PropTypes.bool,   // default is x
    percent: React.PropTypes.bool, // if value should be x width or y height
    unit: React.PropTypes.number,  // unit in pixels
    rate: React.PropTypes.number,  // how much to change per unit
    value: React.PropTypes.number,
    onChange: React.PropTypes.func,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    default: React.PropTypes.number,
    decimals: React.PropTypes.number,
    dragStart: React.PropTypes.func,
    dragEnd: React.PropTypes.func,
    onDoubleClick: React.PropTypes.func,
    doubleClickTimeout: React.PropTypes.number,
    disablePercentClamp: React.PropTypes.bool,
    disableReset: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      yAxis: false,
      percent: false,
      unit: 20,
      rate: 1,
      value: 0,
      onChange: () => {},
      // min: 0, max: 100, // for percent
      decimals: 2,
      dragStart: () => {},
      dragEnd: () => {},
      onDoubleClick: () => {},
      doubleClickTimeout: 500, // 0 for percent
      getTarget: () => {},
    }
  },

  startIsDragging(e) {
    if (this.state.isDragging)
      return
    this.setState({
      isDragging: true,
      startIsDraggingOnMove: false,
      mouseStart: {x: e.clientX, y: e.clientY},
      base: this.props.value,
    })
    this.props.dragStart(e)
  },

  clamp(min, max, value) {
    return value < min ? min : value > max ? max : value
  },

  roundToDecimals(value, decimals) {
    const pow = Math.pow (10, decimals)
      return Math.round(value * pow) / pow
  },

  getValue(client = 0, start = 0) {
    const p = this.props
    const base = this.state.base
    const unclampedBase = Math.ceil(base / p.rate) * p.rate

    const delta = client - start
    const deltaInteger = Math.floor(delta / p.unit)

    let value = (deltaInteger * p.rate) + unclampedBase
    value = this.clamp(p.min, p.max, value)
    value = this.roundToDecimals(value, p.decimals)
    return value
  },

  trackDelta(e) {
    if ( ! this.state.isDragging)
      return
    window.getSelection().removeAllRanges()

    const s = this.state
    const p = this.props

    let value
    if (p.yAxis)
         value = this.getValue(e.clientY, s.mouseStart.y)
    else value = this.getValue(e.clientX, s.mouseStart.x)

    this.handleOnChange(value, e)
  },

  startSetPercent(e) {
    this.isSettingPercent = true
    this.setPercent(e)
  },

  handleSetTarget(props) {
    const p = props || this.props
    const target = p.getTarget()
    if (this.state.target != target)
      this.setState({target})
  },

  componentWillReceiveProps(nextProps) {
    this.handleSetTarget(nextProps)
  },

  setPercent(e) {
    if ( ! this.isSettingPercent)
      return
    const target = ReactDOM.findDOMNode(this.state.target || this.refs['target'])
    const rect = target.getBoundingClientRect()
    const {top, left} = rect
    const width = rect.width || target.clientWidth
    const height = rect.height || target.clientHeight
    let percent

    if (this.props.yAxis) percent = (e.clientY - top) * 100 / height
    else percent = (e.clientX - left) * 100 / width
    percent = Math.floor(percent / this.props.rate) * this.props.rate

    percent = this.clamp(this.props.min, this.props.max, percent)
    if ( ! this.props.disablePercentClamp)
      percent = this.clamp(0, 100, percent)

    percent = this.roundToDecimals(percent, this.props.decimals)
    this.handleOnChange(percent, e)
  },

  endSetPercent(e) {
    this.isSettingPercent = false
  },

  handleMouseDown(e = {}) {
    if (this.props.percent)
      this.startSetPercent(e)
    else if ( ! this.state.isDragging)
      this.setState({startIsDraggingOnMove: true})
    this.handleDoubleClick(e)
  },

  handleOnChange(newValue, e) {
    if (this.props.value !== newValue)
      this.props.onChange(newValue, e)
  },

  handleDoubleClick(e) {
    const p = this.props
    if (this.firstClick) {
      // reset
      if (p.default !== undefined && ! p.disableReset) {
        // for percent set disableReset={false} explicitly
        if (! p.percent || p.percent && p.disableReset !== undefined) {
          this.handleOnChange(this.props.default, e)
          this.setState(this.getInitialState())
        }
      }
      e.preventDefault() // prevent text selection
      p.onDoubleClick(e)
    }
    else {
      this.firstClick = true
      const timeout = p.doubleClickTimeout
      setTimeout(() => this.firstClick = false, timeout)
    }
  },

  handleMouseMove(e) {
    if (this.state.startIsDraggingOnMove)
      this.startIsDragging(e)
    if (this.props.percent)
      this.setPercent(e)
    else this.trackDelta(e)
    window.getSelection().removeAllRanges()
  },

  handleMouseUp(e) {
    this.endSetPercent(e)
    this.setState({startIsDraggingOnMove: false})
    this.endIsDragging(e)
  },

  endIsDragging(e) {
    if ( ! this.state.isDragging)
      return
    this.setState({isDragging: false})
    this.props.dragEnd(e)
  },

  componentDidMount() {
    this.handleSetTarget()

    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  },

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  },

  render() {
    return (
      <span ref='target' onMouseDown={this.handleMouseDown}>
        {this.props.children}
      </span>
    )
  }
})

module.exports = DragRange
