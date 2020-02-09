import { FunctionalComponent, h } from '@stencil/core';

type Name = {
  first: string,
  last: string
}

type Picture = {
  large: string
}

type Location = {
  street: string,
  city: string,
  state: string,
  postcode: string
}

type Student = {
  name: Name,
  dob: string,
  picture: Picture,
  location: Location,
  phone: string,
  cell: string,
  email: string,
  registered: number,
  major: string,
  gpa: string,
  sid: string,
  modified: number,
  modifiedby: string
}

interface StudentProps {
  student: Student;
}

export const StudentDisplay: FunctionalComponent<StudentProps> = ({ student }) =>  (
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
);
