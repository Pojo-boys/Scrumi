import React, { useState, useEffect } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { showSprint, deleteSprint } from '../../api/sprints'
import Button from 'react-bootstrap/Button'
import { Card } from 'react-bootstrap'
import { indexTasks } from './../../api/tasks'

const SprintShow = (props) => {
  const [sprint, setSprint] = useState(null)
  const [update, setUpdate] = useState(false)
  const { user, msgAlert, match, history } = props
  const [tasks, setTasks] = useState(null)
  useEffect(() => {
    showSprint(user, match.params.sprintId)
      .then(res => {
        setSprint(res.data.sprint)
      })
      .then(() => {
        msgAlert({
          heading: 'Show sprint Success',
          message: 'See the sprint',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Show sprint Failed',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  useEffect(() => {
    indexTasks(user)
      .then(res => setTasks(res.data.tasks))
      .catch(err => {
        msgAlert({
          heading: 'Show sprint Failed',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }, [sprint])

  const parseTasks = () => {
    tasks.map(task => {
      if (task.sprint === sprint._id) {
        return <Card.text>{task.title}</Card.text>
      }
    })
  }

  const handleDelete = () => {
    deleteSprint(user, match.params.sprintId)
      .then(() => {
        msgAlert({
          heading: 'sprint Deleted',
          message: 'back to the list of sprints that exist',
          variant: 'success'
        })
      })
      .then(() => history.push('/sprints'))
      .catch(err => {
        msgAlert({
          heading: 'Deletion Failed',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      })
  }

  const handleUpdate = () => {
    setUpdate(true)
  }

  if (update) {
    return <Redirect to={'/sprint-update/' + sprint._id} />
  }

  // If loading (sprint is null), print 'Loading...'
  return (
    <div>
      {sprint ? (
        <div>
          <Card>
            <Card.Body>
              <Card.Title>{sprint.name}</Card.Title>
              <Card.Text>To be completed in: {sprint.timeframe} weeks</Card.Text>
              {parseTasks()}
              <Button className="form-submit-button" onClick={handleDelete}>Delete</Button>
              <Button onClick={handleUpdate}>Update Sprint</Button>
            </Card.Body>
          </Card>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(SprintShow)
