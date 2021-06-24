import { Link } from "react-router-dom";
import { FaFolder } from "react-icons/fa";
import { Button } from "react-bootstrap";

export default function Folder({ folder }) {
  return (
    <Button
      variant="outline-dark"
      className="text-truncate w-100 fs-4"
      as={Link}
      to={{
        pathname: `/folder/${folder.id}`,
        state: { folder: folder },
      }}
    >
      <FaFolder className="me-2 mb-1" />
      {folder?.name}
    </Button>
  );
}
