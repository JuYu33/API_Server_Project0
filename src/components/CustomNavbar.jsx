import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/CustomNavbar.css'

export default class CustomNavbar extends Component {
  render() {
    const logout = this.props.loggedIn 
      ?   <Button  onClick={this.props.logout}>
            Log Out
          </Button>
      : null; 
    return (
      <Navbar default collapseOnSelect>
        <Navbar.Header>
            <Link to="/">
              <Image src="/assets/pa1.png" className="moveToCorner"/>
            </Link>

            
          <Navbar.Toggle/>

        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} className="moveDown10" componentClass={Link} href='/' to="/">
              Home
            </NavItem>
            <NavItem eventKey={2} className="moveDown10" componentClass={Link} href='/' to="/about">
              About
            </NavItem>
            <NavItem eventKey={3} className="moveDown10" componentClass={Link} href='/' to="/newar">
              New AR
            </NavItem>
            <NavItem>
              {logout}
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}