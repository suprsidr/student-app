import { Component, State, h, Listen } from '@stencil/core';

// type Name = {
//   first: string,
//   last: string
// }

// type Picture = {
//   large: string
// }

// type Location = {
//   street: string,
//   city: string,
//   state: string,
//   postcode: string
// }

// type Student = {
//   name: Name,
//   dob: string,
//   picture: Picture,
//   location: Location,
//   phone: string,
//   cell: string,
//   email: string,
//   registered: number,
//   major: string,
//   gpa: string,
//   sid: string,
//   modified: number,
//   modifiedby: string
// }

@Component({
  tag: 'student-root',
  styleUrl: 'student-root.css',
  shadow: true
})
export class StudentRoot {

  @State() students: Array<IStudent> = [];

  @State() failedSearch: boolean = false;

  worker: Worker = new Worker('/assets/js/dedicated-worker.js');

  @Listen('changeEvent')
  changeEventHandler(event: CustomEvent) {
    this.students = [];
    this.failedSearch = false;
    console.log('Received the custom changeEvent event: ', event.detail);
    this.worker.postMessage(event.detail);
  }

  componentWillLoad(): void {
    this.worker.onmessage = ({ data }) => {
      console.log(data.students.length);
      if (data.students.length === 0) this.failedSearch = true;
      this.students = data.students;
    };
    this.worker.postMessage({ action: 'fetchStudents', args: {} });
  }

  handleSearchChange({ target }): void {
    this.students = [];
    const filter = (target.value || 'A').split(' ').map(part => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(' ');
    this.failedSearch = false;
    this.worker.postMessage({ action: 'filterStudents', args: { filter } });
  }

  render() {
    return (
      <ion-content class="ion-padding">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-searchbar animated debounce={1500} onIonChange={(e) => this.handleSearchChange(e)}></ion-searchbar>
            </ion-col>
          </ion-row>
          {(this.students.length === 0 && !this.failedSearch) &&
          <ion-row>
            <ion-col class="text-center">
              <ion-spinner name="bubbles"></ion-spinner>
            </ion-col>
          </ion-row>}
          {(this.students.length === 0 && this.failedSearch) &&
            <ion-row>
            <ion-col class="text-center">
                <h4>Sorry, No Results!</h4>
              </ion-col>
            </ion-row>}
          <ion-row>
            <ion-col>
              <student-list students={this.students}></student-list>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    );
  }

}
