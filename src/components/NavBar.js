import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FaGithub } from 'react-icons/fa'
import UserCard from './UserCard';
import MenuButtons from './MenuButtons';

export default function NavBar() {

  return (
    <Navbar variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>budget twitter</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navbar-options">
            <MenuButtons />
            <UserCard />
            <div className="info" style={{ textAlign: "center" }}>
              <p>Twitter-like blog created with MERN</p>
              <p>Ayush Panwar, 2022</p>
              <p><FaGithub className="github-logo" /><a href="https://github.com/payyup/budget-twitter" target="_blank" rel="noreferrer"> github.com/payyup</a></p>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  )
}