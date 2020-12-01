import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const TaskCard = ({ task }) => (
  <Card>
    <Card.Body>
      <Card.Title><Link to ={`/task-show/${task._id}`}>{task.title}</Link></Card.Title>
      <Card.Text>{task.description}</Card.Text>
      <input
        type='checkbox'
        checked={task.isChecked}
        disabled
      />
    </Card.Body>
  </Card>
)

export default TaskCard
