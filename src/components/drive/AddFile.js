import { FaFileUpload } from "react-icons/fa";
import { ROOT_FOLDER } from "../../constants";
import { storage, database } from "../../lib/firebase";
import { useAuth } from "../../context/authContext";

export default function AddFile({ currentFolder }) {
  const {
    currentUser: { uid: userId },
  } = useAuth();

  const handleUpload = (e) => {
    const [file] = e.target.files;

    if (currentFolder == null || file == null) return;

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${file.name}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;

    console.log(filePath);

    const uploadTask = storage.ref(`files/${userId}/${filePath}`).put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      () => {},
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
          database.files.add({
            url: url,
            name: file.name,
            folderId: currentFolder.id,
            userId: userId,
            createdAt: database.getServerTimestamp(),
          });
        });
      }
    );
  };

  return (
    <label className="btn btn-outline-success m-0 me-3">
      <FaFileUpload size="22" />
      <input type="file" className="d-none" onChange={handleUpload} />
    </label>
  );
}
