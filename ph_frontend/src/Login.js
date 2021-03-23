import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import env from "react-dotenv"

import UserContext from "./UserContext"

function Login() {
  const { setUser } = useContext(UserContext)
  const history = useHistory()

  function doLogin(event) {
    event.preventDefault()
    fetch(`http://${env.DB_HOST}/User?email=eq.${event.target.email.value}`)
      .then(response => response.json())
      .then(json => {
        if (event.target.password.value === json[0].password) {
          setUser(json[0])
          history.push('/view_housing')
          return
        }
        alert('Wrong password')
      }).catch(error => { console.error('some error', error) })
  }

  return (
    <div>
      <form onSubmit={doLogin}>
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
export default Login
