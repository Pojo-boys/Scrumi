import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import SprintForm from '../shared/SprintForm'

import { createSprint } from '../../api/sprints.js'

const SprintCreate = props => {
  const [sprint, setSprint] = useState({ name: '', timeframe: undefined })
  const [createdSprintId, setCreatedSprintId] = useState(null)

  const { user, match } = props

  const handleChange = event => {
    event.persist()
    setSprint(prevSprint => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedSprint = Object.assign({}, prevSprint, updatedField)

      return editedSprint
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const { msgAlert } = props

    createSprint(user, sprint)
      .then(res => setCreatedSprintId(res.data.sprint._id))
      .then(() => msgAlert({
        heading: 'Create Success',
        message: 'Created sprint Successfully',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Create Failure',
        message: 'Error: ' + err.message,
        variant: 'danger'
      }))
  }

  if (createdSprintId) {
    return <Redirect to={`/sprints/${createdSprintId}`} />
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <div className='darkForm'>
          <h3>Create a New Sprint</h3>
          <SprintForm
            sprint ={sprint}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            match={match}
          />
        </div>
      </div>
    </div>
  )
}

export default SprintCreate
