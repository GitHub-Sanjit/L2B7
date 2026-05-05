class Parent {
  name: string;
  age: number;
  address: string;

  constructor(name: string, age: number, address: string) {
    this.name = name;
    this.age = age;
    this.address = address;
  }

  getSleep(numOfHours: number) {
    console.log(`${this.name} sleeps ${numOfHours} hours every day`);
  }
}

class Student extends Parent {
  rollNo: number;
  constructor(name: string, age: number, address: string, rollNo: number) {
    super(name, age, address);

    this.rollNo = rollNo;
  }
}

class Teacher extends Parent {
  designation: string;

  constructor(name: string, age: number, address: string, designation: string) {
    super(name, age, address);
    this.designation = designation;
  }

  getSleep(numOfHours: number) {
    console.log(`${this.name} sleeps ${numOfHours} hours every day`);
  }

  takeClass(clasHours: number) {
    console.log(`${this.name} ${clasHours} hours class nen`);
  }
}

const student1 = new Student("sanjit", 30, "Bangladesh", 78);
const teacher1 = new Teacher("Sanjit", 35, "Bangladesh", "Math Teacher");
student1.getSleep(15);
teacher1.takeClass(5);
