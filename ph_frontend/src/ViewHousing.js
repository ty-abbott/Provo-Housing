import React from 'react'
import env from "react-dotenv"

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


import {
  Link
} from "react-router-dom"

class CreateHousing extends React.Component {
  constructor(props) {
    super(props)

    this.state = { houses: [] }
  }

  componentDidMount(prevProps, prevState, snapshot) {
    this.updateHousingUnits()
  }

  unpublish(listingid) {
    fetch(`http://${env.DB_HOST}/Flag?listingid=eq.${listingid}`, {
      method: 'DELETE'
    }).then(response => {
      fetch(`http://${env.DB_HOST}/Listing?listingid=eq.${listingid}`, {
        method: 'DELETE'
      }).then(response => {
        this.updateHousingUnits()
      })
    })
  }

  async delete(housingunitid) {
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
    this.updateHousingUnits()
  }

  updateHousingUnits() {
    let userid = 1 // FIXME
    fetch(`http://${env.DB_HOST}/housingunitswithlistings?userid=eq.${userid}`).then(response => response.json()).then(json => {
      this.setState({ houses: json })
    })
  }

  render() {
    const dispHouses = this.state.houses.map((house) =>
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
                  <Button variant="warning" onClick={() => this.unpublish(house.listingid)}>Unpublish This Housing Unit</Button>
                </div>
              }
            </Col>
            <Col>
              {!house.listingid &&
                <Button variant="danger" onClick={() => this.delete(house.housingunitid)}>Delete this Housing Unit</Button>
              }
              {house.listingid &&
                <Button variant="danger" onClick={() => this.delete(house.housingunitid)} disabled>Delete this Housing Unit</Button>
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
}

export default CreateHousing