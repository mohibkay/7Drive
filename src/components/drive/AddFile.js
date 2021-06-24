import { useState } from "react";
import ReactDOM from "react-dom";
import { FaFileUpload } from "react-icons/fa";
import { ROOT_FOLDER } from "../../constants";
import { storage, database } from "../../lib/firebase";
import { useAuth } from "../../context/authContext";
import { v4 as uuidV4 } from "uuid";
import { Toast } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";

export default function AddFile({ currentFolder }) {
  const [uploadingFiles, setUploadingFiles] = useState([]);

  const {
    currentUser: { uid: userId },
  } = useAuth();

  const handleUpload = (e) => {
    const [file] = e.target.files;

    if (currentFolder == null || file == null) return;

    const id = uuidV4();
    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      { id: id, name: file.name, progress: 0, error: false },
    ]);

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${file.name}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;

    console.log(filePath);

    const uploadTask = storage.ref(`files/${userId}/${filePath}`).put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadingFile) => {
            if (uploadingFile.id === id) {
              return { ...uploadingFile, progress: progress };
            }

            return uploadingFile;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadingFile) => {
            if (uploadingFile.id === id) {
              return { ...uploadingFile, error: true };
            }
            return uploadingFile;
          });
        });
      },

      () => {
        //SIMULATE TOAST ERROR
        // setUploadingFiles((prevUploadingFiles) => {
        //   return prevUploadingFiles.map((uploadingFile) => {
        //     if (uploadingFile.id === id) {
        //       return { ...uploadingFile, error: true };
        //     }
        //     return uploadingFile;
        //   });
        // });
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.filter((uploadingFile) => {
            return uploadingFile.id !== id;
          });
        });

        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.files
            .where("name", "==", file.name)
            .where("folderId", "==", currentFolder.id)
            .where("userId", "==", userId)
            .get()
            .then((existingFiles) => {
              const [existingFile] = existingFiles.docs;
              if (existingFile) {
                existingFile.ref.update({ url: url });
              } else {
                database.files.add({
                  url: url,
                  name: file.name,
                  folderId: currentFolder.id,
                  userId: userId,
                  createdAt: database.getServerTimestamp(),
                });
              }
            });
        });
      }
    );
  };

  return (
    <>
      <label className="btn btn-outline-success m-0 me-3">
        <FaFileUpload size="22" />
        <input type="file" className="d-none" onChange={handleUpload} />
      </label>

      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "400px",
            }}
          >
            {uploadingFiles.map((file) => (
              <Toast
                key={file.id}
                onClose={() => {
                  setUploadingFiles((prevUploadingFiles) => {
                    return prevUploadingFiles.filter((uploadFile) => {
                      return uploadFile.id !== file.id;
                    });
                  });
                }}
              >
                <Toast.Header
                  className="text-truncate d-block w-100"
                  closeButton={file.error}
                >
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={!file.error}
                    variant={file.error ? "danger" : "primary"}
                    now={file.error ? 100 : file.progress * 100}
                    label={
                      file.error
                        ? "Error"
                        : `${Math.round(file.progress * 100)}%`
                    }
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
