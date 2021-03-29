import React from "react";
import "./file-upload.scss";

const FileUploadDialog = ({ isUploading, uploadFile, file }) => {
  return (
    <div>
      <div className="upload">
        <div className="upload-files">
          <header>
            <p>
              <i className="fa fa-cloud-upload" aria-hidden="true"></i>
              <span className="up">up</span>
              <span className="load">load</span>
            </p>
          </header>
          <div className="body" id="drop">
            <i
              className="fa fa-file-text-o pointer-none"
              aria-hidden="true"
            ></i>
            <p className="pointer-none">browse to begin the upload</p>
            
            <input
              type="file"
              id="file"
              name="file"
              onChange={(e) => uploadFile(e)}
            />
            
          </div>
          <footer>
            <div className="divider"></div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default FileUploadDialog;
