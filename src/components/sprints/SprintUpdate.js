import React, { useState, useEffect } from 'react'
import SprintForm from '../shared/SprintForm'
import { Redirect } from 'react-router-dom'

import { updateSprint, showSprint } from '../../api/sprints.js'

const SprintUpdate = props => {
  const [sprint, setSprint] = useState({ name: '', timeframe: undefined })
  const [updated, setUpdated] = useState(false)

  const { user, msgAlert, match } = props
  useEffect(() => {
    showSprint(user, match.params.sprintId)
      .then(res => setSprint(res.data.sprint))
      .then(() => msgAlert({
        heading: 'Sprint show success!',
        message: 'Check it out',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Sprint show failed',
        message: err.message,
        variant: 'danger'
      }))
  }, [])

  const handleChange = event => {
    event.persist()

    setSprint(oldSprint => {
      const updatedField = { [event.target.name]: event.target.value }
      const updatedSprint = { ...oldSprint, ...updatedField }
      return updatedSprint
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    updateSprint(user, sprint, match.params.sprintId)
      .then(() => setUpdated(true))
      .then(() => msgAlert({
        heading: 'Update successful',
        message: 'Sprint updated',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Update failed',
        message: err.message,
        variant: 'danger'
      }))
  }

  if (updated) {
    // redirect to the updated sprint
    return <Redirect to={`/sprints/${match.params.sprintId}`} />
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <div className='darkForm'>
          <h1>Update Sprint</h1>
          <SprintForm
            sprint={sprint}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            match={match}
          />
        </div>
      </div>
    </div>
  )
}

export default SprintUpdate
