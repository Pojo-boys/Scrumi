import React, { useState, useEffect, Fragment } from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { showSprint, deleteSprint } from '../../api/sprints'
import Button from 'react-bootstrap/Button'
import { Card } from 'react-bootstrap'
import { indexTasks } from './../../api/tasks'

const SprintShow = (props) => {
  const [sprint, setSprint] = useState(null)
  const [update, setUpdate] = useState(false)
  const { user, msgAlert, match, history } = props
  const [tasks, setTasks] = useState(null)
  const [parsedTasks, setParsedTasks] = useState(null)
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

  const parseTasks = (arr) => {
    const taskJsxArr = []
    if (arr !== null) {
      arr.forEach(task => {
        if (task.sprint) {
          if (task.sprint._id === sprint._id) {
            taskJsxArr.push(<Card key={task._id}><Link to={`/task-show/${task._id}`}>{task.title}</Link></Card>)
          }
        }
      })
    } else {
      return null
    }
    return taskJsxArr
  }
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

  useEffect(() => {
    setParsedTasks(parseTasks(tasks))
  }, [tasks])

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
      <Fragment>
        <div className='sprintsDisplay'>
          <h2>Sprints</h2>
        </div>
      </Fragment>
      {sprint ? (
        <div>
          <Card>
            <Card.Body>
              <Card.Title>{sprint.name}</Card.Title>
              <Card.Text>To be completed in: {sprint.timeframe} weeks</Card.Text>
              {parsedTasks !== null ? parsedTasks : null}
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
