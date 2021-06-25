import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import AddFile from "../components/drive/AddFile";
import AddFolder from "../components/drive/AddFolder";
import File from "../components/drive/File";
import Folder from "../components/drive/Folder";
import FolderBreadcumbs from "../components/layout/FolderBreadcumbs";
import Navbar from "../components/layout/Navbar";
import { useFolder } from "../hooks/useFolder";

export default function Home() {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );

  useEffect(() => {
    document.title = "Dashboard - 7Drive";
  }, []);

  return (
    <>
      <Navbar />
      <Container className="w-75 mt-4">
        <div className="d-flex align-items-center">
          <FolderBreadcumbs currentFolder={folder} />
          <AddFile currentFolder={folder} />
          <AddFolder currentFolder={folder} />
        </div>

        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => (
              <div
                key={childFolder.id}
                className="p-2"
                style={{ maxWidth: "250px" }}
              >
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}

        {childFolders.length > 0 && childFiles.length > 0 && <hr />}

        {childFiles.length > 0 && (
          <Container className="d-flex flex-wrap">
            <Row>
              {childFiles.map((childFile) => (
                <Col
                  key={childFile.id}
                  className="p-2"
                  style={{ maxWidth: "250px" }}
                >
                  <File file={childFile} />
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </Container>
    </>
  );
}
