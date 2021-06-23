import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaFolderPlus } from "react-icons/fa";
import { database } from "../../lib/firebase";

export default function AddFolderBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      database.folders.add({
        name: name,
      });
      closeModal();
    } catch (error) {}
  };

  return (
    <>
      <Button variant="outline-success" onClick={openModal}>
        <FaFolderPlus size="25" />
      </Button>

      <Modal show={isOpen} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              Add Folder
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
