import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setContents} from '../../store/modules/console';

class Console extends Component {
  render() {
    return <div className='Console'>
      <pre>{this.props.contents}</pre>
    </div>;
  }
}

export default connect(state => ({
  contents: state.console.contents,
}), {
  setContents,
})(Console);
