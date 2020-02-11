import { Component, State, h, Listen } from '@stencil/core';

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
  tag: 'student-root',
  styleUrl: 'student-root.css',
  shadow: true
})
export class StudentRoot {

  @State() students: Student[] = [];

  worker: Worker = new Worker('/assets/js/dedicated-worker.js');

  @Listen('changeEvent')
  changeEventHandler(event: CustomEvent) {
    console.log('Received the custom changeEvent event: ', event.detail);
    this.worker.postMessage(event.detail);
  }

  componentDidLoad(): void {
    this.worker.onmessage = ({ data }) => {
      console.log(data.students.length);
      this.students = data.students;
    };
    this.worker.postMessage({ action: 'fetchStudents', args: {} });
  }

  handleSelectChange({ target }): void {
    this.students = [];
    const filter = (target.value || 'A').split(' ').map(part => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(' ');
    this.worker.postMessage({ action: 'filterStudents', args: { filter } });
  }

  render() {
    return (
      <ion-content class="ion-padding">
        <ion-searchbar animated debounce={1500} onIonChange={(e) => this.handleSelectChange(e)}></ion-searchbar>
        {this.students.length === 0 &&
          <div class="text-center">
            <p>&nbsp;</p>
            <ion-spinner name="bubbles"></ion-spinner>
          </div>
        }
        <student-list students={this.students}></student-list>
      </ion-content>
    );
  }

}
