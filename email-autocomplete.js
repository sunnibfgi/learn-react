import React from 'react';

class EmailInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.onClickItemHandler = this.onClickItemHandler.bind(this);
  }

  state = {
    value: '',
    index: 0,
    atBeforeValue: '',
    atAfterValue: '',
    close: true
  };

  atBeforeValuePattern = /^[a-zA-Z0-9_@]+$/;

  itemVisibilityStatus(e) {
    let target = e.target;
    if (target === this.emailInput) {
      this.setState({
        close: !this.atBeforeValuePattern.test(target.value)
      });
    } else {
      this.setState({
        close: true,
        index: 0
      });
    }
  }

  // componentDidUpdate() {
  //   console.log(this.state.close)
  // }

  componentDidMount() {
    document.addEventListener('click', this.itemVisibilityStatus.bind(this));
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.itemVisibilityStatus.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
        index: 0
      });
    }
  }

  onKeyDownHandler(e) {
    let keyCode = e.keyCode;
    if (!this.state.close) {
      switch (keyCode) {
      case 38:
        this.setState(prevState => ({
          index: prevState.index > 0 ? prevState.index - 1 : this.props.email.length - 1
        }), () => {
          this.setState({
            value: `${this.state.atBeforeValue}${this.props.email[this.state.index]}`
          });
        });
        break;
      case 40:
        this.setState(prevState => ({
          index: prevState.index < this.props.email.length - 1 ? prevState.index + 1 : 0
        }), () => {
          this.setState({
            value: `${this.state.atBeforeValue}${this.props.email[this.state.index]}`
          });
        });

        break;
      case 13:
        this.setState({
          close: true,
          index: 0,
          value: this.state.atBeforeValue + this.props.email[this.state.index]
        });
        break;
      default:
        break;
      }
    }
  }
  onChangeHandler(e) {
    let {value} = e.target;
    let indexOf = value.indexOf('@');
    this.setState({
      value: value,
      atBeforeValue: indexOf > 0 ? value.substring(0, indexOf + 1) : '',
      atAfterValue: indexOf > 0 ? value.substring(indexOf + 1, value.length) : '',
      close: !(indexOf >= 0)
    });
  }

  onClickItemHandler(e) {
    this.props.getItemText(e.target.innerText);
    this.setState({
      close: true,
      index: 0
    });
  }

  render() {
    return (
      <div className="email-ct">
        <p>
          <input
            type="text"
            ref={(input) => (this.emailInput = input) }
            value={this.state.value}
            onKeyDown={this.onKeyDownHandler}
            onChange = {this.onChangeHandler}
            placeholder="enter email address" />
        </p>
        {
          this.atBeforeValuePattern.test(this.state.atBeforeValue)
            ? <div className="email-item" style={{display: this.state.close ? 'none' : ''}}>
              {
                this.props.email
                  .sort()
                  .map((el, idx) => {
                    return !el.indexOf(this.state.atAfterValue)
                      ? <p style={{backgroundColor: idx !== this.state.index ? '' : '#eee'}}
                        className="item"
                        key={idx}
                        onClick={this.onClickItemHandler}>{this.state.atBeforeValue}{el}</p> : '';
                  })
              }
            </div> : ''
        }

      </div>
    );
  }
}

class Email extends React.Component {
  constructor(props) {
    super(props);
    this.getItemText = this.getItemText.bind(this);
  }
  state= {
    text: ''
  };
  getItemText(text) {
    this.setState({
      text
    });
  }
  render() {
    return (
      <EmailInput value={this.state.text}
        email={this.props.email}
        getItemText={this.getItemText}/>
    );
  }
}

export default Email;
