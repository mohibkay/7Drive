import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function NavbarComponent() {
  const history = useHistory();
  const { signOut, currentUser } = useAuth();

  const handleLogout = async () => {
    await signOut();
    history.push("/login");
  };

  return (
    <Navbar
      expand="sm"
      bg="success"
      variant="dark"
      className="d-flex justify-content-between align-items-center"
    >
      <Container className="w-75">
        <Navbar.Brand as={Link} to="/">
          7Drive
        </Navbar.Brand>
        <Nav>
          {currentUser && (
            <Nav.Link as={Button} variant="success" onClick={handleLogout}>
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
