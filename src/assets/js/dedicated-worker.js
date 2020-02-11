let students = [];

self.onmessage = ({ data }) => {
  switch (data.action) {
    case 'fetchData':
      fetchData();
      break;
    case 'filterStudents':
      filterStudents(data.args.filter)
      break;
    default:
      // do nothing
      break;
  }
};

function fetchData() {
  fetch('https://suprsidr.com/students/%7B%7D/0/%7B%7D/%7B%22_id%22:0%7D')
    .then(resp => resp.json())
    .then((data) => {
      students = data.map(stu => {
        if (stu.sid === '2c0c044f-ee39-4114-a7e1-cc36c7a8c4ea') {
          stu.picture.large = '/assets/img/stuman.png'
        }
        return stu;
      });
      filterStudents('Annie Gregory');
    })
}

function filterStudents(filter) {
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