// const studentInfo = {
//   Alice: 80,
//   Bob: 75,
//   Charlie: 90,
// };

const student = new Map([
  ["Alice", 80],
  ["Bob", 75],
  ["Charlie", 90],
]);

for (let [name, score] of student) {
  console.log(`${name} : ${score}`);
}

// 2.  ===============================================

console.log(student.has("Alice"))

console.log("Bob :", student.get("Bob") + 5)

student.delete("Charlie")
console.log(student)


const user1 = { name: "Sanjit" };
const user2 = { name: "Rahim" };

const lognInMap = new Map()

lognInMap.set(user1, 5)
lognInMap.set(user2, 3)

console.log(lognInMap)

lognInMap.set(user1, lognInMap.get(user1) + 1)
console.log(lognInMap)

for(let key of lognInMap.keys()){
    key.name = "user: " + key.name
}

console.log(lognInMap)
