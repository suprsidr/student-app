import { Component, h, Prop } from '@stencil/core';
// import { StudentDisplay } from '../student-display/student-display';

@Component({
  tag: 'student-list',
  styleUrl: 'student-list.css',
  shadow: false
})

export class StudentList {

  @Prop() students: any = [];

  render() {
    return (
      <div class="main">
        <ion-list>
          {this.students
            .map(student => (
              <ion-list-item class="text-center">
                <student-display student={student}></student-display>
              </ion-list-item>
            ))
          }
        </ion-list>
      </div>
    );
  }

}
