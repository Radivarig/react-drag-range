const React = require('react')
const DragRange = require('../DragRange.jsx')

const DragRangeViewer = React.createClass({
  getInitialState() {
    let s = {
      slidersCount: 15,
      isFirstClick: true,
    }
    for (var i = 0; i < s.slidersCount; ++i)
      s['value_' +i] = 50
    return s
  },

  lastDelta: 0,

  getHorSlider(n) {
    const height = 200
    const borderWidth = 2

    const value = this.state['value_' + n]

    const sliderStyle = {
      height,
      width: '0.7em',
      cursor: 'pointer',
      display: 'inline-block',
      border: 'solid black',
      borderWidth,
      backgroundImage: 'radial-gradient(circle at 50%'
      + value + '%, #5577dd, black)',
      margin: '0px 10px',
    }

    const indicatorStyle = {
      width: 18,
      height: 8,
      cursor: 'ns-resize',
      border: 'solid black',
      borderWidth,
      position: 'relative',
      top: value / 100 * height -borderWidth,
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundImage: 'radial-gradient(circle at 50% 50%, cyan, blue)',
    }

    const onChange = (value) => {
      const currValue = this.state['value_' + n]
      const delta =  currValue - value
      let s = {isFirstClick: false}
      const getMultiplier = (distance) => Math.pow (0.3, distance)

      if ( ! this.state.isFirstClick) {
        for (var j = 0; j < this.state.slidersCount; ++j) {
          if (j !== n) {
            const adjacentValue = this.state['value_' + j]
            const adjacentDelta = currValue - adjacentValue

            s['value_' + j] = adjacentValue + getMultiplier(Math.abs(n - j)) * adjacentDelta
          }
        }
      }

      s['value_' + n] = value
      this.setState(s)
    }

    return (
      <span key={n}>
        <DragRange
          yAxis
          percent
          getTarget={()=>this.refs['target_' + n]}
          value={value}
          onChange={onChange}
          onMouseUp={()=>this.setState({isFirstClick: true})}
        >
          <div style={{display: 'inline-block'/*, border: '1px solid red'*/}} ref={'target_' + n}>
            <div style={sliderStyle}>
              <div style={indicatorStyle}/>
            </div>
          </div>
        </DragRange>
      </span>
    )
  },

  render() {
    let sliders = []
    for (var i = 0; i < this.state.slidersCount; ++i) {
      sliders.push(this.getHorSlider(i))
    }

    return (
      <span>
        This is an set of horizontal sliders that corespond to each others movements like an equalizer.
        <br/>
        {sliders}
      </span>
    )
  }
})

module.exports = DragRangeViewer
