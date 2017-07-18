import React, {Component} from 'react';

class Meta extends Component {
  render() {
    return <div className='Meta'>
      <table>
        <tbody>
          <tr>
            <th>Guides</th>
            <td>
              <input type='checkbox' name='guides' defaultChecked/>
            </td>
          </tr>
          <tr>
            <th>Overlays</th>
            <td>
              <input type='checkbox' name='overlays' defaultChecked/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>;
  }
}

export default Meta;
