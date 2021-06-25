import useContextMenu from "../hooks/useContextMenu";
import { useHistory } from "react-router-dom";

const Menu = ({
  outerRef,
  setDeleteModalState,
  path,
  setRenameModalState,
  type,
}) => {
  const { xPos, yPos, menu } = useContextMenu(outerRef);
  const history = useHistory();

  if (menu) {
    return (
      <ul className="folder-menu" style={{ top: yPos, left: xPos }}>
        {type === "100" ? (
          <li>
            <a
              href={path}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "1.25rem",
                width: "100%",
                cursor: "pointer",
              }}
            >
              Open
            </a>
          </li>
        ) : (
          <li onClick={() => history.push(path)}>Open</li>
        )}
        <li onClick={() => setRenameModalState(true)}>Rename</li>
        <li onClick={() => setDeleteModalState(true)}>Delete</li>
      </ul>
    );
  }
  return <></>;
};

export default Menu;
