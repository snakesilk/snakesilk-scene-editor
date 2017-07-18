import React, { Component } from 'react';
import {Provider} from 'react-redux';

import Workspace from './Workspace';

import {refresh} from './store/reducer';

import './SceneEditor.css';

class SceneEditor extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.editor = props.store.getState().editor;
    this.url = null;
  }

  componentDidMount() {
    this.editor.setupUI(this.workspace);
    this.handleProps(this.props);
  }

  componentWillReceiveProps(props) {
    this.handleProps(props);
  }

  handleProps({url}) {
    if (url && this.url !== url) {
      this.editor.loadURL(url).then(() => this.store.dispatch(refresh()));
      this.url = url;
    }
  }

  render() {
    return <Provider store={this.store}>
      <div className='SceneEditor'>
        <div ref={node => {this.workspace = node}}>
          <Workspace/>
        </div>
      </div>
    </Provider>;
  }
}

export default SceneEditor;
