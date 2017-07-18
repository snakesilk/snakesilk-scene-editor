import React, {Component} from 'react';

class Space extends Component {
  render() {
    const {active} = this.props;
    return <div className={'Space ' + (active ? 'active' : 'inactive')}>
      {this.props.children}
    </div>;
  }
}

export default Space;
