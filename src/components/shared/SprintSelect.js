import React, { Fragment, useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'

import { indexSprints } from '../../api/sprints'

const SprintSelect = props => {
  const [sprints, setSprints] = useState(null)
  const { user, handleChange, task } = props
  useEffect(() => {
    indexSprints(user)
      .then(res => setSprints(res.data.sprints))
  }, [])
  // if there are no sprints return you have no sprints, so the app does not crash
  if (!sprints) {
    return (
      <Fragment>
        <p>You have no sprints</p>
      </Fragment>
    )
  }
  const selectedSprint = (sprint) => {
    if (!task) {
      return false
    } else if (task.sprint) {
      if (sprint._id === task.sprint._id) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  const sprintIndex = sprints.map(sprint => (
    <option
      key={sprint._id}
      value={sprint._id}
      name={ sprint.name }
      selected={ selectedSprint(sprint)}
    >
      { sprint.name }
    </option>
  ))

  if (!task) {
    return (
      <Fragment>
        <p>Choose a sprint if you want to associate the task</p>
        <Form.Control
          onChange={handleChange}
          name="sprint"
          as='select'
        >
          <option selected disabled>Sprint?</option>
          { sprintIndex }
        </Form.Control>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <p>Choose a sprint if you want to associate the task</p>
        <Form.Control
          onChange={handleChange}
          name="sprint"
          as='select'
        >
          <option defaultValue disabled>Sprint?</option>
          { sprintIndex }
        </Form.Control>
      </Fragment>
    )
  }
}

export default SprintSelect
