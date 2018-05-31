import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Jumbotron,
  Grid,Row,Col,
  Image,
  Button
} from 'react-bootstrap';
import '../styles/Home.css';

export default class Home extends Component {
  render() {
    return (
      <Grid>
        <Jumbotron>
          <h2>Hi Dis Is Home</h2>
          <p>This is first paragraph</p>
          <Link to="/about">
            <Button bsStyle="primary">The ABooot button</Button>
          </Link>
        </Jumbotron>
        <Row className="show-grid text-center">
          <Col xs={12} sm={4} className="person-wrapper">
            <Image src="assets/person-1.jpg" circle className="profile-pic" />
            <h3>Person Uno</h3>
            <p>My blah blah blah lorem ipsum</p>
          </Col>
          <Col xs={12} sm={4} className="person-wrapper">
            <Image src="assets/person-2.jpg" circle className="profile-pic" />
            <h3>Person Dos</h3>
            <p>My blah blah blah lorem ipsum</p>
          </Col>
          <Col xs={12} sm={4} className="person-wrapper">
            <Image src="assets/person-3.jpg" circle className="profile-pic" />
            <h3>Person Tres</h3>
            <p>My blah blah blah lorem ipsum</p>
          </Col>
        </Row>
      </Grid>
    )
  }
}