// import React from "react"
import React, { useState } from 'react'

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { users: [] }
  }

  componentDidMount(prevProps, prevState, snapshot) {
    fetch('http://localhost:8000/User').then(response => response.json()).then(json => {
      this.setState({ users: json })
    })
  }

  render() {
    const dispUsers = this.state.users.map((user) =>
      <li>
        {user.email}
        <span class="mygoodclass">{user.password}</span>
      </li>
    )
    return (
      <ul>{ dispUsers }</ul>      
    );
  }
}

export default Home