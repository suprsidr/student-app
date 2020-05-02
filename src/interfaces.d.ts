declare namespace Student {
  type Name = {
    first: string,
    last: string
  }

  type Picture = {
    large: string
  }

  type Location = {
    street: string,
    city: string,
    state: string,
    postcode: string
  }
}

interface IStudent {
  name: Student.Name,
  dob: Date,
  picture: Student.Picture,
  location: Student.Location,
  phone: string,
  cell: string,
  email: string,
  registered: Date,
  major: string,
  gpa: string,
  sid: string,
  modified: Date,
  modifiedby: string
}