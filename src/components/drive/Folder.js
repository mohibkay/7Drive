import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaFolder } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { database, db } from "../../lib/firebase";
import { useAuth } from "../../context/authContext";
import DeleteFolder from "../modals/DeleteFolder";
import Menu from "../Menu";

export default function Folder({ folder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const outerRef = useRef(null);
  const {
    currentUser: { uid: userId },
  } = useAuth();

  const openModal = () => {
    console.log("ran");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleRenamingFolder = () => {
    database.files
      .where("folderId", "==", folder.id)
      .where("userId", "==", userId)
      .get()
      .then((doc) => console.log(doc));
  };

  const handleDelete = async () => {
    try {
      let batch = db.batch();

      const folderRef = db.collection("folders").doc(folder.id);
      batch.delete(folderRef);

      // db.collection("files")
      //   .where("folderId", "==", folder.id)
      //   .get()
      //   .then((item) => {
      //     const items = item.docs.map((doc) => doc.data());
      //     console.log(items);
      //     items.map((item) => batch.delete(item));
      //   });

      // batch.delete(filesRef);

      batch.commit().then(() => console.log("successfully deleted"));

      closeModal();
      console.log("deleted", folder.id);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Button
        variant="outline-dark"
        className="folder-btn text-truncate w-100 fs-4"
        as={Link}
        to={{
          pathname: `/folder/${folder.id}`,
          state: { folder: folder },
        }}
        ref={outerRef}
      >
        <FaFolder className="me-2 mb-1" />
        {folder?.name}
      </Button>

      <Menu
        outerRef={outerRef}
        deleteFolder={setDeleteModal}
        renameFolder={handleRenamingFolder}
        folder={folder}
      />

      <DeleteFolder
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        handleDelete={handleDelete}
      />
    </div>
  );
}
