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

  render() {
    const imageStyle = {
      width: 200,
      height: 100,
      borderRadius: '10%',
      border: '3px solid #000',
      backgroundImage: 'radial-gradient(circle at '
      +this.state.valueY +'% '
      +this.state.valueX +'%, cyan, blue)',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    }

    return (
      <Grid>
        <Row>
        <div style={{padding: 30}}>
          <DragRange percent
            default={50}
            value={this.state.valueY}
            onChange={(valueY)=> this.setState({valueY})}
          >
            <DragRange yAxis percent
              default={50}
              value={this.state.valueX}
              onChange={(valueX)=> this.setState({valueX})}
            >
              <div style={imageStyle} />
            </DragRange>
          </DragRange>
        </div>
          ({this.state.valueY}, {this.state.valueX})
        </Row>
      </Grid>
    )
  }
})

module.exports = DragRangeImage
