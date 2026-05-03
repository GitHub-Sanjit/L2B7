//* dynamically generalize : Generic

// const friends: string[] = ["A", "B", "C"];

type GenericArray<T> = Array<T>;

const friends: GenericArray<string> = ["A", "B", "C"];

// const rollNumbers: number[] = [4, 7, 12];
const rollNumbers: GenericArray<number> = [4, 7, 12];

// const isEligibleList: boolean[] = [true, false, true];
const isEligibleList: GenericArray<boolean> = [true, false, true];

type TUser = { name: string; age: number };

const userList: GenericArray<TUser> = [
  {
    name: "X",
    age: 24,
  },
  {
    name: "Y",
    age: 25,
  },
  {
    name: "Z",
    age: 45,
  },
];

type Coordinates<X, Y> = [X, Y];

const coordinates1: Coordinates<number, number> = [20, 30];
const coordinates2: Coordinates<string, string> = ["20", "30"];
