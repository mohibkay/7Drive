import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaFolder } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { database, db } from "../../lib/firebase";
import DeleteFolder from "../modals/DeleteFolder";
import RenameFolder from "../modals/RenameFolder";
import Menu from "../Menu";

export default function Folder({ folder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(folder.name);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [renameModalState, setRenameModalState] = useState(false);

  const outerRef = useRef(null);

  const openModal = () => {
    console.log("ran");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleRenamingFolder = () => {
    database.folders.doc(folder.id).update({
      name: name,
    });
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
        setRenameModalState={setRenameModalState}
        setDeleteModalState={setDeleteModalState}
        path={`/folder/${folder.id}`}
      />

      <RenameFolder
        renameModalState={renameModalState}
        name={name}
        setName={setName}
        setRenameModalState={setRenameModalState}
        renameFolder={handleRenamingFolder}
      />

      <DeleteFolder
        deleteModalState={deleteModalState}
        setDeleteModalState={setDeleteModalState}
        handleDelete={handleDelete}
      />
    </div>
  );
}
