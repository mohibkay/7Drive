import { Button, Modal } from "react-bootstrap";

export default function RenameFolder({
  renameModalState,
  setRenameModalState,
  renameHandler,
  name,
  setName,
}) {
  const closeModal = () => {
    setRenameModalState(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    renameHandler();
    closeModal();
  };

  return (
    <Modal show={renameModalState} onHide={closeModal} centered>
      <Modal.Header>Rename</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
            type="text"
            className="w-75 p-1"
          />
          <div className="d-flex justify-content-start mt-4">
            <Button
              type="submit"
              variant="outline-success"
              className="me-3 px-4"
            >
              Confirm
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
