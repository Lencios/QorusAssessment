import { select, put, call, all, takeEvery } from 'redux-saga/effects';
import { category, getFile, lastReviewedDate as lastReviewDate, getFileType } from '../selectors/file.selectors';
import FileActions, { FileUploadTypes } from '../redux/file.upload.reducer';
import { uploadFile, getFilesOnServer, downloadImage } from '../../services/api';

export function* saveFile({ payload }) {
    yield put(FileActions.isUploading({isUploading: true}));
    const file = yield select(getFile);
    const lastReviewedDate = yield select(lastReviewDate);
    const fileCategory = yield select(category);
   /* const fileType = yield select(getFileType); */

    let response = null;
    try {
     response = yield call(uploadFile, {file, fileCategory, lastReviewedDate});
     yield put(FileActions.setSuccessfulResponse({result: true}));
     yield put(FileActions.setSavedFiles({result: response}));
    } catch(error) {
        yield put(FileActions.setFailureResponse({result: true}));
        //throw new Error(error);
    }
    
    yield put(FileActions.isUploading({isUploading: false}));
}

 function* loopYieldGetBlob(array) {
    for (var item of array) {
        yield call(getDownloadImage, { payload: {item }})
    }
}
export function* getFiles({ payload }) {
    yield put(FileActions.isUploading({isUploading: true}));

    let response = null;
    try {
     response = yield call(getFilesOnServer);
     yield put(FileActions.setSuccessfulResponse({result: true}));
     yield put(FileActions.setSavedFiles({result: response}));

   
     
    //yield loopYieldGetBlob(response);
     //yield call(getDownloadImage, { payload: response });

    } catch(error) {
        yield put(FileActions.setFailureResponse({result: true}));
        yield put(FileActions.isUploading({isUploading: false}));
        //throw new Error(error);
    }
    
    yield put(FileActions.isUploading({isUploading: false}));
}

export function* getDownloadImage({ payload }) {
    yield put(FileActions.isUploading({isUploading: true}));

    let response = null;
    try {
        response = yield call(downloadImage, { url: payload.item.imagePath });
        yield put(FileActions.setImageBlob({result: response}));
     

    } catch(error) {
        yield put(FileActions.isUploading({isUploading: false}));
        //throw new Error(error);
    }
    
    yield put(FileActions.isUploading({isUploading: false}));
}




export default function* fileSagas() {
yield all([
    takeEvery(FileUploadTypes.SAVE_FILE, saveFile),
    takeEvery(FileUploadTypes.GET_FILES, getFiles),
    takeEvery(FileUploadTypes.GET_DOWNLOAD_IMAGE, getDownloadImage)
]);
}