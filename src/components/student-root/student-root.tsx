import { Component, State, h, Listen } from '@stencil/core';
import { popoverController } from '@ionic/core';

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
    // console.log('Received the custom changeEvent event: ', event.detail);
    this.worker.postMessage(event.detail);
  }

  componentWillLoad(): void {
    this.worker.onmessage = ({ data: { students } }) => {
      // console.log(students.length);
      if (students.length === 0) this.failedSearch = true;
      this.students = students;
    };
    this.worker.postMessage({ action: 'fetchStudents', args: {} });
  }

  handleSearchChange({ target }): void {
    this.students = [];
    const filter = (target.value || 'A').split(' ').map((part: string) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(' ');
    this.failedSearch = false;
    this.worker.postMessage({ action: 'filterStudents', args: { filter } });
  }

  currentPopover!: any;

  async openPopover() {
    let popover = await popoverController.create({
      component: 'student-new',
      componentProps: { dismissFunc: this.dismissPopover.bind(this), changeFunc: this.changeFunc.bind(this) },
      cssClass: 'pop-student'
    });
    this.currentPopover = popover;
    return popover.present();
  }

  dismissPopover() {
    if (this.currentPopover) {
      this.currentPopover.dismiss().then(() => { this.currentPopover = null; });
    }
  }

  changeFunc(payload) {
    this.worker.postMessage(payload);
  }

  render() {
    return (
      <ion-content class="ion-padding">
        <ion-searchbar animated debounce={1500} onIonChange={(e) => this.handleSearchChange(e)} slot="fixed"></ion-searchbar>
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button onClick={() => this.openPopover()}>
            <ion-icon name="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>
        <ion-grid>
          {(this.students.length === 0 && !this.failedSearch) &&
          <ion-row>
            <ion-col>
              <div class="text-center pt40">
                <ion-spinner name="bubbles"></ion-spinner>
              </div>
            </ion-col>
          </ion-row>}
          {(this.students.length === 0 && this.failedSearch) &&
          <ion-row>
            <ion-col>
              <div class="text-center pt40">
                <h4>Sorry, No Results!</h4>
              </div>
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
