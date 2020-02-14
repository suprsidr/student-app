let students = [];
let previousSearch = 'A';
const API_URL = 'https://suprsidr.com/students';

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
  fetch(`${API_URL}/delete/${JSON.stringify({ sid: student.sid })}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => console.log(res));
}

// New student
function saveStudent(student) {
  students.push(student);
  filterStudents(previousSearch);
  // make call to api to actually save
  fetch(`${API_URL}/insert/${JSON.stringify({ admin: 'Stencil App', student })}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    // credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => console.log(res));
}

function updateStudent(student) {
  const original = Object.assign({}, student);
  // optomistic update
  students = students.map((stu) => {
    if (stu.sid === student.sid) {
      return Object.assign(stu, student);
    }
    return stu;
  })
  filterStudents(previousSearch);
  // make call to api to actually update
  fetch(`${API_URL}/update/${JSON.stringify({ admin: 'Stencil App', student })}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    // credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => console.log(res))
    .catch(err => {
      // roll back
      students = students.map((stu) => {
        if (stu.sid === original.sid) {
          return Object.assign(stu, original);
        }
        return stu;
      })
      filterStudents(previousSearch);
    });
}

function fetchStudents() {
  fetch(`${API_URL}/%7B%7D/0/%7B%7D/%7B%22_id%22:0%7D`)
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