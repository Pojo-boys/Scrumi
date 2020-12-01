import React, { useState, useEffect, Fragment } from 'react'
import TaskCard from './../shared/Card'
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
    <TaskCard
      key={task}
      task={task}
    />
  ))
  return (
    <Fragment>
      <h2>Tasks</h2>
      {tasksIndex}
    </Fragment>
  )
}

export default Tasks
