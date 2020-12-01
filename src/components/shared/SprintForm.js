import React from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SprintForm = ({ sprint, handleSubmit, handleChange, match }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Form.Group controlId='sprint'>
        <Form.Label>Sprint Name</Form.Label>
        <Form.Control
          required
          type='text'
          placeholder="Sprint name here"
          value={sprint.name}
          name="name"
          onChange={handleChange}
        />

        <Form.Label>Completion Timeframe</Form.Label>
        <Form.Control as='select'
          value={sprint.timeframe}
          name="timeframe"
          onChange={handleChange}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </Form.Control>
      </Form.Group>
      <Button
        className="form-submit-button"
        variant="primary"
        type="submit"
      >
        Submit
      </Button>
    </form>
  )
}

export default SprintForm
