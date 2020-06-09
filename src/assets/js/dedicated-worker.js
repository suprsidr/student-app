let students = [];
let previousSearch = 'A';
const GQL_API_URL = 'https://oomw6u5enh.execute-api.us-east-1.amazonaws.com/dev/graphql';

self.onmessage = ({ data }) => {
  switch (data.action) {
    case 'fetchStudent':
      fetchStudent(data.args.student.sid);
      break;
    case 'fetchStudents':
      fetchStudents();
      break;
    case 'filterStudents':
      _filterStudents(data.args.filter)
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
  const original = student;
  // optomistic delete
  students = students.filter(stu => stu.sid !== student.sid);
  _filterStudents(previousSearch);
  const deleteStudentMutation = `
  mutation {
    deleteStudent(input:{
      sid: "${student.sid}"
    }){
      ok
      deletedCount
    }
  }`;

  fetch(`${GQL_API_URL}?`, _getOptions(deleteStudentMutation))
    .then(res => res.json())
    .then(res => console.log(res)) // we already did the optomistic update
    .catch(err => {
      // roll back
      students.push(original);
      _filterStudents(previousSearch);
    });

}

// New student
function saveStudent(student) {
  const addStudentMutation = `
  mutation {
    addStudent(input:{
      name: {
        first: "${student.name.first}"
        last: "${student.name.last}"
      }
      location: {
        street: "${student.location.street}"
        city: "${student.location.city}"
        state: "${student.location.state}"
        postcode: "${student.location.postcode}"
      }
      email: "${student.email}"
      phone: "${student.phone}"
      cell: "${student.cell}"
      picture: {
        large: "${student.picture.large}"
      }
      gpa: "${student.gpa}"
      major: "${student.major}"
      dob: ${new Date(student.dob).getTime()}
      modifiedby: "Student Admin"
    }) {
      name {
        first
        last
      }
      location {
        street
        city
        state
        postcode
      }
      picture {
        large
      }
      dob
      phone
      cell
      email
      registered
      major
      gpa
      modified
      modifiedby
      sid
    }
  }`;

  fetch(`${GQL_API_URL}?`, _getOptions(addStudentMutation))
    .then(res => res.json())
    .then(({ data: { addStudent } }) => {
      const newStudent = addStudent;
      newStudent.dob = new Date(newStudent.dob);
      newStudent.registered = new Date(newStudent.registered);
      newStudent.modified = new Date(newStudent.modified);
      students.push(newStudent);
      _filterStudents(previousSearch);
    });
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
  _filterStudents(previousSearch);
  self.postMessage({
    type: 'updateStudent',
    student: students.find(s => s.sid === student.sid)
  })

  const updateStudentMutation = `
  mutation {
    updateStudent(input:{
      sid: "${student.sid}",
      name: {
        first: "${student.name.first}"
        last: "${student.name.last}"
      }
      location: {
        street: "${student.location.street}"
        city: "${student.location.city}"
        state: "${student.location.state}"
        postcode: "${student.location.postcode}"
      }
      email: "${student.email}"
      phone: "${student.phone}"
      cell: "${student.cell}"
      picture: {
        large: "${student.picture.large}"
      }
      gpa: "${student.gpa}"
      major: "${student.major}"
      dob: ${new Date(student.dob).getTime()}
      modifiedby: "${student.modifiedby}"
    }) {
      name {
        first
        last
      }
      location {
        street
        city
        state
        postcode
      }
      picture {
        large
      }
      dob
      phone
      cell
      email
      registered
      major
      gpa
      modified
      modifiedby
      sid
    }
  }`;

  fetch(`${GQL_API_URL}?`, _getOptions(updateStudentMutation))
    .then(res => res.json())
    .then(({ data: { updateStudent }}) => console.log(updateStudent)) // we already did the optomistic update
    .catch(err => {
      // roll back
      students = students.map((stu) => {
        if (stu.sid === original.sid) {
          return Object.assign(stu, original);
        }
        return stu;
      })
      _filterStudents(previousSearch);
    });
}

function fetchStudents() {
  if (students.length > 0) {
    _filterStudents(previousSearch);
    return;
  }
  const allStudentsQuery =
    `{
      allStudents {
        name {
          first
          last
        }
        dob
        picture {
          large
        }
        location {
          street
          city
          state
          postcode
        }
        phone
        cell
        email
        major
        gpa
        sid
        registered
        modified
        modifiedby
      }
    }`;

  fetch(`${GQL_API_URL}?`, _getOptions(allStudentsQuery))
    .then(res => res.json())
    .then(({ data }) => {
      students = data.allStudents.map(stu => {
        stu.dob = new Date(stu.dob);
        stu.registered = new Date(stu.registered);
        stu.modified = new Date(stu.modified);
        return stu;
      });
      _filterStudents(previousSearch);
    });
}

function fetchStudent(sid) {
  if (students.length > 0) {
    const student = students.find(s => s.sid === sid);
    if (student) self.postMessage({
      type: 'fetchStudent',
      student
    })
    return;
  }
  const studentQuery =
    `{
      student(sid: "${sid}") {
        name {
          first
          last
        }
        dob
        picture {
          large
        }
        location {
          street
          city
          state
          postcode
        }
        phone
        cell
        email
        major
        gpa
        sid
        registered
        modified
        modifiedby
      }
    }`;

  fetch(`${GQL_API_URL}?`, _getOptions(studentQuery))
    .then(res => res.json())
    .then(({ data }) => {
      stu = data.student;
      stu.dob = new Date(stu.dob);
      stu.registered = new Date(stu.registered);
      stu.modified = new Date(stu.modified);
      self.postMessage({
        type: 'fetchStudent',
        student: stu
      })
    });
}

function _getOptions(query) {
  return {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query
    })
  };
}

function _filterStudents(filter) {
  previousSearch = filter;
  if(filter.includes(':')) {
    const parts = filter.split(':');
    self.postMessage({
      type: 'allStudents',
      students: students.filter((stu) => stu[parts[0].toLowerCase()].startsWith(parts[1].trim()))
    })
  } else {
    self.postMessage({
      type: 'allStudents',
      students: students.filter(({ name: { first, last } }) => (`${first} ${last}`.startsWith(filter) || last.startsWith(filter)))
    })
  }
}