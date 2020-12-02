import React, {useState} from 'react'
import { Form } from 'react-bootstrap'

import { indexSprint } from '../../api/sprints'

const SprintSelect = props => {
	const [sprints, setSprints] = useState(null)
	const {user, handleChange} = props
	indexSprint(user)
		.then(res => setSprints(res.data.sprints))
	const sprintIndex = sprints.map(sprint => (
		<option
			value={sprint._id}
		>
			{ sprint.name }
		</option>
	))
	return (
		<Fragment>
		<Form.Control
			as-='select'
			name='name'
		handleChange={handleChange}
		>
			<option defaultValue>Associate Sprint</option>
		{ sprintIndex }
		</Form.Control>
	)
}

export default SprintSelect