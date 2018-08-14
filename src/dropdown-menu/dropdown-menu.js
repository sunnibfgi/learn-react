import './components/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Switch, Redirect, withRouter } from 'react-router-dom';
import {observable, action} from 'mobx';
import {observer, inject, Provider} from 'mobx-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// class Login extends React.Component {
//   state = {
//     value: ''
//   }
//   componentWillMount() {
//     let userName = localStorage.getItem('userName') && JSON.parse(localStorage.getItem('userName'));
//     if (userName === 'jamesanthony' && this.props.match.path === '/login') {
//       this.props.history.push('/data-list');
//     }
//   }
//   submitHandler = e => {
//     let {value} = this.state;
//     if (!value.length) {
//       e.preventDefault();
//       alert('enter you username');
//     } else {
//       localStorage.setItem('userName', JSON.stringify(value));
//       this.props.history.push('/data-list');
//     }
//   }
//   onChangeHandler = e => {
//     this.setState({
//       value: e.target.value
//     });
//   }
//   render() {
//     return (
//       <form onSubmit={this.submitHandler}>
//         <div className="login-content">
//           <p>
//             <input type="text" placeholder="enter your username" onChange={this.onChangeHandler}/>
//           </p>
//         </div>
//       </form>
//     );
//   }
// }
// const LoadData = (Component, url) => {
//   return class extends React.Component {
//     state = {
//       loading: false,
//       data: []
//     }
//     componentDidMount() {
//       this.setState({
//         ...this.state,
//         loading: true
//       });
//       this.fetchData();
//     }
//     fetchData() {
//       fetch(url)
//         .then(res => res.json())
//         .then(data => this.setState({
//           loading: false,
//           data
//         }));
//     }
//     render() {
//       let {loading} = this.state;
//       return (
//         loading ? <p>loading data...</p>
//           : <Component {...this.state} />

//       );
//     }
//   };
// };
// function DataItem({data}) {
//   return (
//     <ReactCSSTransitionGroup
//       transitionName="example"
//       transitionAppear = {true}
//       transitionAppearTimeout = {300}
//       transitionEnter = {false}
//       transitionLeave = {false}>
//       {data.map((item, i) => <p key={i}>{item.description}</p>)}
//     </ReactCSSTransitionGroup>
//   );
// }
// const DataListPage = LoadData(DataItem, './data.json');

// @withRouter
// class PrivateRoute extends React.Component {
//   render() {
//     let userName = localStorage.getItem('userName') && JSON.parse(localStorage.getItem('userName'));
//     return (
//       userName === 'jamesanthony' ? <Route {...this.props} /> : <Redirect to="/login" />
//     );
//   }
// }
// const LoginComponent = withRouter(Login);
// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <Test />
//         <Switch>
//           <Route path="/login" component={LoginComponent} />
//           <PrivateRoute path="/data-list" component={DataListPage} />
//           <Route component={() => <h1>not found!</h1>} />
//           <Redirect from="/" to="/login" />

//         </Switch>
//       </div>
//     );
//   }
// }

function SubMenu({children}) {
  return (
    <div className="dropdown">
      {children}
    </div>
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
    let {navName, children} = this.props;
    let {visible} = this.state;
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

