import React, { useState, useEffect } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { showSprint, deleteSprint } from '../../api/sprints'
import Button from 'react-bootstrap/Button'

const SprintShow = (props) => {
  const [sprint, setSprint] = useState(null)
  const [update, setUpdate] = useState(false)
  const { user, msgAlert, match, history } = props
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
    return <Redirect to={'/sprint-update/' + task._id} />
  }

  // If loading (sprint is null), print 'Loading...'
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
