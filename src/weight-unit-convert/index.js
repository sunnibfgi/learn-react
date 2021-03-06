import React from 'react';
import ReactDOM from 'react-dom';

function numberToFixed(value) {
  if (isNaN(value)) return ''
  return value ? parseFloat(value).toFixed(3) : ''
}

const Context = React.createContext()

class Controller extends React.Component {
  state = {
    unit: {
      pound: '',
      kg: '',
      ton: ''
    }
  }

  handleInputChangeByName = ({target}) => {
    switch (target.name) {
    case 'pound':
      this.setState({
        unit: {
          pound: target.value,
          kg: numberToFixed(target.value * 0.45359237),
          ton: numberToFixed(target.value * 0.45359237 / 1000) 
        }
      })
      break
    case 'kg':
      this.setState({
        unit: {
          kg: target.value,
          pound: numberToFixed(target.value * 2.20462),
          ton: numberToFixed(target.value / 1000)
        }
      })
      break
    case 'ton':
      this.setState({
        unit: {
          ton: target.value,
          kg: numberToFixed(target.value * 1000),
          pound: numberToFixed(target.value * 1000 * 2.20462)
        }
      })
      break
    default:
      break
    } 
  }

  render() {
    let {children} = this.props
    return (
      <Context.Provider 
        value={{
          ...this.state,
          handleInputChangeByName: this.handleInputChangeByName
        }}>
        {children}
      </Context.Provider>
    )
  }
}

function App() {
  return (
    <Controller>
      <Block name="ja">
        <UnitWeightInput />
      </Block>
    </Controller>
  )
}

function Block({name, ...props}) {
  return <div className="block" {...props} />
}

function UnitWeightInput() {
  return (
    <Context.Consumer>
      {
        (context) => {
          return (
            <div className="demo">
              <p>
                <label>pounds:</label>
                <input
                  name="pound" 
                  value={context.unit.pound} 
                  onChange={context.handleInputChangeByName} 
                />
              </p>
              <p>
                <label>kg:</label>
                <input
                  name="kg" 
                  value={context.unit.kg} 
                  onChange={context.handleInputChangeByName} 
                />
              </p>
              <p>
                <label>ton:</label>
                <input
                  name="ton" 
                  value={context.unit.ton} 
                  onChange={context.handleInputChangeByName} 
                />
              </p>
            </div>
          )
        }
      }
    </Context.Consumer>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));

