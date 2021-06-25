import { useRef, useState } from "react";
import { Card } from "react-bootstrap";
import Menu from "../layout/Menu";
import { database } from "../../lib/firebase";
import RenameModal from "../modals/RenameModal";
import DeleteModal from "../modals/DeleteModal";

export default function File({ file }) {
  const outerRef = useRef();

  const [name, setName] = useState(file.name);
  const [renameModalState, setRenameModalState] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState(false);

  const renameFile = () => {
    database.files.doc(file.id).update({
      name: name,
    });
  };

  const handleDeleteFile = () => {
    database.files.doc(file.id).delete();
    setDeleteModalState(false);
  };

  return (
    <>
      <Card>
        <a
          href={file.url}
          target="_blank"
          rel="noreferrer"
          className=""
          style={{ maxWidth: "200px" }}
          ref={outerRef}
        >
          <img src={file.url} width="200px" height="200px" alt={file.name} />
        </a>

        <h5 className="text-center mt-1 text-truncate p-1">{file.name}</h5>
      </Card>
      <Menu
        outerRef={outerRef}
        setRenameModalState={setRenameModalState}
        setDeleteModalState={setDeleteModalState}
        path={file.url}
        type="100"
      />

      <RenameModal
        renameModalState={renameModalState}
        setRenameModalState={setRenameModalState}
        renameHandler={renameFile}
        name={name}
        setName={setName}
      />

      <DeleteModal
        setDeleteModalState={setDeleteModalState}
        deleteModalState={deleteModalState}
        handleDelete={handleDeleteFile}
      />
    </>
  );
}
