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
    <li key={task._id}>
      <Link to ={`/task-show/${task._id}`}>{task.title}</Link>
    </li>
  ))
  return (
    <Fragment>
      <h2>Tasks</h2>
      <ul>
        {tasksIndex}
      </ul>
    </Fragment>
  )
}

export default Tasks
