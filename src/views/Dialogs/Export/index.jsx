import React, {Component} from 'react';
import {connect} from 'react-redux';

import './Export.css';

class Export extends Component {
  getXML() {
    return this.props.workspace.editor.getXML();
  }

  getFile() {
    const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' + this.getXML();
    //xml = vkbeautify.xml(xml) + '\n';
    const file = new File([xml], 'Scene.xml', {type: 'text/xml'});
    return file;
  }

  getURL() {
    const file = this.getFile();
    return URL.createObjectURL(file);
  }

  render() {
    console.log(this.props);
    const {workspace} = this.props;

    return <div className='Export'>
      { workspace
        ? <div>
            <div className='preview'>
              <textarea className='preview'>
              {this.getXML()}
            </textarea>
          </div>

          <div>
            <a href={this.getURL()} download='Scene.xml'>
              <button>Download</button>
            </a>
          </div>
        </div>
        : null
      }
    </div>;
  }
}

export default connect(state => ({
  workspace: state.workspace.activeWorkspace,
}), {
})(Export);
