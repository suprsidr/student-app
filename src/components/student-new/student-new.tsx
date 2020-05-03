import { Component, State, h, Prop } from '@stencil/core';

@Component({
  tag: 'student-new',
  styleUrl: 'student-new.css',
  shadow: true
})
export class StudentNew {

  date = new Date();

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
    dob: this.date,
    phone: '',
    cell: '',
    picture: {
      large: ''
    },
    gpa: '',
    major: '',
    registered: this.date,
    sid: '',
    modified: this.date,
    modifiedby: ''
  };

  @Prop() changeFunc: Function;

  @Prop() dismissFunc: Function;

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
    this.changeFunc({ action: 'saveStudent', args: { student: this.student } });
    this.dismissFunc();
  }

  render() {
    const student = this.student;
    return (
      <div class="form-container">
        <form>
          <ion-list>
            <ion-item>
              <ion-input placeholder="First Name" id="name.first" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.name.first}></ion-input>
            </ion-item>
            <ion-item>
              <ion-input placeholder="Last Name" id="name.last" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.name.last}></ion-input>
            </ion-item>
            <ion-item>
              <ion-label>DOB</ion-label>
              <ion-datetime id="dob" onIonChange={(e) => this.handleChange(e)} placeholder="Select Date"></ion-datetime>
            </ion-item>
            <ion-item>
              <ion-input placeholder="Street" id="location.street" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.location.street}></ion-input>
            </ion-item>
            <ion-item>
              <ion-input placeholder="City" id="location.city" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.location.city}></ion-input>
            </ion-item>
            <ion-item>
              <ion-input placeholder="State" id="location.state" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.location.state}></ion-input>
            </ion-item>
            <ion-item>
              <ion-input placeholder="Zip" id="location.postcode" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.location.postcode}></ion-input>
            </ion-item>
            <ion-item>
              <ion-input placeholder="Phone" type="tel" id="phone" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.phone}></ion-input>
            </ion-item>
            <ion-item>
              <ion-input placeholder="Cell" type="tel" id="cell" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.cell}></ion-input>
            </ion-item>
            <ion-item>
              <ion-input placeholder="Email" type="email" id="email" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.email}></ion-input>
            </ion-item>
            <ion-item>
              <ion-input placeholder="Image" id="picture.large" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.picture.large}></ion-input>
            </ion-item>
            <ion-item>
              <ion-input placeholder="Major" id="major" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.major}></ion-input>
            </ion-item>
            <ion-item>
              <ion-input placeholder="GPA" id="gpa" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.gpa}></ion-input>
            </ion-item>
          </ion-list>
        </form>
        <div class="button-container text-center">
          <ion-button onClick={() => this.dismissFunc()}>Cancel</ion-button>
          <ion-button style={{ '--background': '#10dc60' }} onClick={() => this.handleSave()}>Save</ion-button>
        </div>
      </div>
    );
  }

}
