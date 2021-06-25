import useContextMenu from "../hooks/useContextMenu";
import { useHistory, Redirect, Route } from "react-router-dom";

const Menu = ({ outerRef, deleteFolder, path, setRenameModalState }) => {
  const { xPos, yPos, menu } = useContextMenu(outerRef);
  const history = useHistory();

  if (menu) {
    return (
      <ul className="folder-menu" style={{ top: yPos, left: xPos }}>
        <li onClick={() => history.push(path)}>Open</li>
        <li onClick={() => setRenameModalState(true)}>Rename</li>
        <li onClick={() => deleteFolder(true)}>Delete</li>
      </ul>
    );
  }
  return <></>;
};

export default Menu;
