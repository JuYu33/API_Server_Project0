import React, { Component } from 'react';
import { 
  Grid, Col, Jumbotron,
  Form, FormGroup, Checkbox,
  Button, Row, ControlLabel, FormControl
} from 'react-bootstrap';
import FieldGroup from './FieldGroup';
import '../styles/About.css';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
  }

  render() {
    const today = new Date();

    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <Col xs={6}>
            <FieldGroup
              id="shrink"
              type="text"
              label="AR Number"
              placeholder=" ####"
            />
          </Col>
          <Col xs={6}>
            <FormGroup controlId="shrink">
              <ControlLabel>Type</ControlLabel> 
              <FormControl componentClass="select">
                <option value="all">All</option>
                <option value="rma">RMA</option>
                <option value="ar">AR</option>
              </FormControl>
            </FormGroup>
          </Col>

          <Row className="w-100"/>

          <FormGroup controlId="shrink">
            <ControlLabel>Project Number</ControlLabel> 
            <FormControl componentClass="select">
              <option value="all">All</option>
              <option value="1730">1730</option>
              <option value="2019">2019</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="shrink">
            <ControlLabel>Customer</ControlLabel> 
            <FormControl componentClass="select">
              <option value="all">All</option>
              <option value="phillipsaero">Phillips Aerospace</option>
              <option value="eva">Eva</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="shrink">
            <ControlLabel>Status</ControlLabel> 
            <FormControl componentClass="select">
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </FormControl>
          </FormGroup>

          <FormGroup>
            <ControlLabel className="noMargin">Severity</ControlLabel>
            <br/>
            <Checkbox inline>1</Checkbox>{' '} 
            <Checkbox inline>2</Checkbox>{' '}
            <Checkbox inline>3</Checkbox>{' '} 
            <Checkbox inline>4</Checkbox>{' '}
            <Checkbox inline>5</Checkbox>
          </FormGroup>

          <Row className="moveUp">
            <FormGroup>
              <Col xs={1}className="moveDown">
                <ControlLabel>ECD</ControlLabel>
              </Col>
              <Col xs={5}>
                <FieldGroup 
                  id="smallHeight"
                  type="date" 
                />
              </Col>
              <Col xs={1} className="moveDown">
                <p>to </p>
              </Col>
              <Col xs={5} >
                <FieldGroup 
                  id="smallHeight"
                  type="date" 
                  max=""
                />
              </Col>
            </FormGroup>
          </Row>
        </form>
        <Col xs={4} md={6}>
            <Button className="goButton" bsStyle="info" type="submit">SEARCH</Button>
          </Col>
      </div>
    )
  }
}

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    }
    this.toggleShow = this.toggleShow.bind(this);
  }
  
  toggleShow(e) {
    e.preventDefault();
    this.setState(currState=>({show:!currState.show}));
  }

  render() {

    const showSearch = this.state.show ? <SearchForm/> : null;
    const btnVal = this.state.show ? "Hide Search Menu" : 'Show Search Menu'

    return (
      <div>
        <Grid>
          <Col xs={8} sm={8} smOffset={1} >
            <Button bsStyle="primary" onClick={this.toggleShow}>{btnVal}</Button>
            {showSearch}
          </Col>
        </Grid>
      </div>
    )
  }
}