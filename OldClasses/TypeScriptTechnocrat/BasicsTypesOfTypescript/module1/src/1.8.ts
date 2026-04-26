//* Destructuring

const user = {
  id: 345,
  name: {
    firstName: "saniit",
    middleName: "kumar",
    lastName: "sarkar",
  },
  contactNo: "0124586845",
  address: "Uganda",
};

const {
  contactNo,
  name: { middleName },
} = user;
// const { firstName } = user.name;
 
// Array Destructuring

const frineds = [ "a", "b", "c"]

const [,bestfrined] = frineds

bestfrined