import React from 'react'
import { Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UiCard = ({ item }) => {
  if (item.name) {
    return (
      <Card
        className="card sprint"
      >
        <Card.Body>
          <Card.Title><Link to ={`/sprints/${item._id}`}>{item.name}</Link></Card.Title>
          <Card.Text>To be completed in: {item.timeframe} weeks</Card.Text>
        </Card.Body>
      </Card>
    )
  } else if (item.title) {
    return (
      <Card
        className="card task">
        <Card.Body>
          <Card.Title><Link to ={`/task-show/${item._id}`}>{item.title}</Link></Card.Title>
          <Card.Text>{item.description}</Card.Text>
          <div className='taskStatus'>
            <h6>Status</h6>
            <Form.Control
              type='checkbox'
              checked={item.isChecked}
              className='checkbox'
              disabled
            />
          </div>
        </Card.Body>
      </Card>
    )
  }
}

export default UiCard
