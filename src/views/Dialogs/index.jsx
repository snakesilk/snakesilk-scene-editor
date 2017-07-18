import React, {Component, createElement} from 'react';
import {connect} from 'react-redux';

import {dismiss} from '../../store/modules/dialog';

import './Dialogs.css';

class Dialogs extends Component {
  render() {
    const {dismiss, stack} = this.props;
    const dialog = stack.last();

    return <div className='Dialogs'>
      { dialog
        ? <div className='dialog'>
          <button onClick={() => {dismiss(dialog.id)}}>X</button>

          <div className='content'>
            {createElement(dialog.component, {
              dismiss: () => dismiss(dialog.id)
            })}
          </div>
        </div>
        : null
      }
    </div>;
  }
}

export default connect(state => ({
  stack: state.dialog.stack,
}), {
  dismiss,
})(Dialogs);
