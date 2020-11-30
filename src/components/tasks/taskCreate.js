import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import messages from '../AutoDismissAlert/messages'
import TaskForm from '../shared/TaskForm'

import { createTask } from '../../api/tasks.js'

const TaskCreate = props => {
  const [task, setTask] = useState({ title: '', description: '', isChecked: false })
  const [createdTaskId, setCreatedTaskId] = useState(null)

  const { user, match } = props

  const handleChange = event => {
    event.persist()
    setTask(prevTask => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedTask = Object.assign({}, prevTask, updatedField)

      return editedTask
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const { msgAlert } = props

    createTask(user, task)
      .then(res => setCreatedTaskId(res.data.task._id))
      .then(() => msgAlert({
        heading: 'Create Success',
        message: messages.createSuccess,
        variant: 'success'
      }))
      .catch(console.error)
  }

  if (createdTaskId) {
    return <Redirect to={`/tasks/${createdTaskId}`} />
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Create a New Task</h3>
        <TaskForm
          task={task}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          match={match}
        />
      </div>
    </div>
  )
}

export default TaskCreate
