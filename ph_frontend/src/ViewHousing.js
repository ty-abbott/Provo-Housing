import React, { useState, useEffect } from 'react';
import env from "react-dotenv"

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


import {
  Link
} from "react-router-dom"

function CreateHousing() {
  // const history = useHistory()
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    updateHousingUnits()
  }, [])

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
    let userid = 1 // FIXME
    fetch(`http://${env.DB_HOST}/housingunitswithlistings?userid=eq.${userid}`).then(response => response.json()).then(json => {
      console.log(json)
      setHouses(json)
    })
  }

  const dispHouses = houses.map((house) =>
    <Card key={house.housingunitid}>
      <Card.Body>
        <Card.Title>
          {house.name}
        </Card.Title>
        <Card.Subtitle>
          {house.address}
        </Card.Subtitle>
        <Card.Text>
          {house.description}
        </Card.Text>
        <Row>
          <Col>
            {!house.listingid &&
              <div>
                <Link to={`create_listing?housingunitid=${house.housingunitid}`}>Publish This Housing Unit</Link>
              </div>
            }
            {house.listingid &&
              <div>
                <Button variant="warning" onClick={() => unpublish(house.listingid)}>Unpublish This Housing Unit</Button>
              </div>
            }
          </Col>
          <Col>
            {!house.listingid &&
              <Button variant="danger" onClick={() => deleteHouse(house.housingunitid)}>Delete this Housing Unit</Button>
            }
            {house.listingid &&
              <Button variant="danger" onClick={() => deleteHouse(house.housingunitid)} disabled>Delete this Housing Unit</Button>
            }
          </Col>
        </Row>
      </Card.Body>
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