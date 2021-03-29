import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isUploading as uploading,
  category as fileCategory,
  lastReviewedDate,
  getFile, getSavedFiles
} from "../shared/selectors/file.selectors";
import FileUploadDialog from "./file-upload-dialog";
import "./index.scss";
import SuccessfulUploads from "./successful-uploads";
import fileActions from "../shared/redux/file.upload.reducer";
import Footer from "./footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Spinner from "./spinner";

const FileUpload = () => {
  const dispatch = useDispatch();

  const isUploading = useSelector(uploading);
  const category = useSelector(fileCategory);
  const reviewDate = useSelector(lastReviewedDate);
  const file = useSelector(getFile);
  const savedFiles = useSelector(getSavedFiles);

  const [isDisabled, setIsDisabled] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const leftSplitRef = useRef();

  useEffect(() => {
    if (isUploading) {
      setShowSpinner(true);
    } else {
      setShowSpinner(false);
    }
  }, [isUploading]);

  useEffect(() => {
    getFiles();
  }, []);


  useEffect(() => {
    if (isUploading) {
      setIsDisabled(true);
    }
    if (file && category !== "" && reviewDate) {
      setIsDisabled(false);
    }
  }, [file, category, reviewDate, isUploading]);

  const getFiles = useCallback(
    (e) => dispatch(fileActions.getFiles({})),
    [dispatch]
  );

  const changeCategory = useCallback(
    (event) =>
      dispatch(fileActions.setCategory({ category: event.target.value })),
    [dispatch]
  );

  const changeLastReviewDate = useCallback(
    (date) =>
      dispatch(fileActions.setLastReviewedDate({ lastReviewDate: date })),
    [dispatch]
  );

  const saveFile = useCallback(() => dispatch(fileActions.saveFile()), [
    dispatch,
  ]);

  const uploadFile = useCallback(
    (e) => dispatch(fileActions.uploadFile({ file: e })),
    [dispatch]
  );

  const handleChangeFile = (file) => {
    if (!file) return;
    let reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onerror = function () {
      toast.error("Error loading file");
    };
    uploadFile(file);
  };
 
  const downloadFile = (name, fileUrl, contentType) => {
     const blob = new Blob([], { type: contentType});
   const link = document.createElement('a');
   if(!link.download) {
     const url = URL.createObjectURL(blob);
     link.setAttribute('href', fileUrl);
     link.setAttribute("download", name);
     document.body.appendChild(link);
     link.click();
     
     document.body.removeChild(link);
   }
  };

  return (
    <div>
      <div className="split left" ref={leftSplitRef}>
        <Spinner show={showSpinner}/>
        <FileUploadDialog
          isUploading={isUploading}
          uploadFile={(e) => handleChangeFile(e.target.files[0])}
          file={file}
        />
        <Footer
          isDisabled={isDisabled}
          category={category}
          lastReviewDate={reviewDate}
          onChangeCategory={(category) => changeCategory(category)}
          onChangeDate={(date) => changeLastReviewDate(date)}
          submit={saveFile}
        />
      </div>
      <div className="split right">
        <SuccessfulUploads files={savedFiles}  onDownload={(name, url, contentType) => downloadFile(name, url, contentType)}/>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FileUpload;
