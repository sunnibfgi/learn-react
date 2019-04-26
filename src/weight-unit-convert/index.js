import React from 'react';
import ReactDOM from 'react-dom';

function numberToFixed(value) {
  if (isNaN(value)) return '';
  return value ? parseFloat(value).toFixed(3) : '';
}

const Context = React.createContext();

class Controller extends React.Component {
  state = {
    unit: {
      pound: '',
      kg: '',
      ton: ''
    },
    type: ''
  }

  handlePoundChange = ({target}) => {
    this.setState({
      type: 'pound',
      unit: {
        pound: target.value,
        kg: numberToFixed(target.value * 0.45359237),
        ton: numberToFixed(target.value * 0.45359237 / 1000)
      }
    });
  }
  handleKilogramChange = ({target}) => {
    this.setState({
      type: 'kg',
      unit: {
        pound: numberToFixed(target.value * 2.20462),
        kg: target.value,
        ton: numberToFixed(target.value / 1000)
      }
    });
  }
  handleTonChange = ({target}) => {
    this.setState({
      type: 'ton',
      unit: {
        pound: numberToFixed(target.value * 1000 * 2.20462),
        kg: numberToFixed(target.value * 1000),
        ton: target.value
      }
    });
  }

  render() {
    let {children} = this.props;
    return (
      <Context.Provider
        value={{
          ...this.state,
          handlePoundChange: this.handlePoundChange,
          handleKilogramChange: this.handleKilogramChange,
          handleTonChange: this.handleTonChange
        }}>
        {children}
      </Context.Provider>
    );
  }
}

function App() {
  return (
    <Controller>
      <Block name="ja">
        <KilogramInput />
        <PoundInput />
        <TonInput />
      </Block>
    </Controller>
  );
}

function Block({...props}) {
  return <div className="block" {...props} />;
}

function PoundInput() {
  return (
    <Context.Consumer>
      {
        (context) => {
          return (
            <p>
              <label>pounds:</label>
              <input
                value={context.unit.pound}
                onChange={context.handlePoundChange}
              />
            </p>
          );
        }
      }
    </Context.Consumer>
  );
}

function KilogramInput() {
  return (
    <Context.Consumer>
      {
        (context) => {
          return (
            <p>
              <label>kilograms:</label>
              <input
                value={context.unit.kg}
                onChange={context.handleKilogramChange}
              />
            </p>
          );
        }
      }
    </Context.Consumer>
  );
}
function TonInput() {
  return (
    <Context.Consumer>
      {
        (context) => {
          return (
            <p>
              <label>tons:</label>
              <input
                value={context.unit.ton}
                onChange={context.handleTonChange}
              />
            </p>
          );
        }
      }
    </Context.Consumer>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));

