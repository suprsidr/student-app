import { Component, h, Prop } from '@stencil/core';
import { StudentDisplay } from '../student-display/student-display';

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
        <div class="row">
          <div class="small-12 columns text-center">
            {this.students
              .map(student => (
                <StudentDisplay student={student}></StudentDisplay>
              ))
            }
          </div>
        </div>
      </div>
    );
  }

}
