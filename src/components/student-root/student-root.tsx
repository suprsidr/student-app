import { Component, State, Prop, h } from '@stencil/core';

@Component({
  tag: 'student-root',
  styleUrl: 'student-root.css',
  shadow: true
})
export class StudentRoot {

  @State() students: Array<IStudent> = [];

  @State() failedSearch: boolean = false;

  @Prop() worker: Worker;

  router: HTMLIonRouterElement = document.querySelector('ion-router');

  componentWillLoad(): void {
    const { handleMessage } = this;
    this.worker.addEventListener('message', handleMessage.bind(this), false);
    this.worker.postMessage({ action: 'fetchStudents', args: {} });
  }

  handleMessage({ data }): void {
    if (data.type === 'allStudents') {
      if (data.students.length === 0) this.failedSearch = true;
      this.students = data.students;
    }
  }

  disconnectedCallback() {
    const { handleMessage } = this;
    this.worker.removeEventListener('message', handleMessage);
  }

  handleSearchChange({ target }): void {
    this.students = [];
    const filter = (target.value || 'A').split(' ').map((part: string) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(' ');
    this.failedSearch = false;
    this.worker.postMessage({ action: 'filterStudents', args: { filter } });
  }


  navigateToNew() {
    this.router.push(`/new`);
  }

  changeFunc(payload) {
    this.worker.postMessage(payload);
  }

  render() {
    return (
      <ion-content class="ion-padding">
        <ion-searchbar animated debounce={1500} onIonChange={(e) => this.handleSearchChange(e)} slot="fixed"></ion-searchbar>
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button onClick={() => this.navigateToNew()}>
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
