import React, { useState, useEffect } from 'react'
import TaskForm from '../shared/TaskForm'
import { Redirect } from 'react-router-dom'

import { updateTask, showTask } from '../../api/tasks.js'

const TaskUpdate = props => {
  const [task, setTask] = useState({ title: '', description: '', isChecked: false, sprint: undefined })
  const [updated, setUpdated] = useState(false)

  const { user, msgAlert, match } = props
  useEffect(() => {
    showTask(user, match.params.taskId)
      .then(res => setTask(res.data.task))
      .then(() => msgAlert({
        heading: 'Task show success!',
        message: 'Check it out',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Task show failed',
        message: err.message,
        variant: 'danger'
      }))
  }, [])

  const handleChange = event => {
    event.persist()

    // const updatedField = { [event.target.name]: event.target.value }
    // const updatedCheckbox = { [event.target.name]: event.target.checked }
    setTask(oldTask => {
      let updatedField
      if (event.target.type === 'checkbox') {
        updatedField = { [event.target.name]: event.target.checked }
      } else {
        updatedField = { [event.target.name]: event.target.value }
      }
      const updatedTask = { ...oldTask, ...updatedField }
      return updatedTask
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    updateTask(user, task, match.params.taskId)
      .then(() => setUpdated(true))
      .then(() => msgAlert({
        heading: 'Update successful',
        message: 'Task updated',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Update failed',
        message: err.message,
        variant: 'danger'
      }))
  }

  if (updated) {
    // redirect to the udpated task
    return <Redirect to={`/tasks/${match.params.id}`} />
  }

  return (
    <React.Fragment>
      <h1>Update Task</h1>
      <TaskForm
        task={task}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        match={match}
        user={user}
      />
    </React.Fragment>
  )
}

export default TaskUpdate
