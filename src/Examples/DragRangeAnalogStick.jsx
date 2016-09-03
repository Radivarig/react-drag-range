const React = require('react')
const DragRange = require('../DragRange.jsx')

const {
  Grid, Row,
} = require('react-bootstrap')

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
    const width = 200
    const height = 200

    const borderSize = 2
    const imageStyle = {
      width,
      height,
      borderRadius: '50%',
      border: borderSize +'px solid #000',
      backgroundImage: 'radial-gradient(circle at '
      + this.state.valueX +'% '
      + this.state.valueY +'%, grey, #333399)',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    }

    const offset = 50 / 100  // 0 to 1 value
    const origP = {
      x: (this.state.valueX / 100 - offset),
      y: (this.state.valueY / 100 - offset),
    }
    // normalize will give 0 to 1 value
    const normP = this.normalize(origP)

    // divided with 2 because of the 0.5 offset
    let finalX = Math.abs(origP.x) < Math.abs(normP.x / 2) ? origP.x : normP.x / 2
    let finalY = Math.abs(origP.y) < Math.abs(normP.y / 2) ? origP.y : normP.y / 2

    finalX += offset
    finalY += offset

    const finalP = {
      x: finalX,
      y: finalY,
    }

    const dotStyle = {
      position: 'relative',
      width: 30,
      height: 30,
      left: finalP.x * width -borderSize,
      top: finalP.y * height -borderSize,
      borderRadius: '50%',
      border: '1px solid #000',
      backgroundImage: 'radial-gradient(circle at 50% 50%, cyan, green)',
      transform: 'translate(-50%, -50%)',
    }

    const axisP = {
      x: this.roundToDecimals(normP.x, 2),
      y: this.roundToDecimals(-normP.y, 2),
    }

    return (
      <Grid>
        <Row>
        <div style={{padding: 30}}>
          <DragRange
            percent yAxis
            getTarget={()=>this.refs['target']}
            default={50}
            value={this.state.valueY}
            onChange={(valueY)=> this.setState({valueY})}
            onMouseUp={this.resetValues}
          >
            <DragRange
              percent
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
        </Row>
      </Grid>
    )
  }
})

module.exports = DragRangeImage
