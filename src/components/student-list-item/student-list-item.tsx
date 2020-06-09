import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'student-list-item',
  styleUrl: 'student-list-item.css',
  shadow: false
})
export class StudentListItem {

  @Prop() student: IStudent;

  router: HTMLIonRouterElement = document.querySelector('ion-router');

  itemClick() {
    this.router.push(`/student/${this.student.sid}`);
  }

  render() {
    const student = this.student;
    return (
      <ion-item onClick={() => this.itemClick()}>
        <ion-avatar slot="start">
          <ion-img src={`${student.picture.large}`} alt={`${student.name.first} ${student.name.last}`}></ion-img>
        </ion-avatar>
        <ion-label>
          <h2>{`${student.name.first} ${student.name.last}`}</h2>
          <p>{student.location.city}, {student.location.state}</p>
        </ion-label>
      </ion-item>
    );
  }

}
