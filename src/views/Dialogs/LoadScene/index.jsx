import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addWorkspace} from '../../../store/modules/workspace';
import {addRecent} from '../../../store/modules/storage';

import './LoadScene.css';

class LoadScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
  }

  open() {
    const {addWorkspace, addRecent} = this.props;
    const {url} = this.state;
    addWorkspace(url);
    addRecent(url);
    this.props.dismiss();
  }

  setURL(url) {
    this.setState({url});
  }

  handleChange(event) {
    this.setURL(event.target.value);
  }

  render() {
    const {history} = this.props;
    const {url} = this.state;

    return <div className='LoadScene'>
      <fieldset>
        <legend>Location</legend>

        <div className='location'>
          <input type='text' value={url} onChange={(event) => this.handleChange(event)}/>

          <button onClick={() => {this.open()}}>Open</button>
        </div>
      </fieldset>

      <fieldset>
        <legend>Recent</legend>

        <ul className='recent'>
          {history.map(url => {
            return <li key={url} onClick={() => {this.setURL(url)}}>
              {url}
            </li>;
          })}
        </ul>
      </fieldset>

    </div>;
  }
}

export default connect(state => ({
  history: state.storage.get('recent', []),
}), {
  addRecent,
  addWorkspace,
})(LoadScene);
