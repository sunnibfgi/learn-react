import React from 'react';
import ReactDOM from 'react-dom';

class ColorDisplay extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.colors.map((color, idx) => {
            return <p key={idx} style={{width: '30%', color: '#fff', backgroundColor: color}}
              onMouseOver={ this.props.onItemMouseOver(idx)}
              onMouseOut={this.props.onItemMouseOut} >{color}</p>;
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
ColorDiaplay.propTypes = {
  onItemMouseOver: PropTypes.func.isRequired,
  onItemMouseOut: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired,
  existColor: PropTypes.bool.isRequired
};


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
        <ColorDisplay onItemMouseOver={this.changeColor}
          onItemMouseOut={this.existColor}
          colors = {this.props.colors} 
          existColor={this.state.existColor} 
          color = {this.state.color} />
      </div>
    );
  }
}
ColorPanel.propTypes = {
  colors: PropTypes.array.isRequired
};

ReactDOM.render(
  <ColorPanel colors={['blue', 'red', 'orange', 'green']} />,
  document.getElementById('app')
);
