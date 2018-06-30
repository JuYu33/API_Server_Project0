import React, { Component } from 'react';
import {
  Alert, MenuItem, FormGroup, FormControl,
  ControlLabel, ButtonGroup, HelpBlock,
  Table, Button, DropdownButton
} from "react-bootstrap";
import '../styles/Users.css';

//Todo: Implemenent backend password change

export default class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allUsers: [],
      username: '',
      selected: '',
      addUser: false,
      changePass: false,
      deleteUser: false
    }

    this.addUser = this.addUser.bind(this);
    this.changePass = this.changePass.bind(this);
    this.confirmNewPass = this.confirmNewPass.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.delete = this.delete.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handleUsersUpdate = this.handleUsersUpdate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    const uri1 = process.env.REACT_APP_URI_USER+'AFDX';

    fetch(uri1, {
      headers: {
        'content-type': "application/json"
      },
      method: "GET",
      mode: "cors"
    })
    .then(user => user.json())
    .then(data => {
      this.setState({allUsers: data.all_users})
    })
  }

  addUser() {
    const currently = this.state.addUser;
    this.setState({
      addUser: !currently,
      changePass: false,
      deleteUser: false
    });
  }

  confirmNewPass(newPass) {    
    this.setState({
      specialmessage: "Password Changed",
      messageState: 'success',
      changePass: false
    })
  }

  changePass() {
    this.setState({
      changePass: true,
      addUser: false,
      deleteUser: false
    });
  }

  deleteUser() {
    this.setState({
      deleteUser: true,
      addUser: false,
      changePass: false
    });
  }

  delete() {
    const uri1 = process.env.REACT_APP_URI_USER+'deleteemail/'+this.state.selected;    
    fetch(uri1, {
      headers: {"content-type": "application:json"},
      method: "DELETE",
      mode: "cors"
    })
    .then(user => {
      if(user.status === 200) {
        const newSet = this.state.allUsers
        const del_i = newSet.findIndex(x=> {
          return x.email === this.state.selected;
        })
        newSet.splice(del_i, 1);
        this.setState({
          username: '',
          selected: '',
          deleteUser: false,
          messageState: 'danger'
        })
      }
      return user.json()})
    .then(data => {
      this.setState({
        specialmessage: data.message
      })
    })
    .catch(err => {
      console.log("Error deleting user");
      this.setState({
        specialmessage: "Error Deleting User"
      })
    })
  }

  handleCancel() {
    this.setState({
      username: '',
      selected: '',
      deleteUser: false,
    })
  }

  handleRadio(username, e) {
    this.setState({
      username: e.target.id === this.state.selected ? '' : username,
      selected: e.target.id === this.state.selected ? '' : e.target.id,
      changePass: false,
      deleteUser: false,
      newpassword: '',
      confirmpassword: ''
    })
  }

  handleUsersUpdate(newUser) {
    const allUsers = this.state.allUsers;
    allUsers.push(newUser);
    this.setState({allUsers});
  }


  render() {
    return (
      <div>
        <div className="grid-users">
          <div className="user-grid">
          <h2 className="grid-title1">Current Users</h2>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Select</th>
                <th>Username</th>
                <th>Email</th>
                <th>User Type</th>
              </tr>
            </thead>
            <tbody>
            {this.state.allUsers.map(x => (
              <tr key={x.username}>
                <td key={x.username+"check"}>
                  {x.username ==="AdamInn" 
                    ? null 
                    : <input type="radio" 
                        name="radioGroup"
                        id={x.email}
                        onClick={e=>this.handleRadio(x.username,e)}
                        checked={this.state.selected === x.email}
                      >
                      </input>}
                </td>
                <td key={x.username+"name"}>{x.username}</td>
                <td key={x.username+"email"}>{x.email}</td>
                <td key={x.username+"type"}>{x.usertype}</td>
              </tr>
            ))}
            </tbody>
          </Table>
        </div>
        </div>
        <button className={`gimme-space`} onClick={this.addUser}> {this.state.addUser ? "Hide New User Menu" : "Add New User"} </button>
        <button className={`gimme-space ${this.state.selected.length === 0 ? 'gray-out' : ''}`} disabled={this.state.selected.length === 0} onClick={this.changePass}> Change Password </button>
        <button className={`gimme-space ${this.state.selected.length === 0 ? 'gray-out' : ''}`} disabled={this.state.selected.length === 0} onClick={this.deleteUser}> Delete User </button>

        
        <div className="gimme-space">
          {this.state.specialmessage ? <Alert bsStyle={this.state.messageState}>{this.state.specialmessage}</Alert> : null}
        </div>


        {this.state.addUser ? <NewUsers enterNewUser={this.handleUsersUpdate}/> : null}
        {this.state.changePass ? <ChangePass changeConfirmed={this.confirmNewPass}/> : null}
        {this.state.deleteUser ? <DeleteUser delete={this.delete} cancel={this.handleCancel} email={this.state.selected} username={this.state.username}/> : null}
        
        
      </div>
    )
  }
}

