import React from 'react'
import env from "react-dotenv"

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

class CreateListing extends React.Component {
  constructor(props) {
    super(props)

    this.state = { housingunit: null }
    this.createListing = this.createListing.bind(this)
  }

  createListing(event) {
    event.preventDefault()

    let now = new Date()
    let body = {
      datelisted: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
      dateexpires: event.target.dateexpires.value,
      price_in_cents: event.target.price_in_dollars.value * 100,
      message: event.target.message.value,
      housingunitid: this.state.housingunit.housingunitid
    }
    fetch(`http://${env.DB_HOST}/Listing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => {
      this.props.history.push('/view_housing')
      // window.location.href = '/view_housing'
    })
  }

  componentDidMount(prevProps, prevState, snapshot) {
    let query = new URLSearchParams(window.location.search)
    if (!query.get('housingunitid')) {
      // window.location.href = "/view_housing"
      this.props.history.push('/view_housing')
      return
    }
    fetch(`http://${env.DB_HOST}/HousingUnit?housingunitid=eq.${query.get('housingunitid')}`).then(response => response.json()).then(json => {
      if (json.length === 0) {
        this.props.history.push('/view_housing')
        // window.location.href = "/view_housing"
        return
      }
      this.setState({ housingunit: json[0] })
    }).catch(err => {
      this.props.history.push('/view_housing')
      // window.location.href = "/view_housing"
    })
  }

  render() {
    return (
      <div>
        {this.state.housingunit &&
          <div>
            <h1>List Housing Unit??</h1>
            <Card key={this.state.housingunit.housingunitid}>
              <Card.Body>
                <Card.Title>
                  {this.state.housingunit.name}
                </Card.Title>
                <Card.Subtitle>
                  {this.state.housingunit.address}
                </Card.Subtitle>
                <Card.Text>
                  {this.state.housingunit.description}
                </Card.Text>
              </Card.Body>
            </Card>
            <Form onSubmit={this.createListing}>

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
}

export default CreateListing