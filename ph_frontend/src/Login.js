import React from "react"

export default function BasicExample() {
  return (
      <div>
          <form>
            <h1>Login</h1>
            <input name="username"/>
            <input type="password" name="password"/>
            <button>Go!</button>
          </form>
      </div>
  )
}
