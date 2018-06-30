import React, {Component} from 'react';
import {
  Grid, Row, Col, Button,
  FormGroup, FormControl, Radio, 
  ControlLabel,
} from "react-bootstrap";
import FieldGroup from './FieldGroup';
import ServerSave from "./ServerSave";
import "../styles/NewAR.css";

function AuditOnly(props) {
  return (
    <div>
      <FormGroup controlId="formObsAO" onChange={props.didChange}>
        <ControlLabel>Observation (Audit Only)</ControlLabel>
        <FormControl componentClass="textarea" placeholder="Obs" />
      </FormGroup>
      <FormGroup controlId="formAttAO" onChange={props.didChange}>
        <ControlLabel>Attribution (Audit Only)</ControlLabel>
        <FormControl componentClass="textarea" placeholder="Att" />
      </FormGroup>
      <FormGroup controlId="formExpAO" onChange={props.didChange}>
        <ControlLabel>Explanation (Audit Only)</ControlLabel>
        <FormControl componentClass="textarea" placeholder="Exp" />
      </FormGroup>
      <FormGroup controlId="formAudAO" onChange={props.didChange}>
        <ControlLabel>Auditor (Audit Only)</ControlLabel>
        <FormControl componentClass="textarea" placeholder="Aud" />
      </FormGroup>
    </div>
  )
}

function ComplaintOnly(props) {
  return (
    <div>
      <FieldGroup 
        id="complaintDate"
        label="Date Sent (Customer Complaint Only)" 
        type="date"
        onChange={props.didChange}
      />
      <FormGroup controlId="complaint" onChange={props.didChange}>
        <ControlLabel>Customer Complaint Notes</ControlLabel>
        <FormControl componentClass="textarea" placeholder="Complaint Message" />
      </FormGroup>
    </div>
  )
}

function RMAOnly(props) {
  return (
    <div>
      <FormGroup controlId="formCustRMA" onChange={props.didChange}>
        <ControlLabel>Customer Failure Report (RMA Only)</ControlLabel>
        <FormControl componentClass="textarea" placeholder="CFR" />
      </FormGroup>
    </div>
  )
}

