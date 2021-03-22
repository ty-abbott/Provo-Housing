import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Register from "./Register"
import Login from "./Login"

import CreateHousing from "./CreateHousing"
import ViewHousing from "./ViewHousing"
import CreateListing from "./CreateListing"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css"
import Container from "react-bootstrap/Container"

import UserContext from "./UserContext"
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
  const [user, setUser] = useState()
  const value = { user, setUser }
  if (!user) {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
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
          <UserContext.Provider value={value}>
            <Container>
              <Switch>
                <Route path="/register"> <Register /> </Route>
                <Route path="/"> <Login /> </Route>
              </Switch>
            </Container>
          </UserContext.Provider>
        </div>
      </Router>
    )
  }
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/view_housing">View Your Housing Units</Link>
          </li>
          <li>
            <Link to="/login" onClick={() => {setUser(undefined)}}>Log Out</Link>
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
        <UserContext.Provider value={value}>
          <Container>
            <Switch>
              <Route exact path="/create_housing"> <CreateHousing /> </Route>
              <Route exact path="/view_housing"> <ViewHousing /> </Route>
              <Route exact path="/create_listing"> <CreateListing /> </Route>
            </Switch>
          </Container>
        </UserContext.Provider>
      </div>
    </Router>
  )
}