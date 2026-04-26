// * Reference Type --> Object

type User = {
  readonly company: string; // type --> Literal Type
  firstName: string;
  lastName: string;
  middleName?: string; // Options Type
  isMarried: boolean;
};

const user: User = {
  company: "Programming Hero",
  firstName: "Sanjit",
  lastName: "Sarkar",
  isMarried: true,
  //   middleName: "Kumar",
};
