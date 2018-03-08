import React from 'react'
import DragRange from '../DragRange.jsx'

class DragRangeImage extends React.Component {
  state = {
    value: -35,
  }

  onChange = (name, e) => {
    const value = e && e.target ? e.target.value : e
    let s = {}
    s[name] = value
    this.setState(s)
  }

  render = () => {
    const scale = 100
    const imageStyle = {
      width: scale,
      height: scale,
      borderRadius: '50%',
      border: '5px solid silver',
      boxShadow: '0 0 3px 3px #000',
      backgroundImage: 'radial-gradient(circle at 50% 50%, white, silver)',

      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    }

    const indicatorStyle = {
      position: 'relative',
      left: '50%',
      height: scale/5,
      backgroundImage: 'radial-gradient(circle at 35% 30%, lime, green)',
      width: 5,
      borderRadius: '20%',
      transform: 'translate(-50%, 30%)'
    }

    const rotateStyle ={
      width: '100%',
      height: '100%',
      transform: 'rotate(' +this.state.value%180 +'deg)',
    }

    return (
      <div>
        Volume knob (rotation angle detection coming in next release)
        <div style={{padding: 30}}>
          <DragRange
            unit={1}
            min={-135}
            max={135}
            getTarget={()=>this.refs['target']}
            value={this.state.value}
            onChange={(value)=> this.setState({value})}
          >
            <div ref='target'>
              <div style={imageStyle}>
              <div style={rotateStyle}>
                <div style={indicatorStyle}/>
                </div>
              </div>
            </div>
          </DragRange>
        </div>

        ({this.state.value}%)

      </div>
    )
  }
}

export default DragRangeImage
