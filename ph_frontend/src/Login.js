import React, { useState } from 'react'
import env from "react-dotenv"
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.doLogin = this.doLogin.bind(this)
  }

  doLogin(event) {
    event.preventDefault()
    fetch(`http://${env.DB_HOST}/User?email=eq.${this.state.email}`)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (event.target.password === json[0].password) {
          this.setState({
            email: event.target.email.value,
            password: event.target.password.value
          })
          window.location = "/view_housing"
          return
        }
        alert('Wrong password')
      }).catch(error => { console.error('some error', error) })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.doLogin}>
          <h1>Login</h1>
          <label>Email</label>
          <input name="email" id="email" />
          <br></br>
          <label>Password</label>
          <input type="password" name="password" />
          <br></br>
          <button type="submit">Go!</button>
        </form>
      </div>
    );
  }
}
export default Login