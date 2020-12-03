import React, { Fragment, useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'

import { indexSprints } from '../../api/sprints'

const SprintSelect = props => {
  const [sprints, setSprints] = useState(null)
  const { user, handleChange } = props
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
  const sprintIndex = sprints.map(sprint => (
    <option
      key={sprint._id}
      value={sprint._id}
      name={ sprint.name }
    >
      { sprint.name }
    </option>
  ))
  return (
    <Fragment>
      <Form.Control
        as='select'
        onChange={handleChange}
        name="sprint"
      >
        <option defaultValue>Associate Sprint</option>
        { sprintIndex }
      </Form.Control>
    </Fragment>
  )
}

export default SprintSelect
