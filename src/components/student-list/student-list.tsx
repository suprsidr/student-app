import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'student-list',
  styleUrl: 'student-list.css',
  shadow: false
})

export class StudentList {

  @Prop() students: Array<IStudent> = [];

  @State() studentList: Array<IStudent> = [];

  infiniteScroll: any;

  componentDidLoad():void {
    this.appendItems();
  }

  componentShouldUpdate(newValue):boolean {
    const { studentList } = this;
    newValue.forEach(stu => {
      for (var i in studentList) {
        if (studentList[i].sid === stu.sid) {
          studentList[i] = Object.assign({}, stu);
          break;
        }
      }
    });
    return true;
  }

  // TODO test for end of data
  async appendItems() {
    if (this.studentList.length < this.students.length) {
      // console.log('Loading data...');
      await this.wait(500);
      this.infiniteScroll.complete();
      this.studentList = [
        ...this.studentList,
        ...this.students.slice(this.studentList.length, this.studentList.length + 10)
      ];
      // console.log('Done');
    } else {
      // console.log('No More Data');
      this.infiniteScroll.disabled = true;
    }
  }

  wait(time: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  render() {
    return [
      <div class="main pt40">
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
