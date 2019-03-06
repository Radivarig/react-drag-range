import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"

import { TouchHandler } from "./TouchHandler"
const touchHandler = new TouchHandler (document)

export default class DragRange extends React.Component {
  static propTypes = {
    "yAxis": PropTypes.bool,   // default is x
    "percent": PropTypes.bool, // if value should be x width or y height
    "unit": PropTypes.number,  // unit in pixels
    "rate": PropTypes.number,  // how much to change per unit
    "value": PropTypes.number,
    "onChange": PropTypes.func,
    "onDelta": PropTypes.func,
    "min": PropTypes.number,
    "max": PropTypes.number,
    "default": PropTypes.number,
    "decimals": PropTypes.number,
    "onDragStart": PropTypes.func,
    "onDragEnd": PropTypes.func,
    "onMouseUp": PropTypes.func,
    "onMouseDown": PropTypes.func,
    "onDoubleClick": PropTypes.func,
    "doubleClickTimeout": PropTypes.number,
    "disablePercentClamp": PropTypes.bool,
    "disableReset": PropTypes.bool,
  }

  static defaultProps = {
    "yAxis": false,
    "percent": false,
    "unit": 20,
    "rate": 1,
    "value": 0,
    "onChange": () => {},
    "onDelta": () => {},
    // min: 0, max: 100, // for percent
    "decimals": 2,
    "onDragStart": () => {},
    "onDragEnd": () => {},
    "onMouseUp": () => {},
    "onMouseDown": () => {},
    "onDoubleClick": () => {},
    "doubleClickTimeout": 500, // 0 for percent
  }

  getInitialState = () => Object.assign ({}, {
    "mouseStart": { "x": 0, "y": 0 },
    "base": this.props.default,
  })

  state = this.getInitialState ()

  startIsDragging = (e) => {
    if (this.state.isDragging)
      return
    this.setState ({
      "isDragging": true,
      "startIsDraggingOnMove": false,
      "mouseStart": { "x": e.clientX, "y": e.clientY },
      "base": this.props.value,
    })
    this.props.onDragStart (e)
  }

  // eslint-disable-next-line
  clamp = (min, max, value) => value < min ? min : value > max ? max : value

  roundToDecimals = (value, decimals) => {
    const pow = Math.pow (10, decimals)
    return Math.round (value * pow) / pow
  }

  getValue = (client = 0, start = 0) => {
    const { rate, unit, min, max, decimals } = this.props
    const base = this.state.base
    const unclampedBase = Math.ceil (base / rate) * rate

    const delta = client - start
    const deltaInteger = Math.floor (delta / unit)

    let value = (deltaInteger * rate) + unclampedBase
    value = this.clamp (min, max, value)
    value = this.roundToDecimals (value, decimals)
    return value
  }

  trackDelta = (e) => {
    if (! this.state.isDragging)
      return
    window.getSelection ().removeAllRanges ()

    const s = this.state
    const p = this.props

    let value
    if (p.yAxis)
      value = this.getValue (e.clientY, s.mouseStart.y)
    else value = this.getValue (e.clientX, s.mouseStart.x)

    this.handleOnChange (value, e)
  }

  startSetPercent = (e) => {
    this.isSettingPercent = true
    this.setPercent (e)
  }

  handleSetTarget = (props) => {
    const p = props || this.props
    const s = this.state
    const target = p.getTarget && p.getTarget ()
    if (s.target !== target) {
      if (s.target)
        s.target.removeEventListener ("mousedown", this.handleMouseDown)
      target.addEventListener ("mousedown", this.handleMouseDown)
      this.setState ({ target })
    }
  }

  getTargetInfo = (recursiveTarget) => {
    const target = recursiveTarget ||
      ReactDOM.findDOMNode (this.state.target || this.container)

    const boundRect = target.getBoundingClientRect ()
    const width = boundRect.width || target.clientWidth
    const height = boundRect.height || target.clientHeight
    const rect = {
      width,
      height,
      "left": boundRect.left,
      "top": boundRect.top,
    }

    if (width && height) {
      return {
        target,
        rect,
      }
    }
    else if (target.children)
      return this.getTargetInfo (target.children[0])
    return null
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    this.handleSetTarget (nextProps)
  }

