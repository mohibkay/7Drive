import { useRef, useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Navbar from "../components/layout/Navbar";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");
      setLoading(true);

      await signUp(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      setError("Failed to create account");
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = "Sign Up - 7Drive";
  }, []);

  return (
    <>
      <Navbar />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "calc(100vh - 56px" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>

                <Form.Group id="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>

                <Form.Group id="password-confirm" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>

                <Button
                  variant="success"
                  disabled={loading}
                  type="submit"
                  className="w-100 mt-2"
                >
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "green" }}>
              Log In
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
