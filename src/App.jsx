import React, {Component} from 'react';
import {connect} from 'react-redux';

import Dialogs from './views/Dialogs';
import MenuBar from './views/MenuBar';
import Workspaces from './components/Workspaces';
import SceneEditor from './views/SceneEditor';

import {setActiveWorkspace} from './store/modules/workspace';

import './App.css';

class App extends Component {
  render() {
    const {activeIndex, mode, workspaces, setActiveWorkspace} = this.props;

    return <div className='App'>
      <Dialogs/>

      <MenuBar/>

      <Workspaces
        activeIndex={mode ? -1 : activeIndex}
        onPicked={index => {setActiveWorkspace(index)}}>
        {workspaces.map(({url, store, editor}, index) => {
          return <SceneEditor
            key={index}
            editor={editor}
            store={store}
            url={url}/>;
        })}
      </Workspaces>
    </div>;
  }
}

export default connect(state => ({
  activeIndex: state.workspace.active,
  mode: state.workspace.overviewMode,
  workspaces: state.workspace.workspaces,
}),
{
  setActiveWorkspace
})(App);
