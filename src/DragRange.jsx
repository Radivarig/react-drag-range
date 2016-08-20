var React = require('react')

var DragRange = React.createClass({
  getInitialState() {
    return {
      isDragging: false,
      startX: 0,
      startY: 0,
      valueX: this.treat(0, 0, this.props.initialX),
      valueY: this.treat(0, 0, this.props.initialY),
    }
  },

  getDefaultProps() {
    return {
      pixels: 50,
      rate: 1.1,
      min: 3,
      max: 6,
      initialX: 4,
      initialY: 4,
      decimals: 2,
    }
  },

  setIsDragging(val) {
    return function(evt) {
      if (val) {
        evt.dataTransfer.setData('text/plain', '')
      }
      var s = {isDragging: val}
      if (val) {
        s.startX = evt.clientX
        s.startY = evt.clientY
      }
      this.setState(s)
      evt.dataTransfer.setDragImage(document.createElement('div'), 0, 0)

    }.bind(this)
  },

  clamp(min, max, value) {
    return value < min ? min : value > max ? max : value
  },

  treat(client, start, initial) {
    var delta = client -start
    var val = Math.floor(delta/this.props.pixels)*this.props.rate +initial
    var clamped = this.clamp(this.props.min, this.props.max, val)
    return clamped.toFixed(this.props.decimals)
  },

  trackDelta(evt) {
    if ( ! this.state.isDragging) return
    var s = {}
    var valueX = this.treat(evt.clientX, this.state.startX, this.props.initialX)
    var valueY = this.treat(evt.clientY, this.state.startY, this.props.initialY)
    if (valueX != this.state.valueX) s.valueX = valueX
    if (valueY != this.state.valueY) s.valueY = valueY
    this.setState(s)
  },

  componentDidMount() {
    document.addEventListener('dragover', this.trackDelta)
  },

  componentWillUnmount() {
    document.removeEventListener('dragover', this.trackDelta)
  },

  render() {
    return (
      <div
        draggable={true}
        onDragStart={this.setIsDragging(true)}
        onDragEnd={this.setIsDragging(false)}
        >
        <span
          draggable={false}
          >
          isDragging: {JSON.stringify(this.state.isDragging)} ({this.state.valueX}, {this.state.valueY})
        </span>
      </div>
    )
  }
})

module.exports = DragRange