class ChangePass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newpassword: '',
      confirmpassword: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.doubleCheck = this.doubleCheck.bind(this);
  }

  validateNewPass() {
    return this.state.newpassword === this.state.confirmpassword && this.state.newpassword.length > 7
      ? "success"
      : this.state.confirmpassword.length === 0
        ? null
        : "error";
  }

  validatePass() {
    const match = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return this.state.newpassword
      ? match.test(this.state.newpassword)
        ? 'success'
        : 'warning'
      : null;
  }

  doubleCheck(e) {
    e.preventDefault();
    const match = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(match.test(this.state.newpassword) && this.state.confirmpassword === this.state.newpassword) {
      this.props.changeConfirmed(this.state.newpassword);
      this.setState({
        newpassword: '',
        confirmpassword: ''
      })
    } else {
      console.log("Password form incomplete")
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {

    return (
      <div>
        <form onSubmit={this.doubleCheck}>
          <FormGroup controlId="newpassword" className="limit-width" validationState={this.validatePass()}>
            <ControlLabel>New Password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.newpassword}
              onChange={this.handleChange}
              autoComplete="Off"
            />
            <FormControl.Feedback />
            <HelpBlock>Must contain at least one letter and one number</HelpBlock>
          </FormGroup>
          <FormGroup controlId="confirmpassword" className="limit-width" validationState={this.validateNewPass()}>
            <ControlLabel>Confirm New Password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.confirmpassword}
              onChange={this.handleChange}
              autoComplete="Off"
            />
            <FormControl.Feedback />
          </FormGroup>
          <Button bsStyle='primary' type="submit">Confirm Change</Button>
        </form>
      </div>
    )
  }
}

class NewUsers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      usertype: "Type",
      name: '',
      email: '',
      password: ''
    }

    this.handleUserType = this.handleUserType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleUserType(e) {
    this.setState({usertype: e});
  }

  handleChange(e) {
    const each_id = e.target.type === "radio" ? 'severity':e.target.id;
    this.setState({
      [each_id]: e.target.value
    })
  }

  validateEmail() {
    const match = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return this.state.email
      ? match.test(String(this.state.email).toLowerCase())
        ? 'success'
        : 'warning'
      : null;
  }

  validatePass() {
    const match = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return this.state.password
      ? match.test(this.state.password)
        ? 'success'
        : 'warning'
      : null;
  }

  handleSubmit(e) {
    e.preventDefault();
    const validPW = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.state.password);
    const match = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEM = match.test(String(this.state.email).toLowerCase())
    const uri1 = process.env.REACT_APP_URI_USER+'signup';
    if(!this.state.name || !this.state.password || !this.state.email) {
      this.setState({message: "Form Incomplete"})
    } else if (!validEM) {
      this.setState({message: "Invalid Email"})
    } else if (!validPW) {
      this.setState({message: "Invalid Password"})
    } else if(this.state.usertype === "Type") {
      this.setState({message: "Please select a UserType"})
    } else if(this.state.name && this.state.password) {
      fetch(uri1, {
        headers: {
          'content-type': "application/json"
        },
        method: "POST",
        authorization: "",
        mode: "cors",
        body: JSON.stringify(this.state)
      })
      .then(user => user.json())
      .then(data => {
        if(data.message === "User Created") {
          const newUser = {username: this.state.name, email: this.state.email, usertype: this.state.usertype};
          this.props.enterNewUser(newUser);
          this.setState({
            message: data.message,
            name: '',
            email: '',
            password: '',
            usertype: "Type"
          })
        } else {
          this.setState({
            message: data.message,
            name: '',
            email: '',
            password: '',
            usertype: "Type"
          })
        }
        
      })
      .catch(err => {
        console.log("Failed. No User generated because", err);
      })
    } else {
      console.log("Enter the necessary info");
    }
    
  }

  render() {
    return (
      <div>
        <h3> Add New Users </h3>
        {this.state.message.length > 0 ? <Alert bsStyle={this.state.message === "User Created" ? 'success' : 'warning'}>{this.state.message}</Alert> : null}
        <form onKeyPress={e=>{if(e.key === "Enter") e.preventDefault()}} onSubmit={this.handleSubmit}>
          <FormGroup controlId="name" className="limit-width">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              type="text"
              placeholder="Username"
              value={this.state.name}
              onChange={this.handleChange}
              autoComplete="Off"
            />
          </FormGroup>

          <FormGroup controlId="email" className="limit-width" validationState={this.validateEmail()}>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
              autoComplete="Off"
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup controlId="password" className="limit-width" validationState={this.validatePass()}>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              autoComplete="Off"
            />
            <FormControl.Feedback />
            <HelpBlock>Must contain at least one letter and one number</HelpBlock>
          </FormGroup>
          <ButtonGroup>
            <ControlLabel>User Type</ControlLabel>
            <br/>
            <DropdownButton title={this.state.usertype} id="bg-nested-dropdown" onSelect={(e)=>this.handleUserType(e)}>
              <MenuItem eventKey="Normal User" >Normal</MenuItem>
              <MenuItem eventKey="Auditor">Auditor</MenuItem>
              <MenuItem eventKey="Admin">Admin</MenuItem>
            </DropdownButton>
          </ButtonGroup>
          <br/>
          <Button className="move-down" type="submit">Submit New User</Button>
        </form>
      </div>
    )
  }
}

class DeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  handleDelete(e) {
    e.preventDefault();
    if(this.props.username === this.state.username){
      this.props.delete();
      this.setState({username: ''});
    } else {
      console.log("Unable to delete");
    }

  }

  render() {
    return (
      <form onSubmit={this.handleDelete}>
      <FormGroup controlId="deleteuser" className="limit-width">
          <ControlLabel>Enter the Username of "{this.props.email}" to Delete</ControlLabel>
          <FormControl
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
            autoComplete="Off"
          />
          <FormControl.Feedback />
        </FormGroup>
        <Button type="submit" className="gimme-space" bsStyle="danger">DELETE</Button>
        <Button onClick={this.props.cancel} className="gimme-space">Cancel</Button>
      </form>
    )
  }
}