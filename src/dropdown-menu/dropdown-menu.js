import React from 'react';
import ReactDOM from 'react-dom';

function SubMenu({children}) {
  return (
    children ? <div className="dropdown">
      {children}
    </div> : null
  );
}

class DropdownMenu extends React.Component {
  state = {
    visible: false
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }
  handleClick = e => {
    if (this.element && !this.element.contains(e.target)) {
      this.setState({
        visible: false
      });
    }
  }
  toggleVisible = e => {
    e.preventDefault();
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    const {navName, children} = this.props;
    const {visible} = this.state;
    return (
      <li
        style={{float: 'left', listStyle: 'none', marginLeft: '10px'}}
        ref={el => this.element = el}>
        <strong onClick={this.toggleVisible}><a href="#">{navName}</a></strong>
        {
          visible ? <SubMenu>{children}</SubMenu> : null
        }
      </li>
    );
  }
}

function MenuApp() {
  return (
    <div className="drop-menu">
      <ul>
        <DropdownMenu navName="browser">
          <p><a href="http://www.baidu.com/">chrome</a></p>
          <p>firefox</p>
          <p>safari</p>
          <p>opera</p>
        </DropdownMenu>
        <DropdownMenu navName="countries">
          <p>united kingdom</p>
          <p>france</p>
          <p>germany</p>
          <p>italy</p>
        </DropdownMenu>
      </ul>
    </div>
  );
}
ReactDOM.render(
  <MenuApp />,
  document.getElementById('app')
);

