import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import AddFolderBtn from "../components/drive/AddFolderBtn";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "../context/authContext";

export default function Home() {
  const history = useHistory();

  return (
    <>
      <Navbar />
      <Container fluid>
        <AddFolderBtn />
      </Container>
    </>
  );
}
