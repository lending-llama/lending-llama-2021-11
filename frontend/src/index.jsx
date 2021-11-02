import React from 'react';
import ReactDOM from 'react-dom';
import {App} from "./App";
import './features'
import './redux'
import {Provider} from "react-redux";
import {store} from "./redux";
import {AppShell} from "./AppShell";

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <AppShell><App/></AppShell>
    </Provider>
  </React.StrictMode>
);
ReactDOM.render(app, document.getElementById('root'));

// Hot Module Replacement (HMR)
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (undefined /* [snowpack] import.meta.hot */ ) {
  undefined /* [snowpack] import.meta.hot */ .accept();
}
