import { useRef, useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Navbar from "../components/layout/Navbar";
import { guestLoginCred } from "../constants";

export default function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const history = useHistory();

  const handleLogin = async (email, password) => {
    try {
      setError("");
      setLoading(true);

      await signIn(email, password);
      history.push("/");
    } catch (error) {
      setError("Failed to sign in to your account");
      setError(error.message);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin(emailRef.current.value, passwordRef.current.value);
  };

  const handleGuestLogin = () => {
    handleLogin(guestLoginCred.email, guestLoginCred.password);
  };

  useEffect(() => {
    document.title = "Sign In - 7Drive";
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
              <h2 className="text-center mb-4">Sign In</h2>
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

                <Button
                  variant="success"
                  disabled={loading}
                  type="submit"
                  className="w-100 mt-2"
                >
                  Sign In
                </Button>
                <div className="w-100 text-center mt-2">
                  Don't have an account?{" "}
                  <Link to="/register" style={{ color: "green" }}>
                    Sign Up
                  </Link>
                  <p className="mb-0">OR</p>
                </div>

                <div className="w-100 text-center mt-0">
                  <Button
                    onClick={handleGuestLogin}
                    variant="light"
                    disabled={loading}
                    type="submit"
                    className="w-100 mt-2 border border-success border-2"
                  >
                    Guest Login
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
