import React, { Component } from 'react';
import { Jumbotron, Col, Row,
  Form, FormGroup, FormControl,
  ControlLabel, Button
} from 'react-bootstrap';
import {
  Redirect
} from 'react-router-dom';
import '../styles/Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      por: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onLogIn(this.state.username, this.state.por, e);
    this.setState({
      username: '',
      por: ''
    });
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/'}};

    if(this.props.redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div>

          <Jumbotron className="loginWindow">
            <Form onSubmit={this.handleSubmit}>
              
              <FormGroup controlId="formEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  User
                </Col>
                <Col sm={5} md={2} lg={2}>
                  <FormControl
                    name="username"
                    type="text" 
                    placeholder="Username" 
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>

              <Row className="w-100"></Row>

              <FormGroup controlId="formPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={5} md={2} lg={2}>
                  <FormControl
                    name="por"
                    type="password"
                    placeholder="Password" 
                    value={this.state.por}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit">Log in</Button>
                </Col>
              </FormGroup>
            </Form>
          </Jumbotron>

      </div>
    )
  }
}