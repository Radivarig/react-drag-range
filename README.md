# react-drag-range

Try it - [Live Examples](https://radivarig.github.io/#/react-drag-range)

### Install

`npm install --save react-drag-range`

### Demo

Check out [Live Examples](https://radivarig.github.io/#/react-drag-range) and the [example code](https://github.com/Radivarig/react-drag-range/tree/master/src/Examples), or run locally
```bash
git clone git@github.com:Radivarig/react-drag-range.git
npm install
npm run dev
```
navigate to `localhost:8080`

### Features

 - X, Y **axis** **click**/**drag** detection
 - width, height **percent** detection
 - **min**, **max** range restrictions
 - **decimal places** rounding
 - double click to **reset** value
 - event callbacks

### Contributing

Pull Requests are very much appreciated.  
You can also help by staring, sharing and reporting issues.

### Props

```javascript
  propTypes: {
    yAxis: PropTypes.bool,   // default is x
    percent: PropTypes.bool, // if value should be x width or y height
    unit: PropTypes.number,  // unit in pixels
    rate: PropTypes.number,  // how much to change per unit
    value: PropTypes.number,
    onChange: PropTypes.func,
    onDelta: PropTypes.func,
    min: PropTypes.number,
    max: PropTypes.number,
    default: PropTypes.number,
    decimals: PropTypes.number,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseDown: PropTypes.func,
    onDoubleClick: PropTypes.func,
    doubleClickTimeout: PropTypes.number,
    disablePercentClamp: PropTypes.bool,
    disableReset: PropTypes.bool,
  },

```

### Basic Usage

Please take a look at the [examples](https://github.com/Radivarig/react-drag-range/tree/master/src/Examples)

```javascript
// ...
import DragRange from 'react-drag-range'

// ...
// simple X axis detection

    <DragRange
      // percent
      // yAxis
      value={this.state.value}
      onChange={(value)=>this.setState({value})}
    >
      <span>this span detects X axis dragging ({this.state.value})</span>
    </DragRange>

// ...
// wrap one DragRange in another to get both X and Y axis detection 

    <div>
      <div>

        <DragRange
          percent yAxis
          getTarget={()=>this.refs['target']}
          value={this.state.valueY}
          onChange={(valueY)=> this.setState({valueY})}
        >
          <DragRange
            percent
            getTarget={()=>this.refs['target']}
            value={this.state.valueX}
            onChange={(valueX)=> this.setState({valueX})}
          >
            <div ref='target' style={imageStyle}/>
          </DragRange>
        </DragRange>
      </div>

      ({this.state.valueX}%, {this.state.valueY}%)

    </div>
// ...

require('react-dom').render(<DragRangeViewer/>, document.body)
```

### License

MIT
