class Person {
  getSleep() {
    console.log(`I am a normal person. And I sleep for 8 hours`);
  }
}

class Student {
  getSleep() {
    console.log("I'm a student. I sleep for 7 hours");
  }
}

class NextLevelDevelooper {
  getSleep() {}
}

const getSleepingHours = (param: Person) => {
  param.getSleep();
};

class Shape {
  getArea(): number {
    return 0;
  }
}

class Circle extends Shape {
  //* area = pi * r * r

  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }
  getArea(): number {
    const rad = this.radius;
    return Math.PI * rad * rad;
  }
}

class Rectangle extends Shape {
  height: number;
  width: number;
  constructor(height: number, width: number) {
    super();
    this.height = height;
    this.width = width;
  }
  //* area = height * width
  getArea(): number {
    const h = this.height;
    const w = this.width;
    return h * w;
  }
}

const getArea = (param: Shape) => {
  console.log(param.getArea());
};

const shape1 = new Shape();
const shape2 = new Circle(10);
const shape3 = new Rectangle(20, 10);

getArea(shape1);
getArea(shape2);
getArea(shape3);

// const person1 = new Person();
// const student1 = new Student();
// const nextLevelDeveloper1 = new NextLevelDevelooper();

// getSleepingHours(person1);
// getSleepingHours(student1);
// getSleepingHours(nextLevelDeveloper1);
