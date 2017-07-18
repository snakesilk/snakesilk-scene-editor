import React, {Component} from 'react';
import {connect} from 'react-redux';
import {WebGLRenderer} from 'three';

import './Viewport.css';

class Viewport extends Component {
  constructor(props) {
    super(props);

    this.renderer = new WebGLRenderer();

    this.frameIndex = null;
    this.renderScene = () => {
      this.renderer.render(this.props.scene, this.props.camera);
      if (this.props.doRender) {
        this.frameIndex = requestAnimationFrame(this.renderScene);
      }
    };

    this.handleProps(props);
  }

  componentDidMount() {
    this.viewport.appendChild(this.renderer.domElement);
  }

  componentWillReceiveProps(props) {
    this.handleProps(props);
  }

  handleProps(props) {
    cancelAnimationFrame(this.frameIndex);
    if (props.doRender) {
      requestAnimationFrame(this.renderScene);
    }
  }

  render() {
    return <div className='Viewport' ref={node => {this.viewport = node}}>
    </div>;
  }
}

export default connect(state => ({
  doRender: state.doRender,
  camera: state.camera,
  scene: state.scene,
}))(Viewport);
