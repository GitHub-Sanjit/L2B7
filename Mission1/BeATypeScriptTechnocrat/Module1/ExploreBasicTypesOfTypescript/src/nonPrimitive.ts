//* Non Primitive Data --> Array, Object

//* TS --> tuple

let bazarList: string[] = ["eggs", "milk", "suger"];

let mixedArr: (string | number)[] = ["eggs", 12, "milk", 2, "sugar", 3];

let couple: [string, string] = ["Husband", "wife"];

//* reference type --> Object

const user: {
  organization: "Programming Hero";
  firstName: string;
  middleName?: string;
  lastName: string;
  isMarried: boolean;
} = {
  organization: "Programming Hero",
  firstName: "Sanjit",
  middleName: "Kumar",
  lastName: "Sarkar",
  isMarried: true,
};
