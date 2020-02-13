import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  render() {
    return [
      <ion-content class="ion-padding text-center">
        <h2>Welcome to StuMan</h2>
        <h5>The Student Manager App</h5>
        <ion-list>
          <ion-item href="/students">
            <img src="/assets/img/home.png" alt="Students"/>
          </ion-item>
        </ion-list>
      </ion-content>
    ];
  }
}
