const React = require('react')
const DragRange = require('../DragRange.jsx')

const DragRangeImage = React.createClass({
  getInitialState() {
    return {
      valueX: 50,
      valueY: 50,
    }
  },

  onChange (name, e) {
    const value = e && e.target ? e.target.value : e
    let s = {}
    s[name] = value
    this.setState(s)
  },

  resetValues(e) {
    const initialState = this.getInitialState()
    this.setState({
      valueX: initialState.valueX,
      valueY: initialState.valueY,
    })
  },

  normalize(point) {
    const norm = Math.sqrt(point.x * point.x + point.y * point.y) || 1
    return {
      x: point.x / norm,
      y: point.y / norm,
    }
  },

  roundToDecimals(value, decimals) {
    const p = Math.pow (10, decimals)
    return Math.round(value  * p) / p
  },

  render() {
    const width = 150
    const height = 150

    // from percent to [0 to 1] value
    const offset = 50 / 100
    const origP = {
      x: (this.state.valueX / 100 - offset),
      y: (this.state.valueY / 100 - offset),
    }

    // normalize will give 0 to 1 value
    const normP = this.normalize(origP)

    // correct scale change from offset reduction
    const offsetP = {
      x: normP.x * offset,
      y: normP.y * offset,
    }
    // lower inner dot circle movement radius
    const clampScale = 0.5
    const normClampedP = {
      x: normP.x * offset * clampScale,
      y: normP.y * offset * clampScale,
    }

    const finalP = {
      x: (Math.abs(origP.x) < Math.abs(normClampedP.x) ? origP.x : normClampedP.x) + offset,
      y: (Math.abs(origP.y) < Math.abs(normClampedP.y) ? origP.y : normClampedP.y) + offset,
    }

    const outerBorderWidth = 4

    const imageStyle = {
      width,
      height,

      borderRadius: '50%',
      border: outerBorderWidth +'px solid dimGrey',
      boxShadow: '0 0 3px 3px #000',
      backgroundImage: 'radial-gradient(circle at '
      + finalP.x * 100 +'% '
      + finalP.y * 100 +'%, grey, black)',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    }

    const dotStyle = {
      position: 'relative',
      width: 100,
      height: 100,
      left: finalP.x * width -outerBorderWidth,
      top: finalP.y * height -outerBorderWidth,

      borderRadius: '50%',
      border: '8px solid dimGrey',
      boxShadow: '0 0 3px 3px #000',
      backgroundImage: 'radial-gradient(circle at 50% 0%, #333, grey)',


      // border: '3px solid #000',
      // backgroundImage: 'radial-gradient(circle at 35% 30%, slateGrey, navy)',
      transform: 'translate(-50%, -50%)',
    }

    const axisP = {
      x: this.roundToDecimals(normP.x, 2),
      y: this.roundToDecimals(-normP.y, 2),
    }

    return (
      <div>
        <div style={{padding: 30}}>
          <DragRange
            percent yAxis
            disablePercentClamp={true}
            getTarget={()=>this.refs['target']}
            default={50}
            value={this.state.valueY}
            onChange={(valueY)=> this.setState({valueY})}
            onMouseUp={this.resetValues}
          >
            <DragRange
              percent
              disablePercentClamp={true}
              getTarget={()=>this.refs['target']}
              default={50}
              value={this.state.valueX}
              onChange={(valueX)=> this.setState({valueX})}
            >
              <div ref='target' style={imageStyle}>
                <div style={dotStyle}/>
              </div>
            </DragRange>
          </DragRange>
        </div>
          ({axisP.x}, {axisP.y})
      </div>
    )
  }
})

module.exports = DragRangeImage