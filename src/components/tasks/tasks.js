import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { indexTasks } from '../../api/tasks'

const Tasks = (props) => {
  const [tasks, setTasks] = useState(null)
  const { user } = props
  useEffect(() => {
    indexTasks(user)
      .then(res => setTasks(res.data.tasks))
      .catch(console.error)
  }, [])
  if (!tasks) {
    return <p>Loading...</p>
  }

  const tasksIndex = tasks.map(task => (
    <h3 key={task._id}>
      <input
        type='checkbox'
        checked={task.isChecked}
        disabled
      />
      <Link to ={`/task-show/${task._id}`}>{task.title}</Link>
    </h3>
  ))
  return (
    <Fragment>
      <h2>Tasks</h2>
      {tasksIndex}
    </Fragment>
  )
}

export default Tasks
