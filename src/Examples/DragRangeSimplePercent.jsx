const React = require('react')
const DragRange = require('../DragRange.jsx')

const {
  Grid ,Row,
} = require('react-bootstrap')

const DragRangeViewer = React.createClass({
  getInitialState() {
    return {
      value: 0,
    }
  },

  onChange (name, e) {
    const value = e && e.target ? e.target.value : e
    let s = {}
    s[name] = value
    this.setState(s)
  },

  render() {
    return (
      <Grid>
        <Row>
        This is a&nbsp;
        <DragRange
          percent
          value={this.state.value}
          onChange={this.onChange.bind(this, 'value')}
        >
          <span style={{cursor: 'ew-resize', borderBottom: '1px dotted #000'}}>
            simple percent component
          </span>
        </DragRange>
        &nbsp;({this.state.value})
        </Row>
      </Grid>
    )
  }
})

module.exports = DragRangeViewer
