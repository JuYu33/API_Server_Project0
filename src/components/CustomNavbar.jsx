import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/CustomNavbar.css'

export default class CustomNavbar extends Component {
  render() {
    const logout = this.props.loggedIn 
      ? <Navbar.Form pullRight>
          <Button  onClick={this.props.logout}>
            Log Out
          </Button>
        </Navbar.Form>
      : null; 
    return (
      <Navbar default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              Phillips Anomaly Report Server
            </Link>

          </Navbar.Brand>
          <Navbar.Toggle/>

        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} componentClass={Link} href='/' to="/">
              Home
            </NavItem>
            <NavItem eventKey={2} componentClass={Link} href='/' to="/about">
              About
            </NavItem>
            <NavItem eventKey={3} componentClass={Link} href='/' to="/newar">
              New AR
            </NavItem>

            {logout}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}