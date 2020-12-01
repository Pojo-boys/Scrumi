import React, { useState, useEffect } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { showTask, deleteTask } from '../../api/tasks'
import Button from 'react-bootstrap/Button'

const Task = (props) => {
  const [task, setTask] = useState(null)
  const [update, setUpdate] = useState(false)
  const { user, msgAlert, match, history } = props
  useEffect(() => {
    showTask(user, match.params.taskId)
      .then(res => {
        console.log(res)
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
  return (
    <div>
      {task ? (
        <div>
          <h2>{task.title}</h2>
          <input
            type='checkbox'
            checked={task.isChecked}
            disabled
          />
          <p>{task.description}</p>
          <Button className="form-submit-button" onClick={handleDelete}>Delete</Button>
          <Button onClick={handleUpdate}>Update Task</Button>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(Task)
