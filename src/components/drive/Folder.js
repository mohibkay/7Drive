import { Link } from "react-router-dom";
import { FaFolder } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { database } from "../../lib/firebase";
import DeleteFolder from "../modals/DeleteFolder";

export default function Folder({ folder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const openModal = () => {
    console.log("ran");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      database.folders.doc(folder.id).delete();
      closeModal();
      console.log("deleted", folder.id);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div id="modal-parent">
      <Button
        variant="outline-dark"
        className="folder-btn text-truncate w-100 fs-4"
        as={Link}
        to={{
          pathname: `/folder/${folder.id}`,
          state: { folder: folder },
        }}
        onContextMenu={(e) => {
          if (e.button === 2) {
            e.preventDefault();
            console.log(e.button);
            openModal();
          }
        }}
      >
        {/* <FaFolder className="me-2 mb-1" /> */}
        {folder?.name}

        <span className="horizontal-dots" onClick={openModal}>
          <BiDotsHorizontalRounded />
        </span>
      </Button>

      <Modal
        // className="option-modal"
        contentClassName="option-modal"
        id="option-modal"
        show={isOpen}
        onHide={closeModal}
        centered
      >
        <Modal.Body>
          <ul>
            <li>Edit</li>
            <li
              onClick={() => {
                setDeleteModal(true);
                setIsOpen(false);
              }}
            >
              Delete
            </li>
          </ul>
        </Modal.Body>
      </Modal>

      <DeleteFolder
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        handleDelete={handleDelete}
      />
    </div>
  );
}
