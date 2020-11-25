import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

import apiUrl from '../../apiConfig'

const Tasks = (props) => {
  const [tasks, setTasks] = useState(null)
  const { user } = props
  useEffect(() => {
    axios({
      method: 'GET',
      url: apiUrl + '/tasks',
      headers: {
        Authorization: 'Bearer ' + user.token
      }
    })
      .then(res => setTasks(res.data.tasks))
      .catch(console.error)
  }, [])

  if (!tasks) {
    return <p>Loading...</p>
  }

  const tasksIndex = tasks.map(task => (
    <li key={task._id}>{task.title}</li>
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
