//* Stateless vs Stateful

//* In JavaScript functon are stateless because function are unable to store data. On the Other hand
//* Object are stateful because Object are able to store data

// const counter = (amount) => {
//   let count = 0;

//   count = count + amount;

//   return count;
// };

// console.log(counter(3));
// console.log(counter(2));

const counter = {
  count: 0,

  add(amount) {
    this.count = this.count + amount;
  },

  print() {
    console.log(this.count);
  },
};

counter.add(2);
counter.add(3);

counter.print();
