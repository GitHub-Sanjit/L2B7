//* Generic Function

// const createArrayWithString = (value: string) => [value];

// const createArrayWithNumber = (value: number) => [value];

// const createArrayWithUserObject = (value: { id: number; name: string }) => {
//   return [value];
// };

const createArrayWithGeneric = <T>(value: T) => {
  return [value];
};

const arrString = createArrayWithGeneric("Apple");
const arrNumber = createArrayWithGeneric(222);
const arrObj = createArrayWithGeneric({
  id: 123,
  name: "sanjit",
});

const createArrayWithTuple = (param1: number, parma2: number) => [
  param1,
  parma2,
];

const createArrayTupleWithGeneric = <X, Y>(param1: X, param2: Y) => [
  param1,
  param2,
];

const res1 = createArrayTupleWithGeneric(222, "sanjit");
const res2 = createArrayTupleWithGeneric(222, { id: 1, name: "sanjit" });

const addStudentToCourse = <T>(stuedntInfo: T) => {
  return {
    course: "Next Level",
    ...stuedntInfo,
  };
};

const student1 = {
  id: 23,
  name: "B",
  hasPen: true,
};

const student2 = {
  id: 27,
  name: "C",
  hasPen: false,
  isGood: true,
};

console.log(addStudentToCourse(student1));
console.log(addStudentToCourse(student2));
