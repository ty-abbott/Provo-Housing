import React, { useState } from 'react'
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.updateState = this.updateState.bind(this)
  }
  updateState(event) {
    event.preventDefault()
    console.log(event.target.email.value)
    console.log(event.target.password.value)
    console.log("YEET.")
    console.log(this.state)
    this.setState({
      email: event.target.email.value,
      password: event.target.password.value
    })
    console.log(this.state)
    this.componentDidMount()
  }
  componentDidMount() {
    if (this.state.email != "" && this.state.password != "") 
    {
      console.log("WE MADE IT!!!")
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        "email":this.state.email,
        "password":this.state.password,
        "isadmin":false,
        "islandlord":false
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch("http://localhost:8000/User", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    } 
    else 
    {
      console.log("Waiting for full post request...")
    }    
  }
  render() {
    console.log(this.state)
    this.componentDidMount()
    return (
      <div>
          <form onSubmit={this.updateState}>
            <h1>Register</h1>
            <label>Email</label>
            <input name="email" id="email"/>
            <br></br>
            <label>Password</label>
            <input type="password" name="password" id="password"/>
            <br></br>
            <button type="submit">Go!</button>
          </form>
      </div> 
    );
  }
}
export default Register