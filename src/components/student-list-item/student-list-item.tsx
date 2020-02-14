import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';
import { popoverController } from '@ionic/core';

@Component({
  tag: 'student-list-item',
  styleUrl: 'student-list-item.css',
  shadow: false
})
export class StudentListItem {

  @Prop() student: IStudent;

  @Event({
    eventName: 'changeEvent',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) changeEvent: EventEmitter;

  currentPopover!: any;

  async openPopover() {
    let popover = await popoverController.create({
      component: 'student-display',
      componentProps: { dismissFunc: this.dismissPopover.bind(this), student: this.student, emitterFunc: this.emitterFunc.bind(this) },
      cssClass: 'pop-student'
    });
    this.currentPopover = popover;
    return popover.present();
  }

  dismissPopover() {
    if (this.currentPopover) {
      this.currentPopover.dismiss().then(() => { this.currentPopover = null; });
    }
  }

  emitterFunc(payload) {
    this.changeEvent.emit(payload);
  }

  render() {
    const student = this.student;
    return (
      <ion-item onClick={() => this.openPopover()}>
        <ion-avatar slot="start">
          <ion-img src={`${student.picture.large}`} alt={`${student.name.first} ${student.name.last}`}></ion-img>
        </ion-avatar>
        <ion-label>
          <h2>{`${student.name.first} ${student.name.last}`}</h2>
          <p>{student.location.city}, {student.location.state}</p>
        </ion-label>
        <popoverController></popoverController>
      </ion-item>
    );
  }

}
