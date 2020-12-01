import React, { useState, useEffect, Fragment } from 'react'
import { indexSprints } from '../../api/sprints'

const SprintIndex = (props) => {
  const [sprints, setSprints] = useState(null)
  const { user, msgAlert } = props
  useEffect(() => {
    indexSprints(user)
      .then(res => setSprints(res.data.sprints))
      .catch(err => msgAlert({
        heading: 'Index Failed',
        message: 'Error: ' + err.message,
        variant: 'danger'
      }))
  }, [])
  if (!sprints) {
    return <p>Loading...</p>
  }

  const sprintsIndex = sprints.map(sprint => (
    <Fragment key={sprint}>
      <h3>{sprint.name}</h3>
      <p>Completion Timeframe: {sprint.timeframe} weeks.</p>
    </Fragment>
  ))
  return (
    <Fragment>
      <h2>Sprints</h2>
      {sprintsIndex}
    </Fragment>
  )
}

export default SprintIndex
