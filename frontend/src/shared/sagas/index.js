import { takeLatest, all, takeEvery } from 'redux-saga/effects';
import fileSagas from './files.saga';

export default function* root() {
    yield all([
        fileSagas(),
    ]);
}