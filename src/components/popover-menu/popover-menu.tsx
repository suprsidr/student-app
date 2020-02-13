import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'popover-menu',
  styleUrl: 'popover-menu.css',
  shadow: true
})

export class PopoverMenu {

  @Prop() dismissFunc: Function;

  render() {
    return [
      <ion-list>
        <ion-list-header>Ionic</ion-list-header>
        <ion-item button>Learn Ionic</ion-item>
        <ion-item button>Documentation</ion-item>
        <ion-item button>Showcase</ion-item>
        <ion-item button>GitHub Repo</ion-item>
      </ion-list>,
      <ion-button onClick={() => this.dismissFunc()} expand="block">Close</ion-button>
    ]
  }
}