type User = {
  id: number;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  gender: "male" | "female";
  contactNo: string;
  address: {
    division: string;
    city: string;
  };
};

const user1: User = {
  id: 123,
  name: {
    firstName: "Sanjit",
    middleName: "kumar",
    lastName: "sarkar",
  },
  gender: "male",
  contactNo: "107777555",
  address: {
    division: "Khulna",
    city: "Jashore",
  },
};

const user2: User = {
  id: 123,
  name: {
    firstName: "Sanjit",
    middleName: "kumar",
    lastName: "sarkar",
  },
  gender: "male",
  contactNo: "107777555",
  address: {
    division: "Khulna",
    city: "Jashore",
  },
};

//* function

type AddFunction = (num1: number, num2: number) => number;

const add: AddFunction = (num1, num2) => num1 + num2;
