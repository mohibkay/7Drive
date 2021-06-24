import { Button, Modal } from "react-bootstrap";

export default function DeleteFolder({
  deleteModal,
  setDeleteModal,
  handleDelete,
}) {
  const closeModal = () => {
    setDeleteModal(false);
  };
  return (
    <Modal show={deleteModal} onHide={closeModal} centered>
      <Modal.Header>Delete Folder</Modal.Header>
      <Modal.Body>Are you sure you want to delete the folder?</Modal.Body>
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
