/// <reference path="./_missing-types.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Provider } from 'react-redux';
import store from './reducers';

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <MuiThemeProvider>
          <App />
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
