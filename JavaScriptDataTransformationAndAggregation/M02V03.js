// Sort

const numbers = [40, 100, 1, 5, 25, 10];
const fruits = ["Banana", "apple", "Cherry", "date"];

const sortedNumber = numbers.sort((a, b) => a - b);

fruits.sort((a, b) => b.localeCompare(a));
// console.log(fruits);
// console.log(sortedNumber);

fruits.sort((a, b) => a.localeCompare(b));

// Nested array flat

// const arr = [1, 2, 3, [4, 5, [6, 7, [8, 9, [10, 11]]]]];

// const flatArr = arr.flat(Infinity);

// console.log(flatArr);

const tagsFromPosts = [
  ["javascript", "react", "css"],
  ["node", "express"],
  ["css", "html", "react"],
];

const filterTags = [...new Set(tagsFromPosts.flat())];

// console.log(filterTags);

const num = [1, 2, 3, 4, [5, 6, 7, [8, 9, [1, 2, 3]]]];
const flatArray = num.flat(Infinity);

// console.log(flatArray);

const filteredTags = new Set(...tagsFromPosts.flat())

console.log(filterTags)
