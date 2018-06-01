import React, { Component } from 'react';
import { 
  Grid, Col, Jumbotron,
  Form, FormGroup, Checkbox,
  Button, Row, ControlLabel, FormControl,
  HelpBlock, Radio
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


const FormInstance = () => (
  <form>
    <FieldGroup
      id="formControlsText"
      type="text"
      label="Text"
      placeholder="Enter text"
    />
    <FieldGroup
      id="formControlsEmail"
      type="email"
      label="Email address"
      placeholder="Enter email"
    />
    <FieldGroup id="formControlsPassword" label="Password" type="password" />
    <FieldGroup
      id="formControlsFile"
      type="file"
      label="File"
      help="Example block-level help text here."
    />

    <Checkbox checked readOnly>
      Checkbox
    </Checkbox>
    <Radio checked readOnly>
      Radio
    </Radio>

    <FormGroup>
      <Checkbox inline>1</Checkbox> <Checkbox inline>2</Checkbox>{' '}
      <Checkbox inline>3</Checkbox>
    </FormGroup>
    <FormGroup>
      <Radio name="radioGroup" inline>
        1
      </Radio>{' '}
      <Radio name="radioGroup" inline>
        2
      </Radio>{' '}
      <Radio name="radioGroup" inline>
        3
      </Radio>
    </FormGroup>

    <FormGroup controlId="formControlsSelect">
      <ControlLabel>Select</ControlLabel>
      <FormControl componentClass="select" placeholder="select">
        <option value="select">select</option>
        <option value="other">...</option>
      </FormControl>
    </FormGroup>
    <FormGroup controlId="formControlsSelectMultiple">
      <ControlLabel>Multiple select</ControlLabel>
      <FormControl componentClass="select" multiple>
        <option value="select">select (multiple)</option>
        <option value="other">...</option>
      </FormControl>
    </FormGroup>

    <FormGroup controlId="formControlsTextarea">
      <ControlLabel>Textarea</ControlLabel>
      <FormControl componentClass="textarea" placeholder="textarea" />
    </FormGroup>

    <FormGroup>
      <ControlLabel>Static text</ControlLabel>
      <FormControl.Static>email@example.com</FormControl.Static>
    </FormGroup>

    <Button type="submit">Submit</Button>
  </form>
);

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
        <FormInstance />
      </div>
    )
  }
}