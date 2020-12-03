import React from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CheckBox from './CheckBox'
import SprintSelect from './SprintSelect'

const TaskForm = ({ task, user, handleSubmit, handleChange, match }) => {
  if (match.url === '/task-update/' + task._id) {
    return (
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
          <CheckBox
            task={task}
            handleChange={handleChange}
          />
          <SprintSelect
            handleChange={handleChange}
            user={user}
          />
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
  } else {
    return (
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
          <SprintSelect
            handleChange={handleChange}
            user={user}
          />
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
}

export default TaskForm

// <Form.Label>Completed</Form.Label>
// <Form.Control
//   type="checkbox"
//   checked={task.isChecked}
//   name="isChecked"
//   onChange={handleChange}
// />
