import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
  return (
    <Navbar expand="sm" bg="light">
      <Navbar.Brand as={Link} to="/">
        7Drive
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/profile">
          Profile
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
