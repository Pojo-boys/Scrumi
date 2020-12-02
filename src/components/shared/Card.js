import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UiCard = ({ item }) => {
  if (item.name) {
    return (
      <Card>
        <Card.Body>
          <Card.Title><Link to ={`/sprints/${item._id}`}>{item.name}</Link></Card.Title>
          <Card.Text>To be completed in: {item.timeframe} weeks</Card.Text>
        </Card.Body>
      </Card>
    )
  } else if (item.title) {
    return (
      <Card>
        <Card.Body>
          <Card.Title><Link to ={`/task-show/${item._id}`}>{item.title}</Link></Card.Title>
          <Card.Text>{item.description}</Card.Text>
          <input
            type='checkbox'
            checked={item.isChecked}
            disabled
          />
        </Card.Body>
      </Card>
    )
  }
}

export default UiCard
