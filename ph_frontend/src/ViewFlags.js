import React, { useEffect, useState } from 'react'
import env from "react-dotenv"
import Card from 'react-bootstrap/Card'

import {
  Link
} from "react-router-dom"

function Listings() {
  const [flags, setFlags] = useState([])

  useEffect(getListings, [])

  function getListings() {
    let url = `http://${env.DB_HOST}/flagswithlistings` //TODO
    fetch(url).then(response => response.json()).then(json => {
      setFlags(json)
    })
  }

  const dispFlags = flags.map((flag) =>
    <Card key={flag.housingunitid}>
      <Card.Body>
        <Card.Title>
          {flag.reason}
        </Card.Title>
        <Card.Subtitle>
          {flag.email}
        </Card.Subtitle>
        <Card.Text>
          Listing:
          <br />
          {flag.message}
          <br />
          <Link to={`/view_listing?housingunitid=${flag.housingunitid}`}>See Listing</Link>
        </Card.Text>
      </Card.Body>
    </Card>
  )
  return (
    <div>
      <ul>
        {dispFlags}
      </ul>
    </div>
  )
}

export default Listings