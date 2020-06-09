import { Component, State, h, Prop } from '@stencil/core';
import { popoverController } from '@ionic/core';

@Component({
  tag: 'student-new',
  styleUrl: 'student-new.css',
  shadow: true
})
export class StudentNew {

  @Prop() worker: Worker;

  router: HTMLIonRouterElement = document.querySelector('ion-router');

  date = new Date();

  tmpStudent: IStudent = {
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
      large: '/assets/img/user.png'
    },
    gpa: '',
    major: '',
    registered: this.date,
    sid: '',
    modified: this.date,
    modifiedby: ''
  };

  @State() student: IStudent = Object.assign({}, this.tmpStudent);

  currentPopover!: HTMLIonPopoverElement;

  async openPopover() {
    let popover = await popoverController.create({
      component: 'camera-root',
      componentProps: { dismissFunc: this.dismissPopover.bind(this), student: this.student, emitterFunc: this.handlePopoverData.bind(this) },
      cssClass: 'pop-student'
    });
    this.currentPopover = popover;
    return popover.present();
  }

  resetStudent() {
    this.student = this.tmpStudent;
  }

  dismissPopover() {
    if (this.currentPopover) {
      this.currentPopover.dismiss().then(() => { this.currentPopover = null; });
    }
  }

  handlePopoverData(student):void {
    this.student = Object.assign({}, this.student, student);
    this.dismissPopover();
  }

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
    this.worker.postMessage({ action: 'saveStudent', args: { student: this.student } });
    this.goBack();
  }

  goBack(): void {
    this.resetStudent();
    this.router.back();
  }

  render() {
    const student = this.student;
    return (
      <div class="form-container">
        <header class="text-center">
          <student-img onClick={() => this.openPopover()} cssClass="student-image-large" src={`${student.picture.large}`} alt={`${student.name.first} ${student.name.last}`}></student-img>
        </header>
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
            {/* <ion-item>
              <ion-input placeholder="Cell" type="tel" id="cell" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.cell}></ion-input>
            </ion-item> */}
            <ion-item>
              <ion-input placeholder="Email" type="email" id="email" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.email}></ion-input>
            </ion-item>
            {/* <ion-item>
              <ion-input placeholder="Image" id="picture.large" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.picture.large}></ion-input>
            </ion-item> */}
            <ion-item>
              <ion-input placeholder="Major" id="major" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.major}></ion-input>
            </ion-item>
            <ion-item>
              <ion-input placeholder="GPA" id="gpa" debounce={300} onIonChange={(e) => this.handleChange(e)} value={student.gpa}></ion-input>
            </ion-item>
          </ion-list>
        </form>
        <div class="button-container text-center">
          <ion-button onClick={() => this.goBack()}>Cancel</ion-button>
          <ion-button style={{ '--background': '#10dc60' }} onClick={() => this.handleSave()}>Save</ion-button>
        </div>
      </div>
    );
  }

}
