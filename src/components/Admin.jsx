import React, { Component } from 'react';
import {
  Nav, NavItem,
  FormGroup, FormControl,
  ControlLabel, HelpBlock,
  ListGroup, ListGroupItem,
} from "react-bootstrap";
import ProjectTable from "./ProjectTable";
import Users from './Users';
import '../styles/Admin.css';

//TODO: Edit enter ar type and customer
//      Implement backend

export default class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "2",
      arlist: [],
      customers: [],
    }

    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    console.log("Fetching data");
    const uri1 = process.env.REACT_APP_URI_AR+"findallarlist";
    fetch(uri1, {
      headers: {
        'content-type': "application/json"
      },
      method: "GET",
      mode: "cors"
    })
      .then(response => {
        return response.status === 201
          ? response.json()  
          : {success: false, message: "bad server response"}
      })
      .then(ar_data => {
        const parsed_ar_data = ar_data.result[0];
        const {customers, users, types, list, arNumber, projects} = parsed_ar_data;
        console.log("Success");
        return ar_data.success
          ? this.setState({customers, users, types, list, arNumber, projects})
          : this.setState({})
      })
  }

  handleSelect(e) {

    this.setState({activeKey: e});
  }

  renderGroup(group) {
    switch(group) {
      case '1':
        return <Projects projects={this.state.data}/>;
      case '2':
        return <Edits customers={this.state.customers} types={this.state.types} reports={this.state.list}/>;
      case '3': 
        return <Users users={this.state.users}/>;
      default:
        return <p>Nothing Here</p>
    }
  }

  render() {
    // console.log(this.state.data);
    return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={k => this.handleSelect(k)}>
          <NavItem eventKey="1">
            Projects
          </NavItem>
          <NavItem eventKey="2">
            Edit AR Items
          </NavItem>
          <NavItem eventKey="3">
            Edit Users
          </NavItem>
        </Nav>
        {this.renderGroup(this.state.activeKey)}
      </div>
    )
  }
}





const Projects = (props) => {
  const projects_list = props.projects
    ? (<div> 
        {props.projects.list.map(x => {
          return (
            <h4 key={x}>
              {x}
            </h4>
          )
        })}
        <ProjectTable data={props.projects}/>
      </div>)
    : null;

  return (
    <div>
      <p>List some projects</p>
      {projects_list}
    </div>
  )
}

class WithGrids extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(x){
    let currentState = this.state[x];
    currentState = currentState === 'active' ? '' : 'active';
    this.setState(
      {[x]: currentState}
    );
  }

  render() {
    return (
      <div className="grid-wrapper">
        <h5 className="grid-title1">{this.props.message}</h5>
        <ListGroup className="grid-list1">
        {this.props.list.map(x => (
            <ListGroupItem onClick={(e) => this.handleClick(x,e)} className={`${this.state[x]} no-dot grid-listitems1`} href="" key={x}>
              {x}
            </ListGroupItem>
        ))}
        </ListGroup>
      </div>
    )
  }
}

class Edits extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: '1'
    }
    this.submitData = this.submitData.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  submitData(e) {
    e.preventDefault();
    console.log("Submitting: ", this.state.entry);
    console.log("Extract values: ", e.target);


    const uri1 = process.env.REACT_APP_URI_AR+"updatearlist";
    fetch(uri1, {
      headers: {
        'content-type': "application/json"
      },
      method: "PATCH",
      mode: "cors",
      body: this.state.entry
    })
    .then(response1 => response1.json())
    .then(isGood => {
      console.log(isGood);
    })
  }

  handleSelect(e) {
    this.setState({activeKey: e});
  }

  renderGroup(group) {
    switch(group) {
      case '1':
        return (
          <form onKeyPress={e=>{if(e.key === "Enter") e.preventDefault()}} onSubmit={this.submitData}>
            <FormGroup
              controlId="types"
              className="gimme-space"
            >
              <ControlLabel>Enter AR Type</ControlLabel>
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="Enter AR Type"
                onChange={this.handleChange}
                onClick={this.handleClick}
                className="limit-width"
                autoComplete="Off"
              />
            </FormGroup>
          </form>
        );
      case '2':
        return (
          <form onKeyPress={e=>{if(e.key === "Enter") e.preventDefault()}} onSubmit={this.submitData}>
            <FormGroup
              controlId="customer"
              className="gimme-space"
            >
            <ControlLabel>Enter Customer Name</ControlLabel>
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="Enter Customer"
                onChange={this.handleChange}
                onClick={this.handleClick}
                className="limit-width"
                autoComplete="Off"
              />
            </FormGroup>
          </form>
        );
      default:
        return <p>Nothing Here</p>
    }
  }

  render() {
    const anotherNav = (
      <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={k => this.handleSelect(k)}>
        <NavItem eventKey="1">
          Add New AR Types
        </NavItem>
        <NavItem eventKey="2">
          Add New Customers
        </NavItem>
      </Nav>
    )
 

    return (
      <div>
        <div className="grid-one-third">
          <WithGrids message="Current ARs" list={this.props.reports ? this.props.reports : []} />
          <WithGrids message="Current AR Types" list={[1,2,3,4,5,6,7,8,9,0]} />
          <WithGrids message="Current Customers" list={this.props.customers ? this.props.customers : []} />
        </div>



        
        
        {anotherNav}  
        <div className="grid-forms">
          {this.renderGroup(this.state.activeKey)}
        </div>
      </div>
    )
  }
}

