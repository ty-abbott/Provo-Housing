import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import Home from "./Home"
import About from "./About"
import Dashboard from "./Dashboard"
import Register from "./Register"
// import Login from "./Login"

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  // const [token, setToken] = useState()
  // if(!token) {
  //   return <Login setToken={setToken} />
  // }
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/"> <Home /> </Route>
          <Route path="/about"> <About /> </Route>
          <Route path="/dashboard"> <Dashboard /> </Route>
          <Route path="/register"> <Register /> </Route>
        </Switch>
      </div>
    </Router>
  )
}