  setPercent = (e) => {
    if (! this.isSettingPercent)
      return
    const rect = this.getTargetInfo ().rect

    let percent
    if (this.props.yAxis) percent = (e.clientY - rect.top) * 100 / rect.height
    else percent = (e.clientX - rect.left) * 100 / rect.width
    percent = Math.floor (percent / this.props.rate) * this.props.rate
    percent = this.clamp (this.props.min, this.props.max, percent)
    if (! this.props.disablePercentClamp)
      percent = this.clamp (0, 100, percent)
    percent = this.roundToDecimals (percent, this.props.decimals)

    this.handleOnChange (percent, e)
  }

  endSetPercent = () => {
    this.isSettingPercent = false
  }

  handleMouseDown = (e) => {
    if (this.props.percent)
      this.startSetPercent (e)
    if (! this.state.isDragging)
      this.setState ({ "startIsDraggingOnMove": true })
    this.handleDoubleClick (e)
    this.props.onMouseDown (e)

    // TODO first delta prev values
    // this.prevValue = this.props.value
    // this.prevEvent = e
  }

  handleOnChange = (newValue, e) => {
    if (this.props.value !== newValue)
      this.props.onChange (newValue, e)

    const delta = newValue - this.prevValue

    // TODO first delta prev values
    if (delta) {
      const deltaInfo = {
        "value": newValue,
        "prevValue": this.prevValue,
        "event": e,
        "prevEvent": this.prevEvent,
      }
      this.props.onDelta (delta, deltaInfo)

      this.prevValue = newValue
      this.prevEvent = event
    }
  }

  handleDoubleClick = (e) => {
    const { percent, disableReset } = this.props
    if (this.firstClick) {
      // reset
      if (this.props.default !== undefined && ! disableReset) {
        // for percent set disableReset={false} explicitly
        if (!percent || (percent && disableReset !== undefined)) {
          this.handleOnChange (this.props.default, e)
          this.setState (this.getInitialState ())
        }
      }
      e.preventDefault () // prevent text selection
      this.props.onDoubleClick (e)
    }
    else {
      this.firstClick = true
      const timeout = this.props.doubleClickTimeout
      setTimeout (() => {this.firstClick = false}, timeout)
    }
  }

  handleMouseMove = (e) => {
    if (this.state.startIsDraggingOnMove)
      this.startIsDragging (e)
    if (this.props.percent)
      this.setPercent (e)
    else this.trackDelta (e)
    window.getSelection ().removeAllRanges ()
  }

  handleMouseUp = (e) => {
    this.endSetPercent (e)
    this.setState ({ "startIsDraggingOnMove": false })
    this.endIsDragging (e)
    this.props.onMouseUp (e)
  }

  endIsDragging = (e) => {
    if (! this.state.isDragging)
      return
    this.setState ({ "isDragging": false })
    this.props.onDragEnd (e)
  }

  componentDidMount = () => {
    this.handleSetTarget ()

    document.addEventListener ("mousemove", this.handleMouseMove)
    document.addEventListener ("mouseup", this.handleMouseUp)
    touchHandler.init ()
  }

  componentWillUnmount = () => {
    document.removeEventListener ("mousemove", this.handleMouseMove)
    document.removeEventListener ("mouseup", this.handleMouseUp)
    touchHandler.deinit ()

    if (this.state.target)
      this.state.target.removeEventListener ("mousedown", this.handleMouseDown)
  }

  render = () => {
    const p = this.props
    const onMouseDown = p.getTarget ? undefined : this.handleMouseDown

    return (
      <span ref={(r) => {this.container = r}} onMouseDown={onMouseDown}>
        {p.children}
      </span>
    )
  }
}
