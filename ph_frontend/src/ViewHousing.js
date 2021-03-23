import React, { useState, useEffect, useContext } from 'react';
import env from "react-dotenv"

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import UserContext from "./UserContext"


import {
  Link
} from "react-router-dom"

function CreateHousing() {
  const { user } = useContext(UserContext)
  // const history = useHistory()
  const [houses, setHouses] = useState([]);

  useEffect(updateHousingUnits, [user.userid])

  function unpublish(listingid) {
    fetch(`http://${env.DB_HOST}/Flag?listingid=eq.${listingid}`, {
      method: 'DELETE'
    }).then(response => {
      fetch(`http://${env.DB_HOST}/Listing?listingid=eq.${listingid}`, {
        method: 'DELETE'
      }).then(response => {
        updateHousingUnits()
      })
    })
  }

  async function deleteHouse(housingunitid) {
    await fetch(`http://${env.DB_HOST}/Photo?housingunitid=eq.${housingunitid}`, {
      method: 'DELETE'
    })
    // get rid of flags belonging to our ratings
    await fetch(`http://${env.DB_HOST}/Rating?housingunitid=eq.${housingunitid}`).then(response => response.json()).then(json => {
      json.forEach(async rating => {
        await fetch(`http://${env.DB_HOST}/Flag?ratingid=eq.${rating.ratingid}`, {
          method: 'DELETE'
        })
      })
    })
    // get rid of ratings
    await fetch(`http://${env.DB_HOST}/Rating?housingunitid=eq.${housingunitid}`, {
      method: 'DELETE'
    })
    // get rid of certificates
    await fetch(`http://${env.DB_HOST}/HousingUnitHasCertification?housingunitid=eq.${housingunitid}`, {
      method: 'DELETE'
    })
    // finally get rid of the house itself
    await fetch(`http://${env.DB_HOST}/HousingUnit?housingunitid=eq.${housingunitid}`, {
      method: 'DELETE'
    })
    updateHousingUnits()
  }

  function updateHousingUnits() {
    let userid = user.userid
    fetch(`http://${env.DB_HOST}/housingunitswithlistings?userid=eq.${userid}`).then(response => response.json()).then(json => {
      setHouses(json)
    })
  }

  const dispHouses = houses.map((house) =>
    <Card key={house.housingunitid}>

      {house.listingid ?
        <Card.Body>
          <Card.Title>
            {house.name}
          </Card.Title>
          <Card.Subtitle>
            {house.address}
          </Card.Subtitle>
          <Card.Text>
            <p>{house.description}</p>
            <hr />
            <h4>This house is currently listed</h4>
            <p>Listed on {house.datelisted}</p>
            <p>Set to expire on {house.dateexpires}</p>
            <p>Price: ${house.price_in_cents / 100}</p>
            <p>{house.message}</p>
          </Card.Text>
          <Row>
            <Col>
              <Button variant="warning" onClick={() => unpublish(house.listingid)}>Unpublish This Housing Unit</Button>
            </Col>
            <Col>
              <Button variant="danger" onClick={() => deleteHouse(house.housingunitid)} disabled>Delete this Housing Unit</Button>
            </Col>
          </Row>
        </Card.Body>
        :
        <Card.Body>
          <Card.Title>
            {house.name}
          </Card.Title>
          <Card.Subtitle>
            {house.address}
          </Card.Subtitle>
          <Card.Text>
            <p>{house.description}</p>
          </Card.Text>
          <Row>
            <Col>
              <Link to={`create_listing?housingunitid=${house.housingunitid}`}>Publish This Housing Unit</Link>
            </Col>
            <Col>
              <Button variant="danger" onClick={() => deleteHouse(house.housingunitid)}>Delete this Housing Unit</Button>
            </Col>
          </Row>
        </Card.Body>
      }
    </Card>
  )

  return (
    <div>
      <h1>Your Housing Units</h1>
      <Link to="/create_housing">Create New Housing Unit</Link>
      <ul>{dispHouses}</ul>
    </div >
  )
}

export default CreateHousing