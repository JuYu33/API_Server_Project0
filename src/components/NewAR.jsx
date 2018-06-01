import React, {Component} from 'react';
import {
  Grid, Row, Col, Button,
  FormGroup, FormControl, Radio, 
  ControlLabel,
} from "react-bootstrap";
import FieldGroup from './FieldGroup';
import "../styles/NewAR.css";

function AuditOnly(props) {
  console.log(props);
  return (
    <div>
      <FormGroup controlId="formObsAO">
        <ControlLabel>Observation (Audit Only)</ControlLabel>
        <FormControl componentClass="textarea" placeholder="Obs" />
      </FormGroup>
      <FormGroup controlId="formAttAO">
        <ControlLabel>Attribution (Audit Only)</ControlLabel>
        <FormControl componentClass="textarea" placeholder="Att" />
      </FormGroup>
      <FormGroup controlId="formExpAO">
        <ControlLabel>Explanation (Audit Only)</ControlLabel>
        <FormControl componentClass="textarea" placeholder="Exp" />
      </FormGroup>
      <FormGroup controlId="formAudAO">
        <ControlLabel>Auditor (Audit Only)</ControlLabel>
        <FormControl componentClass="textarea" placeholder="Aud" />
      </FormGroup>
    </div>
  )
}

function ComplaintOnly() {
  return (
    <div>
      <FieldGroup 
        id="formDateSent"
        label="Date Sent (Customer Complaint Only)" 
        type="date" 
      />
    </div>
  )
}

function RMAonly() {
  return (
    <div>
      <FormGroup controlId="formCustRMA">
        <ControlLabel>Customer Failure Report (RMA Only)</ControlLabel>
        <FormControl componentClass="textarea" placeholder="CFR" />
      </FormGroup>
    </div>
  )
}

