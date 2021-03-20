import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import Nav from "react-bootstrap/Nav"

import CreateHousing from "./CreateHousing"
import ViewHousing from "./ViewHousing"
import CreateListing from "./CreateListing"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css"
import Container from "react-bootstrap/Container"

export default function BasicExample() {
  return (
    <Router>
      <Nav>
        <Nav.Item>
          <Nav.Link href="/view_housing">View Your Housing Units</Nav.Link>
        </Nav.Item>
      </Nav>
      <Container>
      <Switch>
        <Route exact path="/create_housing"> <CreateHousing /> </Route>
        <Route exact path="/view_housing"> <ViewHousing /> </Route>
        <Route exact path="/create_listing"> <CreateListing /> </Route>
      </Switch>
      </Container>
    </Router>
  )
}