import React, { useState, useEffect } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import { showTask, deleteTask } from '../../api/tasks'
import Button from 'react-bootstrap/Button'
import { Card } from 'react-bootstrap'

const Task = (props) => {
  const [task, setTask] = useState(null)
  const [update, setUpdate] = useState(false)
  const { user, msgAlert, match, history } = props
  useEffect(() => {
    showTask(user, match.params.taskId)
      .then(res => {
        setTask(res.data.task)
      })
      .then(() => {
        msgAlert({
          heading: 'Show Task Success',
          message: 'See the task',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Show Task Failed',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  const handleDelete = () => {
    deleteTask(user, match.params.taskId)
      .then(() => {
        msgAlert({
          heading: 'Task Deleted',
          message: 'back to the list of tasks that exist',
          variant: 'success'
        })
      })
      .then(() => history.push('/tasks'))
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
    return <Redirect to={'/task-update/' + task._id} />
  }

  // If loading (task is null), print 'Loading...'
  const checkForSprint = () => {
    if (!task.sprint) {
      return (
        <Card.Text>There is no sprint associated with this task.</Card.Text>
      )
    } else if (task.sprint) {
      return (
        <Card.Text>Associated with: <Link to={`/sprints/${task.sprint._id}`}>{task.sprint.name}</Link> Sprint</Card.Text>
      )
    }
  }
  return (
    <div>
      {task ? (
        <div>
          <Card>
            <Card.Body>
              <div className='checktask'>
                <input
                  type='checkbox'
                  checked={task.isChecked}
                  disabled
                  className='checkB'
                />
                <Card.Title>{task.title}</Card.Title>
              </div>
              <Card.Text>{task.description}</Card.Text>
              {checkForSprint()}
              <Button className="form-submit-button update" onClick={handleUpdate}>Update</Button>
              <Button className="form-submit-button delete" onClick={handleDelete}>Delete</Button>
            </Card.Body>
          </Card>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(Task)
