import React, { useState, useEffect, useContext } from 'react';
import env from "react-dotenv"

import Card from 'react-bootstrap/Card'
import { useHistory } from 'react-router-dom'

import UserContext from "./UserContext"

function ReportListing() {
  const { user } = useContext(UserContext)
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

  function doReport(event) {
    event.preventDefault()

    let now = new Date()
    let creation_date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    let body = {
      reason: event.target.reason.value,
      listingid: house.listingid,
      userid: user.userid,
      creation_date: creation_date
    }
    fetch(`http://${env.DB_HOST}/Flag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => {
      alert('reported')
      history.push('/')
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
          <form onSubmit={doReport}>
            <input name="reason" placeholder="Reason:" />
            <button class="btn btn-primary" >Report!</button>
          </form>

        </div>
      }
    </div>
  )
}

export default ReportListing