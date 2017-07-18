import React, {Component} from 'react';
import {connect} from 'react-redux';

import Camera from './Camera';
import Layers from './Layers';
import Layout from './Layout';
import Meta from './Meta';
import Playback from './Playback';

class Workspace extends Component {
  render() {
    return <div className='Workspace'>
      <div className='viewport'>
        <div className='coords'>
          <div className='x'>X <span className='value'>-</span></div>
          <div className='y'>Y <span className='value'>-</span></div>
        </div>
      </div>

      <div className='panel view locked'>
        <fieldset className='meta'>
          <legend>Meta</legend>

          <Meta/>
        </fieldset>

        <fieldset className='layers'>
          <legend>Layers</legend>

          <Layers/>
        </fieldset>

        <fieldset className='camera'>
          <legend>Camera</legend>

          <Camera/>
        </fieldset>

        <fieldset className='playback'>
          <legend>Playback</legend>
          <Playback/>

        </fieldset>
      </div>

      <div className='panel item locked'>
        <fieldset className='properties'>
          <legend>Properties</legend>

          <Layout/>
        </fieldset>

        <fieldset className='items'>
          <legend>Item</legend>
          <fieldset className='create'>
            <legend>Create</legend>
            <button type='object'>Object</button>
            <button type='cameraPath'>Camera Path</button>
            <button type='checkpoint'>Checkpoint</button>
            <button type='climbable'>Climbable</button>
            <button type='deathzone'>DeathZone</button>
            <button type='solid'>Solid</button>
          </fieldset>

          <fieldset className='set'>
            <legend>Set</legend>
            <button name='unlockAll'>Unlock</button>
          </fieldset>
        </fieldset>
      </div>

      <div className='palette hidden'>
        <div className='animations'>

        </div>
      </div>
    </div>;
  }
}

export default connect(state => ({
}))(Workspace);
