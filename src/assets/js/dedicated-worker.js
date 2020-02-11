let students = [];
let previousSearch = 'A';

self.onmessage = ({ data }) => {
  switch (data.action) {
    case 'fetchStudents':
      fetchStudents();
      break;
    case 'filterStudents':
      filterStudents(data.args.filter)
      break;
    case 'deleteStudent':
      deleteStudent(data.args.student)
      break;
    case 'saveStudent':
      saveStudent(data.args.student)
      break;
    case 'updateStudent':
      updateStudent(data.args.student)
      break;
    default:
      // do nothing
      break;
  }
};

function deleteStudent(student) {
  students = students.filter(stu => stu.sid !== student.sid);
  filterStudents(previousSearch);
  // make call to api to actually remove
}

// New student
function saveStudent(student) {
  students.push(student);
  filterStudents(previousSearch);
  // make call to api to actually save
}

function updateStudent(student) {
  students = students.map((stu) => {
    if (stu.sid === student.sid) {
      return Object.assign(stu, student);
    }
    return stu;
  })
  filterStudents(previousSearch);
  // make call to api to actually update
}

function fetchStudents() {
  fetch('https://suprsidr.com/students/%7B%7D/0/%7B%7D/%7B%22_id%22:0%7D')
    .then(resp => resp.json())
    .then((data) => {
      students = data.map(stu => {
        if (stu.sid === '2c0c044f-ee39-4114-a7e1-cc36c7a8c4ea') {
          stu.picture.large = '/assets/img/stuman.png'
        }
        return stu;
      });
      filterStudents(previousSearch);
    })
}

function filterStudents(filter) {
  previousSearch = filter;
  if(filter.includes(':')) {
    const parts = filter.split(':');
    self.postMessage({
      students: students.filter((stu) => stu[parts[0].toLowerCase()].startsWith(parts[1].trim()))
    })
  } else {
    self.postMessage({
      students: students.filter(({ name: { first, last } }) => (`${first} ${last}`.startsWith(filter) || last.startsWith(filter)))
    })
  }
}