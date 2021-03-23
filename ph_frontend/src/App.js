import React, { useState } from "react"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

// login
import Register from "./Register"
import Login from "./Login"

// user
import ViewListings from "./ViewListings"
import ViewListing from "./ViewListing"
import CreateFlagForListing from "./CreateFlagForListing"

// landlord
import CreateHousing from "./CreateHousing"
import ViewHousing from "./ViewHousing"
import CreateListing from "./CreateListing"

// admin
import ViewFlags from "./ViewFlags"

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
          {/* landlord */}
          {user.islandlord && <li> <Link to="/view_housing">View Your Housing Units</Link> </li>}
          {/* admin */}
          {user.isadmin && <li> <Link to="/view_flags">View Reported Listings</Link> </li>}
          {/* all */}
          <li> <Link to="/">View Listings</Link> </li>
          <li> <Link to="/login" onClick={() => { setUser(undefined) }}>Log Out</Link> </li>
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
              {/* landlord */}
              {user.islandlord && <Route exact path="/create_housing"> <CreateHousing /> </Route>}
              {user.islandlord && <Route exact path="/view_housing"> <ViewHousing /> </Route>}
              {user.islandlord && <Route exact path="/create_listing"> <CreateListing /> </Route>}
              {/* admin */}
              {user.isadmin && <Route exact path="/view_flags"> <ViewFlags /> </Route>}
              {/* all */}
              <Route exact path="/"> <ViewListings /> </Route>
              <Route exact path="/view_listing"> <ViewListing /> </Route>
              <Route exact path="/report_listing"> <CreateFlagForListing /> </Route>
            </Switch>
          </Container>
        </UserContext.Provider>
      </div>
    </Router>
  )
}
