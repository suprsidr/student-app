import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'student-display',
  styleUrl: 'student-display.css',
  shadow: true
})

export class StudentDisplay {

  @Prop() student: IStudent;

  @Prop() dismissFunc: Function;

  @Prop() emitterFunc: Function;

  @State() editing: boolean = false;

  @State() tmpStudent: IStudent;

  componentWillLoad(): void {
    this.tmpStudent = Object.assign({}, this.student);
  }

  editClickHandler() {
    this.editing = !this.editing;
  }

  updateClickHandler() {
    this.editing = !this.editing;
    this.emitterFunc({ action: 'updateStudent', args: { student: this.tmpStudent }});
  }

  deleteClickHandler() {
    this.editing = !this.editing;
    this.emitterFunc({ action: 'deleteStudent', args: { student: this.tmpStudent } });
    this.dismissFunc();
  }

  handleChange({ target }) {
    // this is ugly
    const arr = target.id.split('.');
    if (arr.length === 1) {
      this.tmpStudent[arr[0]] = target.value;
    } else {
      this.tmpStudent[arr[0]][arr[1]] = target.value;
    }
  }

  render() {
    const student = this.tmpStudent;
    if(!student) return (
      <div class="text-center">
        <p>&nbsp;</p>
        <ion-spinner name="bubbles"></ion-spinner>
      </div>
    )
    return (
      <div>
        <header class="text-center">
          <student-img cssClass="student-image-large" src={`${student.picture.large}`} alt={`${student.name.first} ${student.name.last}`}></student-img>
          <h2>{`${student.name.first} ${student.name.last}`}</h2>
        </header>
        <div class="content">
          <div class="student-container text-center">
          {!this.editing &&
            <div>
              <p>{student.location.street}<br />{student.location.city}, {student.location.state} {student.location.postcode}</p>
              <p>Phone: {student.phone} <br class="show-for-small-only" /> Cell: {student.cell}</p>
              <p>Email: {student.email}</p>
              <p>Major: {student.major}</p>
              <p>GPA: {student.gpa}</p>
              <p>DOB: {`${student.dob.toLocaleDateString()}`}</p>
              <p>{`Registered: ${student.registered.toLocaleDateString()}`}</p>
              <p>Last updated: <span class="grey-text">{student.modified.toUTCString()}</span></p>
              <p>Modified by: <span class="grey-text">{student.modifiedby}</span></p>
              <p>ID: <span class="grey-text">{student.sid}</span></p>
              <div class="button-container">
                <ion-button onClick={() => this.editClickHandler()}>Edit</ion-button>
                <ion-button onClick={() => this.dismissFunc()}>Close</ion-button>
              </div>
            </div>
          }
          {this.editing &&
            <div>
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
                <input id="sid" type="hidden" value={student.sid} />
              </form>
            </div>
          }
          </div>
          <div class="button-container text-center">
            {this.editing && [
              <ion-button onClick={() => this.editClickHandler()}>Cancel</ion-button>,
              <ion-button style={{ '--background': '#10dc60' }} disabled={!this.editing} onClick={() => this.updateClickHandler()}>Save</ion-button>,
              <ion-button style={{ '--background': '#f04141' }} disabled={!this.editing} onClick={() => this.deleteClickHandler()}>Delete</ion-button>]
            }
          </div>
        </div>
      </div>
    )
  }
};
