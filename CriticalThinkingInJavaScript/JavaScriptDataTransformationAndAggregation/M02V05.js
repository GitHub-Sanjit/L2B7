// // Count subtotal

// const cartItems = [
//   { id: "p-001", name: "Daraz Laptop Bag", price: 1500, quantity: 1 },
//   { id: "p-002", name: "Walton USB-C Cable", price: 350, quantity: 2 },
//   { id: "p-003", name: "Aarong Kurta", price: 2200, quantity: 1 },
// ];

// const subtotal = cartItems.reduce((subtotal, product) => {
//   //   console.log(subtotal, product);
//   return subtotal + product.price * product.quantity;
// }, 0);

// // console.log(subtotal);

// // Find best scorer

// const players = [
//   { name: "Jamal Bhuyan", score: 88 },
//   { name: "Shekh Morsalin", score: 81 },
//   { name: "Rakib Hossain", score: 95 },
//   { name: "Topu Barman", score: 91 },
//   { name: "Sohel Rana", score: 72 },
// ];

// const bestScorer = players.reduce((bestPlayer, player) => {
//   console.log(bestPlayer, player);
//   if (bestPlayer.score > player.score) {
//     return bestPlayer;
//   }

//   return player;
// }, players[0]);

// console.log(bestScorer);

const cartItems = [
  { id: "p-001", name: "Daraz Laptop Bag", price: 1500, quantity: 1 },
  { id: "p-002", name: "Walton USB-C Cable", price: 350, quantity: 2 },
  { id: "p-003", name: "Aarong Kurta", price: 2200, quantity: 1 },
];

const subtotal = cartItems.reduce((subtotal, product) => {
//   console.log(subtotal, product);
  return subtotal + product.price * product.quantity;
}, 0);

// console.log(subtotal);

const players = [
  { name: "Jamal Bhuyan", score: 88 },
  { name: "Shekh Morsalin", score: 81 },
  { name: "Rakib Hossain", score: 95 },
  { name: "Topu Barman", score: 91 },
  { name: "Sohel Rana", score: 72 },
];

const bestScorrer = players.reduceRight((bestPlayer, player) => {
    // console.log(bestPlayer, player)
  if (bestPlayer.score > player.score) {
    return bestPlayer;
  }

  return player;
}, players[0]);

// console.log(bestScorrer);


/////////////////////////////////

const array = [15, 16, 17, 18, 19];

function reducer(accumulator, currentValue, index) {
  const returns = accumulator + currentValue;
  console.log(
    `accumulator: ${accumulator}, currentValue: ${currentValue}, index: ${index}, returns: ${returns}`,
  );
  return returns;
}

array.reduce(reducer);