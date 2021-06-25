import { useRef, useState } from "react";
import { Card } from "react-bootstrap";
import Menu from "../Menu";
import RenameFolder from "../modals/RenameFolder";
import { database } from "../../lib/firebase";
import DeleteFolder from "../modals/DeleteFolder";

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
      <Card className="">
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

      <RenameFolder
        renameModalState={renameModalState}
        setRenameModalState={setRenameModalState}
        renameFolder={renameFile}
        name={name}
        setName={setName}
      />

      <DeleteFolder
        setDeleteModalState={setDeleteModalState}
        deleteModalState={deleteModalState}
        handleDelete={handleDeleteFile}
      />
    </>
  );
}
