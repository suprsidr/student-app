import { Component, h, Prop, State } from '@stencil/core';
// import { StudentDisplay } from '../student-display/student-display';

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
  tag: 'student-list',
  styleUrl: 'student-list.css',
  shadow: false
})

export class StudentList {

  @Prop() students: Array<IStudent> = [];

  @State() studentList: Array<IStudent> = [];

  infiniteScroll: any;

  componentDidLoad(): void {
    this.appendItems();
  }

  async appendItems() {
    if (this.studentList.length < this.students.length) {
      console.log('Loading data...');
      await this.wait(500);
      this.infiniteScroll.complete();
      this.studentList = [
        ...this.studentList,
        ...this.students.slice(this.studentList.length, this.studentList.length + 10)
      ];
      console.log('Done');
    } else {
      console.log('No More Data');
      this.infiniteScroll.disabled = true;
    }
  }

  wait(time) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  render() {
    return [
      <div class="main">
        <ion-list class="ion-padding">
          {this.studentList
            .map(student => (
              <student-list-item student={student}></student-list-item>
            ))
          }
        </ion-list>
      </div>,
      <ion-infinite-scroll
        ref={(el) => this.infiniteScroll  = el as HTMLElement}
        threshold="100px"
        onIonInfinite={() => this.appendItems()}>
        <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Loading more data...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    ];
  }

}
