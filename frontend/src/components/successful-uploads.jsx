import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const SuccessfulUploads = ({files, onDownload}) => {
  return (
    <div>
      <div className="upload">
        <div className="upload-files">
          <header>
            <p>
              <i className="fa fa-cloud-upload" aria-hidden="true"></i>
              <span className="up">Files</span>
            </p>
          </header>
          <div className="body" id="drop">
              {files?.map(file => {return (
                  <div style={{display: 'flex', paddingBottom: '5px', cursor: 'pointer'}} key={file.fileName}>
                      <div style={{ paddingRight: '100px', paddingLeft: '170px'}}>{file.fileName}</div>
                      <FontAwesomeIcon icon={faDownload} onClick={() => onDownload(file.fileName, file.imagePath, file.contentType)}></FontAwesomeIcon>
                  </div>)
              })}
          </div>
          <footer>
            <div className="divider"></div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulUploads;
