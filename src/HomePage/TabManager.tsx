import React from 'react';
import { TabContent, TabPane, Nav,
         NavItem, NavLink, Container } from 'reactstrap';
import classnames from 'classnames';
import AboutMe from '../AboutMe/AboutMe';
import Home from './Home';

export default class TabManager extends React.Component<{}, {activeTab : string}>   {
  constructor(props : {}) {
    super(props);

    this.state = {
      activeTab : '1'
    }

    this._toggle = this._toggle.bind(this);
  }

  _toggle(tab : string) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  componentDidUpdate() {
    var colour : string[];

    switch (this.state.activeTab) {
      case '1':
        colour = ["to top", "#5680E9", "#84CEEB"];
        break;
      case '2':
        colour = ["45deg", "#80d0c7","#13547a"];
        break;
      case '3':
        colour = ["60deg","#29323c 0%","#485563 100%"];
        break;
      default:
        colour = ["#5680E9", "#84CEEB", " #C1C8E4", "#5AB9EA" , "#8860D0"];
    }

    document.body.style.backgroundImage =
      `linear-gradient(${colour[0]}, ${colour[1]}, ${colour[2]})`;
  }

  render() {

    return (
        <div className="flex-grow-1 vh-100 flex-column d-flex">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this._toggle('1'); }}
              >
                <h6> Home </h6>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this._toggle('2'); }}
              >
                <h6> About Me </h6>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this._toggle('3'); }}
              >
                <h6> Projects </h6>
              </NavLink>
            </NavItem>
          </Nav>
        <Container className="flex-grow-1 h-75" fluid style={{}}>
          <TabContent className="h-100" activeTab={this.state.activeTab}>

            <TabPane tabId="1">
              { this.state.activeTab === '1' ? <Home/> : null }
            </TabPane>

            <TabPane className="h-100" tabId="2">
              { this.state.activeTab === '2'? <AboutMe/> : null }
            </TabPane>

            <TabPane tabId="3">
            {

            }
            </TabPane>
          </TabContent>
        </Container>
      </div>
    );
  }
}
