import { Component, State, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'student-new',
  styleUrl: 'student-new.css',
  shadow: true
})
export class StudentNew {

  @State() student: IStudent = {
    name: {
      first: '',
      last: ''
    },
    location: {
      street: '',
      city: '',
      state: '',
      postcode: ''
    },
    email: '',
    dob: '',
    phone: '',
    cell: '',
    picture: {
      large: ''
    },
    gpa: '',
    major: '',
    registered: 0,
    sid: '',
    modified: 0,
    modifiedby: ''
  };

  @Event({
    eventName: 'changeEvent',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) changeEvent: EventEmitter;

  handleChange({ target }) {
    // this is ugly
    const arr = target.id.split('.');
    if (arr.length === 1) {
      this.student[arr[0]] = target.value;
    } else {
      this.student[arr[0]][arr[1]] = target.value;
    }
  }

  handleSave() {
    console.log(this.student);
    this.changeEvent.emit({ action: 'saveStudent', args: { student: this.student } });
  }

  render() {
    const student = this.student;
    return (
      <div class="form-container">
        <form>
          <ion-item>
            <ion-label>First Name: </ion-label>
            <ion-input id="name.first" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.name.first}></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Last Name: </ion-label>
            <ion-input id="name.last" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.name.last}></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>DOB: </ion-label>
            <ion-input id="dob" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.dob}></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Street: </ion-label>
            <ion-input id="location.street" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.location.street}></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>City: </ion-label>
            <ion-input id="location.city" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.location.city}></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>State: </ion-label>
            <ion-input id="location.state" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.location.state}></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Zip: </ion-label>
            <ion-input id="location.postcode" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.location.postcode}></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Phone: </ion-label>
            <ion-input type="tel" id="phone" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.phone}></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Cell: </ion-label>
            <ion-input type="tel" id="cell" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.cell}></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Email: </ion-label>
            <ion-input type="email" id="email" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.email}></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Image: </ion-label>
            <ion-input id="picture.large" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.picture.large}></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Major: </ion-label>
            <ion-input id="major" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.major}></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>GPA: </ion-label>
            <ion-input id="gpa" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.gpa}></ion-input>
          </ion-item>
        </form>
        <div class="button-container text-center">
          <ion-button style={{ '--background': '#10dc60' }} onClick={() => this.handleSave()}>Save</ion-button>
        </div>
      </div>
    );
  }

}