class ArFormInstance extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // e.preventDefault();
    // console.log(e.target);
    const each_id = e.target.type === "radio" ? 'severity':e.target.id;
    this.setState({
      [each_id]: e.target.value
    })
  }
  
  render() {
      return (
      <form onKeyPress={e=>{if(e.key === "Enter") e.preventDefault()}} onSubmit={(e)=>this.props.didSubmit(this.state, e)}>
        
        <Col xs={3}>
          <FormGroup onChange={this.handleChange} controlId="arnum">
            <ControlLabel>AR Number</ControlLabel>
            <FormControl.Static>TBD</FormControl.Static>
          </FormGroup>
        </Col>

        <Col xs={3}>
          <FormGroup onChange={this.handleChange} controlId="status">
            <ControlLabel>Status</ControlLabel>
            <FormControl.Static>Open</FormControl.Static>
          </FormGroup>
        </Col>

        <Col xs={3}>
          <FormGroup controlId="type">
            <ControlLabel>Type</ControlLabel> 
            <FormControl componentClass="select" onChange={this.handleChange} >
              <option value="">** Please Select **</option>
              <option value="ar">AR</option>
              <option value="rma">RMA</option>
              <option value="complaint">Customer Complaint</option>
            </FormControl>
          </FormGroup>
        </Col>
        
        <Row className="w-100"/>
        
        <Col xs={12}>
          <FormGroup controlId="customer">
            <ControlLabel>Customer</ControlLabel>
            <FormControl onChange={this.handleChange} componentClass="select" placeholder="Nill">
              <option value="temp0">** Please Select **</option>
              <option value="abc company">abc company</option>
              <option value="temp2">DFG</option>
              <option value="temp2">Balloons</option>
            </FormControl>
          </FormGroup>
        </Col>
  
        <Col xs={6}>
          <FormGroup controlId="projNum">
            <ControlLabel>Project Number</ControlLabel>
            <FormControl onChange={this.handleChange} componentClass="select" placeholder="Boop">
              <option value="">** Please Select **</option>
              <option value="2019">2019</option>
              <option value="3008">3008</option>
            </FormControl>
          </FormGroup>
        </Col>
        <Row className="w-100"/>
 
        <Col xs={4}>
          <FieldGroup
            id="formAssembly"
            type="text"
            label="Assembly Number"
            placeholder="Enter Assembly Number"
            onChange={this.handleChange}
          />
        </Col>

        <Col xs={4}>
          <FieldGroup 
            id="formPartNum" 
            label="Part Number" 
            type="text"
            onChange={this.handleChange}
          />
        </Col>

        <Col xs={4}>
          <FieldGroup 
            id="formSerialNum" 
            label="Serial Number" 
            type="text"
            onChange={this.handleChange}
          />
        </Col>

  
        <Col xs={12}>
          <FormGroup controlId="processOwner">
            <ControlLabel>Process Owner</ControlLabel>
            <FormControl componentClass="select" placeholder="Type" onChange={this.handleChange}>
              <option value="temp0">** Please Select **</option>
              <option value="person1">person 1</option>
              <option value="person2">person 2</option>
              <option value="person3">person 3</option>
            </FormControl>
          </FormGroup>
        </Col>
  

        <Col xs={6}>
          <FieldGroup 
            id="formEngApprov" 
            label="Eng Approv" 
            type="text" 
            onChange={this.handleChange}
            value="R Dunn"
          />
        </Col>

        <Col xs={6}>
          <FieldGroup 
            id="qa" 
            label="QA"
            type="text" 
            onChange={this.handleChange}
          />
        </Col>

        <Col xs={6}>
          <FieldGroup 
            id="date"
            label="Entry Date" 
            type="date"
            onChange={this.handleChange}
          />
        </Col>

        <Col xs={6}> 
          <FieldGroup 
            id="ecd"
            label="ECD" 
            type="date" 
            onChange={this.handleChange}
          />
        </Col>
  
        <FormGroup controlId="problem">
          <ControlLabel>Problem</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Describe the issue" onChange={this.handleChange}/>
        </FormGroup>
  
        <FormGroup controlId="severity" onChange={this.handleChange}>
          <ControlLabel>Severity</ControlLabel>
          <br/>
          <Radio value="1" name="radioGroup" inline>
            1
          </Radio>{' '}
          <Radio value="2" name="radioGroup" inline>
            2
          </Radio>{' '}
          <Radio value="3" name="radioGroup" inline>
            3
          </Radio>{' '}
          <Radio value="4" name="radioGroup" inline>
            4
          </Radio>{' '}
          <Radio value="5" name="radioGroup" inline>
            5
          </Radio>
        </FormGroup>

        <Row className="w-100"/>
  
        <FormGroup controlId="formImmCorrAction">
          <ControlLabel>Immediate Corrective Action</ControlLabel>
          <FormControl componentClass="textarea" placeholder="ICA" onChange={this.handleChange}/>
        </FormGroup>
  
        <FormGroup controlId="formRootCause">
          <ControlLabel>Root Cause</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Describe originating issue" onChange={this.handleChange}/>
        </FormGroup>
  
        <FormGroup controlId="formRCC">
          <ControlLabel>Root Cause Correction</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Correction" onChange={this.handleChange}/>
        </FormGroup>
  
        <FormGroup controlId="formPrevAction">
          <ControlLabel>Preventative Action</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Preventative Action" onChange={this.handleChange}/>
        </FormGroup>
  
        <FormGroup controlId="formDevImp">
          <ControlLabel>Device Impact</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Dev Impact" onChange={this.handleChange}/>
        </FormGroup>
  
        <FormGroup controlId="formDesImp">
          <ControlLabel>Design Impact</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Des Impact" onChange={this.handleChange}/>
        </FormGroup>
  
        <FormGroup controlId="formQAimp">
          <ControlLabel>QA Impact</ControlLabel>
          <FormControl componentClass="textarea" placeholder="impact" onChange={this.handleChange}/>
        </FormGroup>

        {this.props.isAuditor ? <AuditOnly didChange={this.handleChange}/> : null}
        {this.state.type === "rma" ? <RMAOnly didChange={this.handleChange}/> : null}
        {this.state.type === "complaint" ? <ComplaintOnly didChange={this.handleChange}/> : null}
        
        <Button type="submit">Submit</Button>
        <Button type="button" onClick={(e)=>this.props.didClick(this.state, "cancel", e)}>Cancel</Button>
      </form>

  )}
};


export default class NewAR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submittedForm: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentDidMount(e) {
    //fetch api data
    const uri1 = process.env.REACT_APP_URI_AR+"findallarlist";
    fetch(uri1,{
      headers: {
        'content-type': "application/json"
      },
      method: "GET",
      mode: "cors"
    })
      .then(response => response.json())
      .then(ar_data => {
        const parsed_ar_data = ar_data.result[0];
        console.log(parsed_ar_data);
      })
      

  }

  onKeyPress(e) {
    if(e.which === 13){
      e.preventDefault()
    }
  }

  handleClick(reset1, type, e) {
    e.preventDefault();
    console.log("Type: ", type);

  }

  handleSubmit(submitData, e) {
    e.preventDefault();
    console.log("Submit Data: ", submitData );

    //TODO SaveToServer
    // VerifyData()
    //if incomplete:
    //window.scrollTo(0,0);
    // ServerSave(submitData);
    const uri1 = process.env.REACT_APP_URI_AR+"submit";
    fetch(uri1, {
      headers: {
        'content-type': "application/json"
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(submitData)
    })

  }

  render() {
    return (
      <div>
        <Grid>
          <h2 className="text-center">Anomaly Report</h2>
          <br/>
          <ArFormInstance 
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


