import { combineReducers } from 'redux';
import { files } from './file.upload.reducer';

export default function getRootReducer(scope = 'main') {
    let reducers = {
        files
    };

   /*  if(scope === 'renderer') {
        reducers = {
            ...reducers,
        };
    } */

    return combineReducers({...reducers});
}