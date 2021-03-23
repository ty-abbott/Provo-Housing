import React, { useState, useEffect } from 'react';
import env from "react-dotenv"

import Card from 'react-bootstrap/Card'
import { useHistory } from 'react-router-dom'

function ViewListing() {
  const history = useHistory()
  const [house, setHouse] = useState(null);

  useEffect(getHousingUnit, [history])

  function getHousingUnit() {
    let query = new URLSearchParams(window.location.search)
    if (!query.get('housingunitid')) {
      history.goBack()
      return
    }
    fetch(`http://${env.DB_HOST}/housingunitswithlistings?and=(housingunitid.eq.${query.get('housingunitid')},listingid.not.is.null)`).then(response => response.json()).then(json => {
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
          <h1>Rent Housing Unit?</h1>
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
          <button class="btn btn-primary" onClick={() => { alert('rented') }}>Rent!</button>

        </div>
      }
    </div>
  )
}

export default ViewListing