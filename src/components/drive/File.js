import { useRef, useState } from "react";
import { Card } from "react-bootstrap";
import Menu from "../Menu";
import RenameFolder from "../modals/RenameFolder";
import { database } from "../../lib/firebase";

export default function File({ file }) {
  const outerRef = useRef();

  const [name, setName] = useState(file.name);
  const [renameModalState, setRenameModalState] = useState(false);

  const renameFile = () => {
    database.files.doc(file.id).update({
      name: name,
    });
  };

  const handleDeleteFile = () => {};

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
        // deleteFolder={setDeleteModal}
        path={file.url}
      />

      <RenameFolder
        renameModalState={renameModalState}
        setRenameModalState={setRenameModalState}
        renameFolder={renameFile}
        name={name}
        setName={setName}
      />
    </>
  );
}
