import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'student-list-item',
  styleUrl: 'student-list-item.css',
  shadow: false
})
export class StudentListItem {

  @Prop() student: IStudent;

  popoverController!: any;

  currentPopover!: any;

  async openPopover() {
    let popover = await this.popoverController.create({
      component: 'student-display',
      componentProps: { dismissFunc: this.dismissPopover.bind(this), student: this.student },
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
        <ion-popover-controller ref={(el) => this.popoverController = el as HTMLElement}></ion-popover-controller>
      </ion-item>
    );
  }

}
