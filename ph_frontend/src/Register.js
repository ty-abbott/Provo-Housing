import React from 'react'
import { useHistory } from 'react-router-dom'
import env from "react-dotenv"


function Register() {
  const history = useHistory()

  function doRegister(event) {
    event.preventDefault()
    if (event.target.password.value !== event.target.password_c.value) {
      window.alert('Passwords must match')
      return
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "email": event.target.email.value,
      "password": event.target.password.value,
      "isadmin": false,
      "islandlord": false
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(`http://${env.DB_HOST}/User`, requestOptions)
      .then(response => {
        if (response.ok) {
          history.push('/create_housing')
        } else {
          alert('username taken')
        }
      })
      .catch(error => console.error('error', error));
  }

  return (
    <div>
      <form onSubmit={doRegister}>
        <h1>Register</h1>
        <label>Email</label>
        <input name="email" id="email" />
        <br></br>
        <label>Password</label>
        <input type="password" name="password" />
        <br></br>
        <label>Password (Again)</label>
        <input type="password" name="password_c" />
        <br></br>
        <button type="submit">Go!</button>
      </form>
    </div>
  );
}
export default Register