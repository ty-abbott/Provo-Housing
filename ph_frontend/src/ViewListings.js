import React, { useEffect, useState } from 'react'
import env from "react-dotenv"
import Card from 'react-bootstrap/Card'

import {
  Link
} from "react-router-dom"

function Listings() {
  const [listings, setListings] = useState([])
  const [filter, setFilter] = useState(null)

  useEffect(getListings, [filter])

  function getListings() {
    // let url = `http://${env.DB_HOST}/housingunitswithlistings?and=(listingid.not.is.null)`
    let now = new Date()
    let date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    let url = `http://${env.DB_HOST}/housingunitswithlistings?and=(listingid.not.is.null,dateexpires.gt.${date})`
    if (filter) {
      url = `http://${env.DB_HOST}/housingunitswithlistings?and=(listingid.not.is.null,or(name.ilike.*${filter}*,message.ilike.*${filter}*,address.ilike.*${filter}*,description.ilike.*${filter}*))`
    }
    fetch(url).then(response => response.json()).then(json => {
      setListings(json)
    })
  }

  function doSearch(event) {
    event.preventDefault()
    setFilter(event.target.filter.value.toLowerCase())
  }

  console.log(listings)
  const dispListings = listings.map((listing) =>
    <Card key={listing.housingunitid}>
      <Card.Body>
        <Card.Title>
          {listing.name}
        </Card.Title>
        <Card.Subtitle>
          {listing.address}
        </Card.Subtitle>
        <Card.Text>
          <p>{listing.description}</p>
          <hr />
          <p>Listed on {listing.datelisted}</p>
          <p>Set to expire on {listing.dateexpires}</p>
          <p>Price: ${listing.price_in_cents / 100}</p>
          <p>{listing.message}</p>
          <div class="row">
            <div class="col">
              <Link class="btn btn-primary" to={`/view_listing?housingunitid=${listing.housingunitid}`}>View</Link>
            </div>
            <div class="col">
              <Link class="btn btn-danger" to={`/report_listing?housingunitid=${listing.housingunitid}`}>Report</Link>
            </div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
  return (
    <div>
      <div class="row">
        <div class="col">
          <form onSubmit={doSearch}>
            <input name="filter" />
          </form>
        </div>
        <div class="col">
          <button class="btn btn-primary" onClick={() => setFilter(null)}>Clear Filter</button>
        </div>
      </div>
      <ul>
        {dispListings}
      </ul>
    </div>
  )
}

export default Listings