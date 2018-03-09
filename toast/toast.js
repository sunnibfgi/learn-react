import React from 'react';
import ReactDOM from 'react-dom';

class Toast extends React.Component {
  state = {
    visible: false
  };
  constructor(props) {
    super(props);
    this.toastElement = null;
    this.timer = null;
    this.timeout = this.props.timeout;
  }
  componentDidUpdate() {
    if (this.state.visible) {
      this.adjustPosition();
    }
  }

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }
  componentDidMount() {
    if ('autoDisplay' in this.props) {
      this.autoDisplayToast();
    }
  }
  autoDisplayToast() {
    this.clearTimer();
    this.timer = setTimeout(() => {
      this.setState({
        visible: false
      });
    }, this.timeout);
    this.setState({
      visible: true
    });
  }

  adjustPosition() {
    let toast = this.toastElement;
    let {innerWidth, innerHeight} = window;
    let {clientWidth, clientHeight} = toast;
    toast.style.cssText = `top:${(innerHeight - clientHeight) / 2}px;left:${(innerWidth - clientWidth) / 2}px`;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      this.setState({
        visible: nextProps.visible
      });
    }
  }

  toastOverlay() {
    return <div className="toast-overlay"></div>;
  }

  render() {
    let {visible} = this.state;
    let toastElement = <div>{this.toastOverlay()}<div className="toast" ref={(toast) => (this.toastElement = toast)}>      {this.props.children}</div>
    </div>;
    return (
      <React.Fragment>
        {visible
          ? ReactDOM.createPortal(toastElement, document.getElementById('modal-root')) : null}
      </React.Fragment>

    );
  }
}

Toast.defaultProps = {
  timeout: 1000,
  visible: false
};

class App extends React.Component {
  state = {
    visible: false,
    msg: ''
  }
  constructor(props) {
    super(props);
    this.timer = null;
    this.timeout = this.props.timeout;
    this.onClickHandler = this.onClickHandler.bind(this);
    console.log(this.props);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onClickHandler(e) {
    clearTimeout(this.timer);
    this.setState({
      visible: true,
      msg: e.target.innerText
    });
    this.hideToast();
  }

  hideToast() {
    this.timer = setTimeout(() => {
      this.setState({
        visible: false
      });
    }, this.timeout);
  }

  render() {
    return (
      <div className="item-list">
        {
          Object.keys(this.props.browser)
            .map((el, idx) => {
              return <p key ={idx}
                onClick={this.onClickHandler}
                style={{color: '#fff', backgroundColor: this.props.browser[el]}}>{el}</p>;
            })
        }
        <Toast autoDisplay>
          {this.state.msg || 'hello world'}
        </Toast>
      </div>
    );
  }
}

App.defaultProps = {
  timeout: 1000,
  visible: false
};

export default App;
