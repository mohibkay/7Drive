import useContextMenu from "../hooks/useContextMenu";
import { useHistory } from "react-router-dom";

const Menu = ({ outerRef, deleteFolder, renameFolder, folder }) => {
  const { xPos, yPos, menu } = useContextMenu(outerRef);
  const history = useHistory();

  if (menu) {
    return (
      <ul className="folder-menu" style={{ top: yPos, left: xPos }}>
        <li onClick={() => history.push(`/folder/${folder.id}`)}>Open</li>
        <li onClick={renameFolder}>Rename</li>
        <li onClick={() => deleteFolder(true)}>Delete</li>
      </ul>
    );
  }
  return <></>;
};

export default Menu;
