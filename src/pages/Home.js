import React from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Home() {
  const history = useHistory();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    history.push("/login");
  };

  return (
    <div>
      <Link to="/register" className="mr-4">
        Sign Up
      </Link>
      <Link to="/login">Sign In</Link>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
