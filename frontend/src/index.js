import React from 'react';
import {render} from 'react-dom';
import './index.scss';
import FileUpload from './components';
import { configureStore } from './shared/store';
import { Provider } from 'react-redux';

const initialState = {};
const store = configureStore(initialState, 'renderer');
render(
  <Provider store={store}>
<React.StrictMode>
    <FileUpload/>
  </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
);
