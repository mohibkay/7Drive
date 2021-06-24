import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
  return (
    <Navbar
      expand="sm"
      bg="light"
      className="d-flex justify-content-between align-items-center"
    >
      <Container className="w-75">
        <Navbar.Brand as={Link} to="/">
          7Drive
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/profile">
            Profile
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
