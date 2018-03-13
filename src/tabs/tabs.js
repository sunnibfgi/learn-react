import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class TabPanel extends React.Component {
  renderTabTitle() {
    let {children, tabNav, currentIndex, setCurrentNav} = this.props;
    return (
      <ul>
        {
          children.length &&
            children.map((el, idx) =>
              <li
                key={idx}
                className={idx === currentIndex ? 'current' : ''}
                onClick={() => setCurrentNav(idx)}
              >{tabNav[idx]}</li>)
        }
      </ul>
    );
  }

  renderTabContent() {
    let props = {...this.props};
    return (
      <div className="tab-pane">
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
  children: PropTypes.array.isRequired,
  tabNav: PropTypes.array.isRequired,
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
    if (!'hasStore' in this.props) return false;
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
    let {tabNav} = this.props;
    return (
      <TabPanel
        setCurrentNav = {this.onClickTabNavHandler}
        currentIndex= {currentIndex}
        tabNav={tabNav}>
        <div className="tab-content">tab content 1</div>
        <div className="tab-content">tab content 2</div>
        <div className="tab-content">tab content 3</div>
        <div className="tab-content">tab content 4</div>
      </TabPanel>
    );
  }
}

Tabs.propTypes = {
  hasStore: PropTypes.bool,
  tabNav: PropTypes.array.isRequired
};

ReactDOM.render(
  <Tabs hasStore tabNav={['chrome', 'firefox', 'safari', 'opera']}/>,
  document.getElementById('app')
);
