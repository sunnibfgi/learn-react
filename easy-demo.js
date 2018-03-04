import React from 'react';
import ReactDOM from 'react-dom';

class ColorDiaplay extends React.Component {
  constructor(props) {
    super(props);
    this.onMouseOverHandler = this.onMouseOverHandler.bind(this);
    this.onMouseOutHandler = this.onMouseOutHandler.bind(this);
  }

  onMouseOverHandler(idx) {
    return this.props.onItemMouseOver(idx);
  }
  onMouseOutHandler() {
    return this.props.onItemMouseOut();
  }

  render() {
    return (
      <div>
        {
          this.props.colors.map((color, idx) => {
            return <p key={idx} style={{width: '30%', color: '#fff', backgroundColor: color}}
              onMouseOver={(e) => this.onMouseOverHandler(idx, e)}
              onMouseOut={this.onMouseOutHandler} >{color}</p>;
          })
        }
        <p>
          {
            this.props.existColor || !this.props.color
              ? 'choose color'
              : this.props.color
          }
        </p>
      </div>
    );
  }
}

class ColorPanel extends React.Component {
  state = {
    color: null,
    existColor: false
  };
  constructor(props) {
    super(props);
    this.existColor = this.existColor.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }
  changeColor(idx) {
    this.setState({
      existColor: false,
      color: this.props.colors[idx]
    });
  }
  existColor() {
    this.setState({
      existColor: true
    });
  }
  render() {
    return (
      <div>

        <ColorDiaplay onItemMouseOver={this.changeColor}
          onItemMouseOut={this.existColor}
          colors = {this.props.colors} existColor={this.state.existColor} colors={this.props.colors} color = {this.state.color} />
      </div>
    );
  }
}

ReactDOM.render(
  <ColorPanel colors={['blue', 'red', 'orange', 'green']} />,
  document.getElementById('app')
);
