import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Jumbotron,
  Grid,Row,Col,
  Image, FormGroup, ControlLabel,
  Button, FormControl, Checkbox,
  HelpBlock
} from 'react-bootstrap';
import FieldGroup from './FieldGroup';
import '../styles/Home.css';

/*
function ECDform() {
  return (
    <FormGroup>
      <Col xs={1} lg={1}className="moveDown">
        <ControlLabel>ECD</ControlLabel>
      </Col>
      <Col xs={5} lg={2}>
        <FieldGroup 
          id="smallHeight"
          type="date" 
        />
      </Col>
      <Col xs={1} lg={1} className="moveDown">
        <p>to </p>
      </Col>
      <Col xs={5} lg={2}>
        <FieldGroup 
          id="smallHeight"
          type="date" 
          max=""
        />
      </Col>
    </FormGroup>
  )
}
*/

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        arnum: null,
        type: null,
        projnum: null,
        customer: null,
        status: null,
        severity: null
      }
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    const tempState = Object.assign({}, this.state.form);
    const searchFor = {}
    for (let x in tempState) {
      if(tempState[x]) {
        searchFor[x] = tempState[x]
      }
    }
    console.log(searchFor);

  }

  handleChange(e) {
    e.preventDefault();
    this.setState({form: {...this.state.form, [e.target.name]: e.target.value}})
  }

  render() {
    const today = new Date();
    const ECD = null; //TODO: implement ECD search

    return (

        <form onSubmit={this.handleSearch}>
          <Grid>
            <Col xs={6} sm={4} md={3} lg={3}>
              <FieldGroup
                name="arnum"
                id="shrink"
                type="text"
                label="AR Number"
                placeholder=" Enter AR Number"
                onChange={this.handleChange}
              />
            </Col>
            <Col xs={6} sm={4} md={3} lg={3}>
              <FormGroup controlId="shrink">
                <ControlLabel>Type</ControlLabel> 
                <FormControl componentClass="select" name="type" onChange={this.handleChange}>
                  <option value="all">All</option>
                  <option value="rma">RMA</option>
                  <option value="ar">AR</option>
                </FormControl>
              </FormGroup>
            </Col>

            <Row className="w-100"/>
            
            <Col xs={6} sm={4} md={3} lg={3}>
              <FormGroup controlId="shrink">
                <ControlLabel>Project Number</ControlLabel> 
                <FormControl componentClass="select" name="projnum" onChange={this.handleChange}>
                  <option value="all">All</option>
                  <option value="1730">1730</option>
                  <option value="2019">2019</option>
                </FormControl>
              </FormGroup>
            </Col>

            <Col xs={6} sm={4} md={3} lg={3}>
              <FormGroup controlId="shrink">
                <ControlLabel>Customer</ControlLabel> 
                <FormControl componentClass="select" name="customer" onChange={this.handleChange}>
                  <option value="all">All</option>
                  <option value="phillipsaero">Phillips Aerospace</option>
                  <option value="eva">Eva</option>
                </FormControl>
              </FormGroup>
            </Col>
            <Row className="w-100"/>

            <Col xs={4} sm={3} md={2} lg={2}>
              <FormGroup controlId="shrink">
                <ControlLabel>Status</ControlLabel> 
                <FormControl name="status" onChange={this.handleChange} componentClass="select">
                  <option value="all">All</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </FormControl>
              </FormGroup>
            </Col>

            <Col xs={12} smOffset={1} sm={4} mdOffset={1} md={3} lgOffset={1} lg={3}>
              <FormGroup >
                <ControlLabel className="marginRight">Severity</ControlLabel>
                <br/>
                <Checkbox inline inputRef={ref => { this.input = ref; }}>1</Checkbox>{'  '} 
                <Checkbox inline>2</Checkbox>{'  '}
                <Checkbox inline>3</Checkbox>{'  '} 
                <Checkbox inline>4</Checkbox>{'  '}
                <Checkbox inline>5</Checkbox>
              </FormGroup>
            </Col>
            <Row className="w-100" />
            {ECD}
            <Row className="w-100" />
            <Col xs={4}>
              <Button className="moveDown20" bsStyle="info" type="submit">SEARCH</Button>
            </Col>
          </Grid>
        </form>

    )
  }
}

export default class Home extends Component {
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
      <Grid>
        <Jumbotron>
          <h2 className="homeTitle">Phillips Anomaly Report Server
          </h2>
          <Row className="w-100"/>
          <Grid >
            <Col xs={12} sm={4} med={2} lg={2} className="moveDown10">
              <Button bsStyle="primary" onClick={this.toggleShow}>{btnVal}</Button>
            </Col>
            <Col xs={12} sm={4} med={2} lg={2} className="moveDown10">
              <Link to="/newar">
                <Button bsStyle="primary" >Generate New Anomaly Report</Button>
              </Link>
            </Col>
          </Grid>
        </Jumbotron>
        <Grid>
          <Row className="w-100"/>
          {showSearch}
        </Grid>




        
      </Grid>
    )
  }
}
