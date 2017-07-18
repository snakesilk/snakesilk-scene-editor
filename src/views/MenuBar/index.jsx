import React, {Component} from 'react';
import {connect} from 'react-redux';

import Console from '../Console';

import LoadScene from '../Dialogs/LoadScene';
import Export from '../Dialogs/Export';

import {addWorkspace, removeWorkspace, toggleOverviewMode} from '../../store/modules/workspace';
import {addDialog} from '../../store/modules/dialog';

import './MenuBar.css';


class MenuBar extends Component {
  dialog(component) {
    return () => {
      this.props.addDialog(component);
    };
  }

  render() {
    const {addWorkspace, removeWorkspace, toggleOverviewMode, workspace} = this.props;

    return <div className='MenuBar'>
      <ul>
        <li>
          <button
            onClick={() => {toggleOverviewMode()}}
            disabled={workspace.workspaces.size < 2}
          >
            Switch
          </button>
        </li>
        <li>
          <button onClick={() => {addWorkspace()}}>New</button>
        </li>
        <li>
          <button onClick={this.dialog(LoadScene)}>Open...</button>
        </li>
        <li>
          <button
            disabled={!workspace.activeWorkspace}
            onClick={() => {removeWorkspace(workspace.active)}}
          >
            Close
          </button>
        </li>
        <li>
          <button
            onClick={this.dialog(Export)}
            disabled={!workspace.activeWorkspace}
          >
            Export...
          </button>
        </li>
        <li>
          <button onClick={this.dialog(Console)}>Console</button>
        </li>
      </ul>
    </div>;
  }
}

export default connect(state => ({
  workspace: state.workspace,
}), {
  addDialog,
  addWorkspace,
  removeWorkspace,
  toggleOverviewMode,
})(MenuBar);
