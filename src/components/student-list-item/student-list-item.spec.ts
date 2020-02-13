import { StudentListItem } from './student-list-item';

describe('none-student-list-item', () => {
  it('builds', () => {
    expect(new StudentListItem()).toBeTruthy();
  });
});
