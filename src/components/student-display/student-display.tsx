import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'student-display',
  styleUrl: 'student-display.css',
  shadow: false
})

export class StudentDisplay {

  @Prop() student: any;

  render() {
    const student = this.student;
    return (
      <ion-card>
        <ion-card-header>
          <img class="student-image-large" src={`${student.picture.large}`} alt={`${student.name.last} ${student.name.first}`} />
          <ion-card-title>{`${student.name.first} ${student.name.last}`}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <p>{student.location.street}<br />{student.location.city}, {student.location.state} {student.location.postcode}</p>
          <p>Phone: {student.phone} <br class="show-for-small-only" /> Cell: {student.cell}</p>
          <p>Email: {student.email}</p>
          <p>Major: {student.major}</p>
          <p>GPA: {student.gpa}</p>
          <p>DOB: {`${new Date(student.dob).toLocaleDateString()}`}</p>
          <p>{`Registered: ${new Date(student.registered).toLocaleDateString()}`}</p>
          <p>&nbsp;</p>
          <p>Last updated: <span class="grey-text">{new Date(student.modified).toUTCString()}</span></p>
          <p>Modified by: <span class="grey-text">{student.modifiedby}</span></p>
          <p>ID: <span class="grey-text">{student.sid}</span></p>
        </ion-card-content>
      </ion-card>
    )
  }
};
