import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import PropTypes from 'prop-types';
import { Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap';


function NavBar() {
  return (
    <Navbar variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>budget twitter</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(NavBar);