import './app.css';
import React from 'react';
import {Home, NoMatch, Category, Countries, Browsers} from './pages';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/countries" component={Countries} />
              <Route path="/browsers" component={Browsers} />
              <Redirect from="/" to="/home" />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
