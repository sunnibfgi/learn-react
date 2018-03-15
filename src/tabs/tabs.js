import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class TabPanel extends React.Component {
  renderTabTitle() {
    let {children, currentIndex, spread, setCurrentNav} = this.props;

    if (!children.length) return null;

    if ('spread' in this.props && spread.length) {
      let navItem = children.concat(spread);
      return (
        navItem.map((el, idx) =>
          <li key={idx}
            className={idx === currentIndex ? 'current' : ''}
            onClick={() => setCurrentNav(idx)}
          >
            {children[idx] && children[idx].props.tabname ? children[idx].props.tabname : el}
          </li>
        )
      );
    }

    return (
      children.map((child, idx) =>
        <li key={idx}
          className={idx === currentIndex ? 'current' : ''}
          onClick={() => setCurrentNav(idx)}
        >
          {children[idx].props.tabname}
        </li>
      )
    );
  }

  renderTabContent() {
    let props = {...this.props};
    return (
      <div className="tab-content">
        {props.children[props.currentIndex]}
      </div>
    );
  }
  render() {
    return (
      <div className="tabs">
        {this.renderTabTitle()}
        {this.renderTabContent()}
      </div>
    );
  }
}

TabPanel.propTypes = {
  spread: PropTypes.array,
  children: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired,
  setCurrentNav: PropTypes.func.isRequired
};


class Tabs extends React.Component {
  state = {
    currentIndex: 0
  };

  constructor(props) {
    super(props);
    this.onClickTabNavHandler = this.onClickTabNavHandler.bind(this);
  }

  storeCurrentState() {
    let {localStorage} = window;
    if (!('hasStore' in this.props)) {
      localStorage.removeItem('tabIndex');
      return false;
    };
    localStorage.setItem('tabIndex', JSON.stringify(this.state.currentIndex));
  }

  componentDidMount() {
    if (localStorage.getItem('tabIndex') != null) {
      this.setState({
        currentIndex: JSON.parse(localStorage.getItem('tabIndex'))
      });
    }
  }

  componentDidUpdate() {
    this.storeCurrentState();
  }

  onClickTabNavHandler(idx) {
    this.setState({
      currentIndex: idx
    });
  }

  render() {
    let {currentIndex} = this.state;
    return (
      <TabPanel
        setCurrentNav = {this.onClickTabNavHandler}
        currentIndex= {currentIndex}>
        <div tabname="chrome" className="tab-item">tab content 1</div>
        <div tabname="firefox" className="tab-item">tab content 2</div>
        <div tabname="safari" className="tab-item">tab content 3</div>
        <div tabname="opera" className="tab-item">tab content 4</div>
      </TabPanel>
    );
  }
}

Tabs.propTypes = {
  hasStore: PropTypes.bool
};
ReactDOM.render(
  <Tabs hasStore/>,
  document.getElementById('app')
);

