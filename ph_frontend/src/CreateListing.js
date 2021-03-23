import React, { useState, useEffect } from 'react';
import env from "react-dotenv"

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useHistory } from 'react-router-dom'

function CreateListing() {
  const history = useHistory()
  const [house, setHouse] = useState(null);

  useEffect(getHousingUnit, [history])

  function createListing(event) {
    event.preventDefault()

    let now = new Date()
    let datelisted = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    let body = {
      datelisted: datelisted,
      dateexpires: event.target.dateexpires.value,
      price_in_cents: event.target.price_in_dollars.value * 100,
      message: event.target.message.value,
      housingunitid: house.housingunitid
    }
    fetch(`http://${env.DB_HOST}/Listing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => {
      // listing creaetd, go see it
      history.push('/view_housing')
    })
  }

  function getHousingUnit() {
    let query = new URLSearchParams(window.location.search)
    if (!query.get('housingunitid')) {
      history.goBack()
      return
    }
    fetch(`http://${env.DB_HOST}/HousingUnit?housingunitid=eq.${query.get('housingunitid')}`).then(response => response.json()).then(json => {
      if (json.length === 0) {
        history.goBack()
        return
      }
      setHouse(json[0])
    }).catch(err => {
      history.goBack()
    })
  }


  return (
    <div>
      {house &&
        <div>
          <h1>List Housing Unit??</h1>
          <Card key={house}>
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
            </Card.Body>
          </Card>
          <Form onSubmit={createListing}>

            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control name="message" required />
            </Form.Group>

            <Form.Group>
              <Form.Label>Expiry Date</Form.Label>

              <Form.Control type="date" name="dateexpires" required />
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="number" min="0" step="0.01" name="price_in_dollars" required />
              </InputGroup>
            </Form.Group>

            <Button type="submit">Yes, List This Apartment</Button>
          </Form>
        </div>
      }
    </div>
  )
}

export default CreateListing