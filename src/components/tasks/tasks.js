import React, { useState, useEffect, Fragment } from 'react'
import UiCard from './../shared/Card'
import { indexTasks } from '../../api/tasks'

const Tasks = (props) => {
  const [tasks, setTasks] = useState(null)
  const { user, msgAlert } = props
  useEffect(() => {
    indexTasks(user)
      .then(res => setTasks(res.data.tasks))
      .catch(() => msgAlert({
        heading: 'Index Fail',
        message: 'Failed to index',
        variant: 'danger'
      }))
  }, [])
  if (!tasks) {
    return <p>Loading...</p>
  }

  const tasksIndex = tasks.map(task => (
    <UiCard
      key={task.title}
      item={task}
    />
  ))
  return (
    <Fragment>
      <div className='tasksDisplay'>
        <h2>Tasks</h2>
        {tasksIndex}
      </div>
    </Fragment>
  )
}

export default Tasks
