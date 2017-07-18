import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Workspaces.css';

class WorkSpaces extends Component {
  static propTypes = {
    activeIndex: PropTypes.number,
    onPicked: PropTypes.func.isRequired,
  };

  static defaultProps = {
    activeIndex: 0,
  };

  render() {
    const {activeIndex, children} = this.props;

    const style = {
      transform: [
        `translateX(${activeIndex < 0 ? 0 : activeIndex * -100}%)`,
        `scale(${activeIndex < 0 ? .3 : 1})`,
      ].join(' '),
    };

    return <div className={'WorkSpaces ' + (activeIndex < 0 ? 'overview' : 'normal')}>
      <div className='spaces' style={style}>
        {children.map((child, index) => {
          const style = {
            transform: `translateX(${index * 100}%)`,
          };
          return <div
            key={index}
            className='space'
            style={style}
            onClick={() => {this.props.onPicked(index)}}>
            {child}
          </div>;
        })}
      </div>
    </div>;
  }
}

export default WorkSpaces;
