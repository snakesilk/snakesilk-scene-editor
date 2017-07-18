import React, {Component} from 'react';

/*
<button name='followSelected'>Follow selected</button>
          <button name='unfollow'>Unfollow</button>

          <label> Obey Paths</label>

        </tbody>
      </table>
*/

class Camera extends Component {
  render() {
    return <div className='Camera'>
      <table>
        <tbody>
          <tr>
            <th>Zoom</th>
            <td>
              <button name='zoom' dir='1'>-</button>
            </td>
            <td>
              <button name='zoom' dir='-1'>+</button>
            </td>
          </tr>

          <tr>
            <th>Obey Paths</th>
            <td>
              <input type='checkbox' name='obeyPaths'/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>;
  }
}

export default Camera;
