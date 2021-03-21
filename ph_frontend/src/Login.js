import React, { useState } from 'react'
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:'',
      dbPassword: ''
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
  }
  componentDidMount(){
    if (this.state.email != "" && this.state.password != "")
    {
      console.log("Ready for the credential check!")
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      var fetchStmt = `http://${env.DB_HOST}/User?email=eq.${this.state.email}`
      var obj = ""
      fetch(fetchStmt, requestOptions)
        .then(response => response.json())
        .then(json => {
        console.log(json)
        this.state.dbPassword = json[0].password
        /* etc */
        }).catch(error => {console.error('some error', error)})
      console.log("userpass: ", this.state.dbPassword)
    }
    else
    {
      console.log("Waiting on credentials...")
    }
  }
  passCheck()
  {
    if ((this.state.password === this.state.dbPassword) && (this.state.password != "")) {
      console.log("ALL LOGGED IN")
      window.location.href = '/Search'
    } else {
      console.log("Still need more info")
    }
  }
  render() {
    console.log(this.state)
    this.componentDidMount()
    this.passCheck()
    return (
      <div>
          <form onSubmit={this.updateState}>
            <h1>Login</h1>
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
export default Login