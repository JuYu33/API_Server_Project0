import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/CustomNavbar.css'

export default class CustomNavbar extends Component {
  render() {
    const toggle = this.props.loggedIn ? <Navbar.Toggle/> : null;
    const adminLink = this.props.isAdmin
      ? (<NavItem eventKey={2} className="moveDown10" componentClass={Link} href='/' to="/admin">
          Admin Powers
        </NavItem>)
      : null;

    const navLinks = this.props.loggedIn
      ? (<Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} className="moveDown10" componentClass={Link} href='/' to="/">
              Home
            </NavItem>
            {adminLink}
            <NavItem eventKey={3} className="moveDown10" componentClass={Link} href='/' to="/newar">
              New AR
            </NavItem>
            <NavItem>
            <Button  onClick={this.props.logout}>
              Log Out
            </Button>
            </NavItem>
          </Nav>
        </Navbar.Collapse>)
      : null
    return (
      <Navbar default collapseOnSelect>
        <Navbar.Header>
            <Link to="/">
              <Image src="/assets/pa1.png" className="moveToCorner"/>
            </Link>

            
            {/* <Navbar.Toggle/> */}
            {toggle}

        </Navbar.Header>
        {navLinks}
      </Navbar>
    )
  }
}