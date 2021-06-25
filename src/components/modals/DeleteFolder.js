import { Button, Modal } from "react-bootstrap";

export default function DeleteFolder({
  deleteModalState,
  setDeleteModalState,
  handleDelete,
}) {
  const closeModal = () => {
    setDeleteModalState(false);
  };

  return (
    <Modal show={deleteModalState} onHide={closeModal} centered>
      <Modal.Header>Delete</Modal.Header>
      <Modal.Body>Are you sure you want to delete?</Modal.Body>
      <Modal.Footer className="d-flex justify-content-start">
        <Button
          variant="outline-danger"
          className="me-2 px-4"
          onClick={handleDelete}
        >
          Yes
        </Button>
        <Button variant="outline-secondary" onClick={closeModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
