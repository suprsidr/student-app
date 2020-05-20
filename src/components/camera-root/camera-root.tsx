import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'camera-root',
  styleUrl: 'camera-root.css',
  shadow: true,
})
export class CameraRoot {

  render() {
    return (
      <ion-content class="ion-padding">
        <div style={{ paddingTop: '100px' }}>
          <p>
            <label htmlFor="imageFile">Upload a photo of yourself:</label>
            <input type="file" id="imageFile" capture="user" accept="image/*" />
          </p>
        </div>
      </ion-content>
    );
  }

}
