import { Component, h } from '@stencil/core';
import { menuController } from '@ionic/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  menuClose() {
    menuController.close();
  }

  render() {
    return [
      <ion-menu id="main-menu" side="start" content-id="main">
        <ion-header>
          <ion-toolbar>
            <ion-title>Menu</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item href="/" onClick={() => this.menuClose()}>
              <ion-icon name="home" slot="start"></ion-icon>
              <ion-label>Home</ion-label>
            </ion-item>
            <ion-item href="/students" onClick={() => this.menuClose()}>
              <ion-icon name="person" slot="start"></ion-icon>
              <ion-label>Students</ion-label>
            </ion-item>
            <ion-item href="/new" onClick={() => this.menuClose()}>
              <ion-icon name="settings" slot="start"></ion-icon>
              <ion-label>New</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon name="chatbubbles" slot="start"></ion-icon>
              <ion-label>Messages</ion-label>
            </ion-item>
            <ion-item>v.1.1</ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>,
      <div class="ion-page" id="main">
        <ion-header>
          <ion-toolbar color="dark">
            <ion-buttons slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title>StuMan</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-router useHash={false}>
            <ion-route url="/" component="app-home" />
            <ion-route url="/students" component="student-root" />
            <ion-route url="/new" component="student-new" />
            <ion-route url="/profile/:name" component="app-profile" />
          </ion-router>
          <ion-nav />
        </ion-content>,
        <menuController></menuController>
      </div>
    ];
  }
}
