import { FaFileUpload } from "react-icons/fa";
import { ROOT_FOLDER } from "../../constants";
import { storage } from "../../lib/firebase";

export default function AddFile({ currentFolder }) {
  console.log(currentFolder.path);

  const handleUpload = (e) => {
    const [file] = e.target.files;

    if (currentFolder === null || file === null) {
      return;
    } else {
      const filePath =
        currentFolder === ROOT_FOLDER
          ? `${currentFolder.path.join("/")}/${file.name}`
          : `${currentFolder.path.join("/")}/${currentFolder.name}/${
              file.name
            }`;
    }
  };

  return (
    <label className="btn btn-outline-success m-0 me-3">
      <FaFileUpload size="22" />
      <input type="file" className="d-none" onChange={handleUpload} />
    </label>
  );
}
