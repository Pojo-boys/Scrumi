import React from 'react'
import Form from 'react-bootstrap/Form'

const CheckBox = ({ task, handleChange }) => {
  return (
    <div>
      <Form.Label>Completed</Form.Label>
      <Form.Control
        type="checkbox"
        checked={task.isChecked}
        name="isChecked"
        onChange={handleChange}
      />
    </div>
  )
}

export default CheckBox
