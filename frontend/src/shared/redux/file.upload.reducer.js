import { createActions, createReducer } from 'reduxsauce';
import produce from 'immer';

const { Types, Creators } = createActions({
    uploadFile: ['payload'],
    uploadFileComplete: ['payload'],
    isUploading: ['payload'],
    setCategory: ['payload'],
    setLastReviewedDate: ['payload'],
    saveFile: ['payload'],
    setFileType: ['payload'],
    setSuccessfulResponse: ['payload'],
    setFailureResponse: ['payload'],
    setSavedFiles: ['payload'],
    getFiles: ['payload'],
    getDownloadImage: ['payload'],
    setImageBlob: ['payload']
});

export const FileUploadTypes = Types;
export default Creators;

export const INITITAL_STATE = {
    isUploading: false,
    file: null,
    category: '',
    lastReviewDate: null,
    fileType: null,
    successfulResponse: null,
    failureResponse: null,
    savedFiles: [],
    imageBlob: []
};

const setSavedFiles = produce((draft, { payload}) => {
    if(payload.result instanceof Array) {
        draft.savedFiles = [...draft.savedFiles, ...payload.result];
    } else {
        draft.savedFiles = [...draft.savedFiles, payload.result];
    }
    
});

const setSuccessfulResponse = produce((draft, { payload}) => {
    draft.successfulResponse = payload.result;
});
const setFailureResponse = produce((draft, { payload}) => {
    draft.failureResponse = payload.result;
});

const uploadFile = produce((draft, { payload}) => {
    draft.file = payload.file;
});

const setFileType = produce((draft, { payload}) => {
    draft.fileType = payload.fileType;
});

const uploadFileComplete = produce((draft, { payload }) => {
    draft.isUploading = false;
    draft.file =  null;
    draft.category = '';
    draft.lastReviewDate = new Date();
    draft.fileType = null;
});

const isUploading = produce((draft, { payload }) => {
    draft.isUploading = payload.isUploading;
});

const setCategory = produce((draft, { payload }) => {
    draft.category = payload.category;
});

const setLastReviewedDate = produce((draft, { payload }) => {
    draft.lastReviewDate = payload.lastReviewDate;
});

const setImageBlob = produce((draft, { payload }) => {
    if(payload.result instanceof Array) {
        draft.imageBlob = [...draft.imageBlob, ...payload.result];
    } else {
        draft.imageBlob = [...draft.imageBlob, payload.result];
    }
    //draft.imageBlob = payload.imageBlob;
});

export const files = createReducer(INITITAL_STATE, {
    [Types.UPLOAD_FILE] : uploadFile,
    [Types.UPLOAD_FILE_COMPLETE]: uploadFileComplete,
    [Types.IS_UPLOADING] : isUploading,
    [Types.SET_CATEGORY] : setCategory,
    [Types.SET_LAST_REVIEWED_DATE] : setLastReviewedDate,
    [Types.SET_FILE_TYPE]: setFileType,
    [Types.SET_SUCCESSFUL_RESPONSE]: setSuccessfulResponse,
    [Types.SET_FAILURE_RESPONSE]: setFailureResponse,
    [Types.SET_SAVED_FILES]: setSavedFiles,
    [Types.SET_IMAGE_BLOB]: setImageBlob
});