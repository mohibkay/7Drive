import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaFolderPlus } from "react-icons/fa";
import { database } from "../../lib/firebase";
import { useAuth } from "../../context/authContext";
import { ROOT_FOLDER } from "../../constants";

export default function AddFolderBtn({ currentFolder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const {
    currentUser: { uid: userId },
  } = useAuth();

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentFolder === null) {
      return;
    }

    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    try {
      database.folders.add({
        name,
        parentId: currentFolder.id,
        userId,
        path,
        createdAt: database.getServerTimestamp(),
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
