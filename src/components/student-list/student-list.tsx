import { Component, h, Prop } from '@stencil/core';
import { StudentDisplay } from '../student-display/student-display';

@Component({
  tag: 'student-list',
  styleUrl: 'student-list.css',
  shadow: false
})

export class StudentList {

  @Prop() students: any = [];

  @Prop() filterFunc: Function;


  handleSelectChange(e): void {
    const filter = (e.target.value || 'A').split(' ').map(part => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(' ');
    this.filterFunc(filter);
  }

  render() {
    return [
      <ion-content class="ion-padding">
        <ion-searchbar animated debounce={500} onIonChange={(e) => this.handleSelectChange(e)}></ion-searchbar>
        <div class="main">
          <div class="row">
            <div class="small-12 columns text-center">
            {this.students
              .map(student => (
                <StudentDisplay student={student}></StudentDisplay>
              ))}
            </div>
          </div>
        </div>
      </ion-content>
    ];
  }

}
