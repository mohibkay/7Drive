import React from "react";
import { FaFile } from "react-icons/fa";

export default function File({ file }) {
  return (
    <>
      <a
        href={file.url}
        target="_blank"
        rel="noreferrer"
        className=""
        style={{ maxWidth: "200px" }}
      >
        <img src={file.url} width="200px" height="200px" alt={file.name} />
      </a>
    </>
  );
}
