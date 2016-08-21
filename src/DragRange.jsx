const React = require('react')
const ReactDOM = require('react-dom')

const DragRange = React.createClass({
  getInitialState() {
    return {
      isDragging: false,
      mouseStartX: 0,
      mouseStartY: 0,
      baseX: this.props.initialX,
      baseY: this.props.initialY,
    }
  },

  propTypes: {
    unit: React.PropTypes.number,       // unit in pixels

    rate: React.PropTypes.number,       // how much to change per unit
    percentRate: React.PropTypes.number,

    percent: React.PropTypes.number, changePercent: React.PropTypes.func,
    valueX: React.PropTypes.number,  changeValueX: React.PropTypes.func,
    valueY: React.PropTypes.number,  changeValueY: React.PropTypes.func,

    minPercent: React.PropTypes.number, maxPercent: React.PropTypes.number,
    minX: React.PropTypes.number,       maxX: React.PropTypes.number,
    minY: React.PropTypes.number,       maxY: React.PropTypes.number,

    initialX: React.PropTypes.number,
    initialY: React.PropTypes.number,

    decimals: React.PropTypes.number,
    percentDecimals: React.PropTypes.number,

    dragStart: React.PropTypes.func,
    dragEnd: React.PropTypes.func,

    doubleClickTimeout: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      unit: 50,

      rate: 1,
      percentRate: 1,

      percent: 0, changePercent: () => {},
      valueX: 0,  changeValueX: () => {},
      valueY: 0,  changeValueY: () => {},

      minPercent: 0,
      maxPercent: 100,

      initialX: 0,
      initialY: 0,

      decimals: 2,
      percentDecimals: 2,

      dragStart: () => {},
      dragEnd: () => {},

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
    const delta = client - start
    const val = Math.floor(delta / this.props.unit) * this.props.rate + base
    const clamped = this.clamp(min, max, val)
    return Number(clamped.toFixed(this.props.decimals))
  },

  trackDelta(e) {
    if ( ! this.state.isDragging)
      return
    window.getSelection().removeAllRanges()

    const s = this.state
    const p = this.props
    const valueX = this.getValue(e.clientX, s.mouseStartX, s.baseX, p.minX, p.maxX)
    const valueY = this.getValue(e.clientY, s.mouseStartY, s.baseY, p.minY, p.maxY)
    if (valueX !== p.valueX) p.changeValueX(valueX, e)
    if (valueY !== p.valueY) p.changeValueY(valueY, e)
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
    let percent = (e.clientX - rect.left) * 100 / rect.width
    percent = Math.floor(percent / this.props.percentRate) * this.props.percentRate
    percent = this.clamp(this.props.minPercent, this.props.maxPercent, percent)
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
      const p = this.props
      if (p.valueX !== p.initialX) p.changeValueX(p.initialX, e)
      if (p.valueY !== p.initialY) p.changeValueY(p.initialY, e)
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
    return (
      <span ref='range' onMouseDown={this.handleMouseDown}>
        {this.props.children}
      </span>
    )
  }
})

module.exports = DragRange
