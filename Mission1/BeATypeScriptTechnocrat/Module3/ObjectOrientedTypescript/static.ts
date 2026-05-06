class Counter {
  static count: number = 0;

  static increment() {
    return (Counter.count = Counter.count + 1);
  }

  static decrement() {
    return (Counter.count = Counter.count - 1);
  }
}

console.log(Counter.increment());
console.log(Counter.increment());
console.log(Counter.increment());
console.log(Counter.increment());
// const instance1 = new Counter();
// console.log(instance1.increment());
// console.log(instance1.increment());
// console.log(instance1.increment());

// const instance2 = new Counter();
// console.log(instance2.increment());
// console.log(instance2.increment());

// const instance3 = new Counter();
// console.log(instance3.increment());
// console.log(instance3.increment());
// console.log(instance3.increment());
