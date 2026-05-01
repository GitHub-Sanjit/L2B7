//* Object destructuring

//* Array desctruturing

const user = {
  id: 123,
  name: {
    firstName: "Sanjit",
    middleName: "Kumar",
    lastName: "Sarkar",
  },
  gender: "male",
  favoriteColor: "Black",
};

const { favoriteColor } = user;

const { middleName } = user.name;

const {
  name: { firstName },
} = user;
// console.log(favoriteColor, middleName, firstName);

const friends = ["A", "B", "C", "D", "E"];

const [, , c, ,] = friends;

console.log(c);
