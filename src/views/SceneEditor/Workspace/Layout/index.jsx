import React, {Component} from 'react';
import {connect} from 'react-redux';

import {toggleSnap} from '../../store/reducer';

class Layout extends Component {
  render() {
    const {snap, toggleSnap} = this.props;

    return <div className='Layout'>
      <div className="position">
        <label><input type="text" name="x" /> X</label>
        <label><input type="text" name="y" /> Y</label>
        <label><input type="text" name="z" /> Z</label>
      </div>
      <div className="size">
        <label><input type="text" name="w" /> W</label>
        <label><input type="text" name="h" /> H</label>
        <label><input type="text" name="scale" /> Scale</label>
      </div>

      <label>
        <input
          type='checkbox'
          checked={snap}
          onClick={toggleSnap}
        /> Snap
      </label>
    </div>;
  }
}

export default connect(state => ({
  snao: state.editor.grid.snap,
}), {
  toggleSnap,
})(Layout);
