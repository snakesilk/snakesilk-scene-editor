import React, { Component } from 'react';
import {connect} from 'react-redux';

import {toggleSimulate} from '../../store/reducer';

class Playback extends Component {
  render() {
    const {isSimulating, toggleSimulate} = this.props;

    return <div className='Playback'>
      <table>
        <tbody>
          <tr>
            <th>
              Simulate
            </th>
            <td>
              <input
                type='checkbox'
                disabled={isSimulating === null}
                checked={isSimulating === null ? false : isSimulating}
                onClick={toggleSimulate}
              />
            </td>
          </tr>

          <tr>
            <th>
              Speed
            </th>
            <td>
              <select
                defaultValue='1'
              >
                <option value='0'>0</option>
                <option value='.1'>10%</option>
                <option value='.5'>50%</option>
                <option value='1'>100%</option>
                <option value='2'>200%</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>;
  }
}


export default connect(state => ({
  isSimulating: state.editor.game.scene ? !state.editor.game.scene._paused : null
}), {
  toggleSimulate,
})(Playback);
