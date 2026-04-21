// const startTimie = performance.now();

// for (i = 1; i <= 500; i++) {
//   console.log(i);
// }

// const endTime = performance.now();

// console.log(`This code took ${endTime - startTimie} ms`);

console.time("task")

for (i = 1; i <= 500; i++) {
  console.log(i);
}

console.timeEnd("task")
