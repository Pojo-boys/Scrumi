import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import logo from './scrumilogo.png'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#tasks">Tasks</Nav.Link>
    <Nav.Link href="#task-create">Create Task</Nav.Link>
    <Nav.Link href="#sprints">Sprints</Nav.Link>
    <Nav.Link href="#sprint-create">Create Sprint</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>

  </Fragment>
)

const Header = ({ user }) => (
  <Navbar variant="dark" expand="md" className="navbar">
    <Navbar.Brand href="#">
      <img src={logo} alt="scrumi logo" className="logo"/>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
