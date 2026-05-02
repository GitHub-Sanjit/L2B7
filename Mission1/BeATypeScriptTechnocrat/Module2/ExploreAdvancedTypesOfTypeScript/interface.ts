type User = {
  name: string;
  age: number;
};

// Interface = Object type Data type | array, Object, function
interface IUser {
  name: string;
  age: number;
}

type Role = {
  role: "admin" | "user";
};

type UserWithRole = User & Role;

interface IUserWithRole extends IUser {
  role: "admin" | "user";
}

const user1: UserWithRole = {
  name: "Sanjit",
  age: 30,
  role: "admin",
};

const user2: IUser = {
  name: "Sanjit",
  age: 45,
};

type IsAdmin = boolean;

type Add = (num1: number, num2: number) => number;

interface IAdd {
  (num1: number, num2: number): number;
}

const add: IAdd = (num1, num2) => num1 + num2;

type Friends = string[];

interface IFriends {
  [index: number]: string;
}

const frineds: IFriends = ["A", "B", "C", "D"];
