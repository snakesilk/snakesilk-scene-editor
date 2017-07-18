import React, {Component} from 'react';
import {WebGLRenderer} from 'three';

import './Workspace.css';

class Workspace extends Component {
  constructor(props) {
    super(props);

    this.renderer = new WebGLRenderer();
  }

  componentDidMount() {
    this.workspace.appendChild(this.renderer.domElement);
  }

  render() {
    return <div className='Workspace' ref={node => {this.workspace = node}}>
      <Viewport/>

    </div>;
  }
}

export default Workspace;
