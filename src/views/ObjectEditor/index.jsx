import React, { Component } from 'react';
import {Provider} from 'react-redux';

import Workspace from './Workspace';

import './ObjectEditor.css';

class ObjectEditor extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
  }

  render() {
    return <Provider store={this.store}>
      <Workspace/>
    </Provider>;
  }
}

export default ObjectEditor;
