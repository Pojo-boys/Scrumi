import React from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const TaskForm = ({ task, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <Form.Group controlId='task'>
      <Form.Label>Title</Form.Label>
      <Form.Control
        required
        type='text'
        placeholder="Task title here"
        value={task.title}
        name="title"
        onChange={handleChange}
      />

      <Form.Label>Description</Form.Label>
      <Form.Control
        required
        type='text'
        placeholder="Description of task here"
        value={task.description}
        name="description"
        onChange={handleChange}
      />

      <Form.Label>Completed</Form.Label>
      <Form.Control
        type="checkbox"
        value={task.isChecked}
        name="completed"
        onChange={handleChange}
      />
    </Form.Group>
    <Button
      variant="primary"
      type="submit"
    >
    Submit
    </Button>
  </form>
)

export default TaskForm
