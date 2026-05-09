//* 1 ====================================================
const filterEvenNumbers = (numsArray: number[]): number[] => {
  const result = numsArray.filter((num) => num % 2 === 0);
  return result;
};

// console.log(filterEvenNumbers([1, 2, 3, 4, 5, 6]));
//* 2 =====================================================

const reverseString = (str: string): string => {
  let reverseStr = "";
  const lastChar = str.length - 1;

  for (let i = lastChar; i >= 0; i--) {
    reverseStr = reverseStr + str[i];
  }
  return reverseStr;
};
// console.log(reverseString("typescript"))

//* 3 =========================================================

type StringOrNumber = string | number;

function checkType(val: StringOrNumber): string {
  if (typeof val === "string") {
    return "String";
  } else {
    return "Number";
  }
}
console.log(checkType("Hello"));
console.log(checkType(42));

//* 7 =====================================================

function getIntersection(arr1: number[], arr2: number[]): number[] {
  const set2 = new Set(arr2);
  return arr1.filter(num => set2.has(num));
}
