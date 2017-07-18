import React, { Component } from 'react';

class Layers extends Component {
  render() {
    return <div className='Layers'>
      <table>
        <thead>
          <tr>
            <th></th>
            <td>S</td>
            <td>L</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Behaviors</th>
            <td>
              <input type="checkbox" name="behavior" data-what="show" defaultChecked/>
            </td>
            <td>
              <input type="checkbox" name="behavior" data-what="lock" defaultChecked/>
            </td>
          </tr>

          <tr>
            <th>Camera Paths</th>
            <td>
              <input type="checkbox" name="cameraPath" data-what="show" defaultChecked/>
            </td>
            <td>
              <input type="checkbox" name="cameraPath" data-what="lock" defaultChecked/>
            </td>
          </tr>

          <tr>
            <th>Checkpoints</th>
            <td>
              <input type="checkbox" name="checkpoint" data-what="show" defaultChecked/>
            </td>
            <td>
              <input type="checkbox" name="checkpoint" data-what="lock" defaultChecked/>
            </td>
          </tr>

          <tr>
            <th>Visuals</th>
            <td>
              <input type="checkbox" name="object" data-what="show" defaultChecked/>
            </td>
            <td>
              <input type="checkbox" name="object" data-what="lock" defaultChecked/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>;
  }
}

export default Layers;
