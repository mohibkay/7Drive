import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import AddFile from "../components/drive/AddFile";
import AddFolderBtn from "../components/drive/AddFolderBtn";
import File from "../components/drive/File";
import Folder from "../components/drive/Folder";
import FolderBreadcumbs from "../components/layout/FolderBreadcumbs";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "../context/authContext";
import { useFolder } from "../hooks/useFolder";

export default function Home() {
  const history = useHistory();
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );

  return (
    <>
      <Navbar />
      <Container className="w-75 mt-4">
        <div className="d-flex align-items-center">
          <FolderBreadcumbs currentFolder={folder} />
          <AddFile currentFolder={folder} />
          <AddFolderBtn currentFolder={folder} />
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