class FormInstance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: "bingo",
      audit: {}
    }
    //TODO: Need to receive props in order to show audit, complaint, rma
  }
  
  render() {
    const myData = "temporary";
    const isAuditor = this.props.isAuditor
      ? <AuditOnly/>
      : "Auditor Only";
    const {type} = this.state;

    return (
      <form onSubmit={(e)=>this.props.didSubmit(myData, e)}>

        <Col xs={3}>
          <FormGroup controlId="arNum">
            <ControlLabel>AR Number</ControlLabel>
            <FormControl.Static>TBD</FormControl.Static>
          </FormGroup>
        </Col>

        <Col xs={3}>
          <FormGroup controlId="arNum">
            <ControlLabel>Status</ControlLabel>
            <FormControl.Static>Open</FormControl.Static>
          </FormGroup>
        </Col>

        <Col xs={3}>
          <FormGroup controlId="typeSelect">
            <ControlLabel>Type</ControlLabel> 
            <FormControl componentClass="select" placeholder="Dupe">
              <option value="temp0">** Please Select **</option>
              <option value="temp1">AR</option>
              <option value="temp2">RMA</option>
            </FormControl>
          </FormGroup>
        </Col>
        
        <Row className="w-100"/>
        
        <Col xs={12}>
          <FormGroup controlId="customer">
            <ControlLabel>Customer</ControlLabel>
            <FormControl componentClass="select" placeholder="Nill">
              <option value="temp0">** Please Select **</option>
              <option value="temp1">abc company</option>
              <option value="temp2">DFG</option>
              <option value="temp2">Balloons</option>
            </FormControl>
          </FormGroup>
        </Col>
  
        <Col xs={6}>
          <FormGroup controlId="projNum">
            <ControlLabel>Project Number</ControlLabel>
            <FormControl componentClass="select" placeholder="Boop">
              <option value="temp0">** Please Select **</option>
              <option value="temp1">2019</option>
              <option value="temp2">3008</option>
            </FormControl>
          </FormGroup>
        </Col>
        <Row className="w-100"/>
 
        <Col xs={4}>
          <FieldGroup
            id="formAssembly"
            type="text"
            label="Assembly Number"
            placeholder="####-###"
          />
        </Col>
        <Col xs={4}>
          <FieldGroup 
            id="formPartNum" 
            label="Part Number" 
            type="text" 
          />
        </Col>
        <Col xs={4}>
          <FieldGroup 
            id="formSerialNum" 
            label="Serial Number" 
            type="text" 
          />
        </Col>

  
        <Col xs={12}>
          <FormGroup controlId="customer">
            <ControlLabel>Process Owner</ControlLabel>
            <FormControl componentClass="select" placeholder="Type">
              <option value="temp0">** Please Select **</option>
              <option value="temp1">person 1</option>
              <option value="temp2">person 1</option>
              <option value="temp2">person 1</option>
            </FormControl>
          </FormGroup>
        </Col>
  

        <Col xs={6}>
          <FieldGroup 
            id="formEngApprov" 
            label="Eng Approv" 
            type="text" 
          />
        </Col>

        <Col xs={6}>
          <FieldGroup 
            id="formQual" 
            label="QA"
            type="text" 
          />
        </Col>

        <Col xs={6}> 
          <FieldGroup 
            id="formDate"
            label="Entry Date" 
            type="date" 
          />
        </Col>
        <Col xs={6}> 
          <FieldGroup 
            id="formECD"
            label="ECD" 
            type="date" 
          />
        </Col>
  
        <FormGroup controlId="formProblem">
          <ControlLabel>Problem</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Describe the issue" />
        </FormGroup>
  
        <FormGroup>
          <ControlLabel>Severity</ControlLabel>
          <br/>
          <Radio name="radioGroup" inline>
            1
          </Radio>{' '}
          <Radio name="radioGroup" inline>
            2
          </Radio>{' '}
          <Radio name="radioGroup" inline>
            3
          </Radio>{' '}
          <Radio name="radioGroup" inline>
            4
          </Radio>{' '}
          <Radio name="radioGroup" inline>
            5
          </Radio>
        </FormGroup>
  
        <FormGroup controlId="formImmCorrAction">
          <ControlLabel>Immediate Corrective Action</ControlLabel>
          <FormControl componentClass="textarea" placeholder="ICA" />
        </FormGroup>
  
        <FormGroup controlId="formRootCause">
          <ControlLabel>Root Cause</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Describe originating issue" />
        </FormGroup>
  
        <FormGroup controlId="formRCC">
          <ControlLabel>Root Cause Correction</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Correction" />
        </FormGroup>
  
        <FormGroup controlId="formPrevAction">
          <ControlLabel>Preventative Action</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Preventative Action" />
        </FormGroup>
  
        <FormGroup controlId="formDevImp">
          <ControlLabel>Device Impact</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Dev Impact" />
        </FormGroup>
  
        <FormGroup controlId="formDesImp">
          <ControlLabel>Design Impact</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Des Impact" />
        </FormGroup>
  
        <FormGroup controlId="formQAimp">
          <ControlLabel>QA Impact</ControlLabel>
          <FormControl componentClass="textarea" placeholder="impact" />
        </FormGroup>

        <AuditOnly fromData={this.state.audit}/>
        {/* <ComplaintOnly/> */}
        {/* <RMAonly/> */}
  

        <Button type="submit">Submit</Button>
        <Button type="button" onClick={(e)=>this.props.didClick(myData, "cancel", e)}>Cancel</Button>
        <Button type="button" onClick={(e)=>this.props.didClick(myData, "save", e)}>Save</Button>
      </form>
  )}
};


export default class NewAR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonClicked: false,
      submittedForm: {},
      isRMA: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(e) {

  }

  handleClick(reset1, type, e) {
    e.preventDefault();
    console.log("Type: ", type);
  }

  handleSubmit(submitData, e) {
    e.preventDefault();
    console.log("Submit")
  }

  render() {
    return (
      <div>
        <Grid>
          <h2 className="text-center">Anomaly Report</h2>
          <br/>
          <FormInstance 
            test="testVal" 
            didSubmit={this.handleSubmit}
            didClick={this.handleClick}
            didClick2={this.handleClick2}
            isAuditor={this.props.isAuditor}
          />
        </Grid>
      </div>
    )
  }
}


