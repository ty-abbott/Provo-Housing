import React from "react"

export default function BasicExample() {
  return (
      <div>
          <form>
            <h1>Login</h1>
            <input name="username"/>
            <input type="password" name="password"/>
            <input type="password" name="password_c"/>
            <button>Go!</button>
          </form>
      </div>
  )
}
