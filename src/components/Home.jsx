import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Jumbotron,
  Grid,Row,Col,
  Image, FormGroup, ControlLabel,
  Button, FormControl, Checkbox,
  HelpBlock, Table
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



export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow(e) {
    e.preventDefault();
    this.setState(currState=>({show:!currState.show}));
  }

  render() {
    const data = null;
    const showSearch = this.state.show ? <SearchForm/> : null;
    const btnVal = this.state.show ? "Hide Search Menu" : 'Show Search Menu'
    return (
      <Grid>
        <Jumbotron>
          <h2 className="homeTitle">Phillips Anomaly Report Server
          </h2>
          <Row className="w-100"/>
          
        </Jumbotron>

        <Grid >
            <Col xs={4} sm={4} med={2} lg={2} className="moveDown10 gimme-space">
              <Button bsStyle="primary" onClick={this.toggleShow}>{btnVal}</Button>
            </Col>
            <Col xs={4} sm={4} med={2} lg={2} className="moveDown10 gimme-space">
              <Link to="/newar">
                <Button bsStyle="primary" >Generate New Anomaly Report</Button>
              </Link>
            </Col>
          </Grid>

        <Grid className="gimme-space">
          <Row className="w-100"/>
          {showSearch}
        </Grid>
        <Table striped bordered condensed hover className="moveDown20 gimme-space">
          <thead>
            <tr>
              <th>AR #</th>
              <th>Type</th>
              <th>Status</th>
              <th>Project Number</th>
              <th>Severity</th>
              <th>Customer</th>
              <th>Process Owner</th>
              <th>Date</th>
            </tr>
          </thead>
          {data}
        </Table>    
      </Grid>
    )
  }
}


class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        arnum: null,
        type: null,
        projnum: null,
        customer: null,
        checks: {
          sev1: false,
          sev2: false,
          sev3: false,
          sev4: false,
          sev5: false,
          open: false,
          closed: false
        }
      }
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleChecks = this.toggleChecks.bind(this);
  }

  toggleChecks(e) {
    console.log(e.target);
    this.setState({
      form: {
        ...this.state.form,
        checks: {
          ...this.state.form.checks,
          [e.target.name]: e.target.checked
        }
      }
    })
    console.log(this.state.form);
  }

  handleSearch(e) {
    const tempState = Object.assign({}, this.state.form);
    const searchFor = {}
    for (let x in tempState) {
      if(tempState[x]) {
        searchFor[x] = tempState[x]
        localStorage.setItem(x,tempState[x]);
      }
    }
    // console.log(searchFor);

  }

  handleChange(e) {
    // e.preventDefault();
    this.setState({
      form: {
        ...this.state.form, [e.target.name]: e.target.value
      }
    })
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
                autoComplete="Off"
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
            <Col xs={6} smOffset={1} sm={6} mdOffset={1} md={3} lgOffset={1} lg={3}>
              <FormGroup >
                <ControlLabel className="marginRight" name="status2">Status</ControlLabel>
                <br/>
                <Checkbox inline checked={this.state.form.open} onChange={this.toggleChecks} name="open">Open</Checkbox>{'  '}
                <Checkbox inline checked={this.state.form.closed} onChange={this.toggleChecks} name="closed">Closed</Checkbox>{'  '} 
              </FormGroup>
            </Col>

            <Col xs={6} smOffset={1} sm={6} mdOffset={1} md={3} lgOffset={1} lg={3}>
              <FormGroup >
                <ControlLabel className="marginRight" name="severity">Severity</ControlLabel>
                <br/>
                <Checkbox inline checked={this.state.form.sev1} onChange={this.toggleChecks} name="sev1">1</Checkbox>{'  '} 
                <Checkbox inline checked={this.state.form.sev2} onChange={this.toggleChecks} name="sev2">2</Checkbox>{'  '}
                <Checkbox inline checked={this.state.form.sev3} onChange={this.toggleChecks} name="sev3">3</Checkbox>{'  '} 
                <Checkbox inline checked={this.state.form.sev4} onChange={this.toggleChecks} name="sev4">4</Checkbox>{'  '}
                <Checkbox inline checked={this.state.form.sev5} onChange={this.toggleChecks} name="sev5">5</Checkbox>
              </FormGroup>
            </Col>
            <Row className="w-100" />
            {ECD}
            <Row className="w-100" />
            <Col xs={4}>
              <Button className="gimme-space" bsStyle="info" type="submit">SEARCH</Button>
            </Col>
          </Grid>
        </form>

    )
  }
}