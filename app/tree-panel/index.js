import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';

import './Tree.css';
import TreeView from './TreeView';

export default class TreePanel {

  constructor(options) {

    const {
      modeler,
      container,
      store
    } = options;

    ReactDOM.render(
      <Provider store={ store }>
        <TreeView modeler={ modeler }/>
      </Provider>,
      container
    );
  }
}

