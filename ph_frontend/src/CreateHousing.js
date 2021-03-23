import React, { useContext } from 'react'
import env from "react-dotenv"
import { useHistory } from "react-router-dom";

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import UserContext from "./UserContext"

function CreateHousing() {
  const { user } = useContext(UserContext)
  const history = useHistory()

  function createUnit(event) {
    event.preventDefault()

    let address = `${event.target.address1.value}\n`
    if (event.target.address2.value) {
      address = `${address}${event.target.address2.value}\n`
    }
    address = `${address}${event.target.address3.value}, ${event.target.address4.value} ${event.target.address5.value}`

    let body = {
      name: event.target.name.value,
      address: address,
      description: event.target.description.value,
      userid: user.userid
    }
    fetch(`http://${env.DB_HOST}/HousingUnit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => {
      // housing created, go see it
      history.push('/view_housing')
    })
  }

  return (
    <div>
      <h1>Create a Housing Unit</h1>
      <Form onSubmit={createUnit}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" required />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" required />
        </Form.Group>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" name="address1" required />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" name="address2" />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control name="address3" required />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control as="select" defaultValue="UT" name="address4" required>
              <option>UT</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control name="address5" required />
          </Form.Group>
        </Form.Row>
        <Button type="submit">Create New Housing Unit</Button>
      </Form>
    </div>
  )
}

export default CreateHousing