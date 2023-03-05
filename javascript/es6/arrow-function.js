/**
 * Arror function
 */

// no this
let group = {
  title: 'school',
  students: [
    { name: 'duke', age: 22 },
    { name: 'dome', age: 18 },
  ],

  // can use this
  showStudent() {
    this.students.forEach(student => console.log(`My name is ${student.name}, study at ${this.title}`));
  },

  // if use this in a common func, it'll cause error
  showStudentCommon() {
    this.students.forEach(function (student) {
      console.log('My name is ' + student.name + 'at' + this.title); // this is undefined
    });
  }
}

group.showStudent();
group.showStudentCommon();

/**
 * can't use `new`
 */
