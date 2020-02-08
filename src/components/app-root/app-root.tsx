import { Component, h, State } from '@stencil/core';

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

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  @State() students: Student[] = [];

  worker: Worker = new Worker('/assets/js/dedicated-worker.js');

  componentDidLoad(): void {
    this.worker.onmessage = ({ data }) => {
      console.log(data);
      this.students = data.students;
    };
    this.worker.postMessage({ action: 'fetchData', args: {} });
  }

  filterFunc(filter) {
    console.log(filter);
    this.worker.postMessage({ action: 'filterStudents', args: { filter } });
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/students" component="student-list" componentProps={{ 'students': this.students, 'filterFunc': this.filterFunc.bind(this) }} />
          <ion-route url="/profile/:name" component="app-profile" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
