//* type Assertion

let anyThing: any;

anyThing = "222";

anyThing as string;

const kgToGMConverter = (
  input: string | number,
): string | number | undefined => {
  if (typeof input === "number") {
    return input * 1000;
  } else if (typeof input === "string") {
    const [value] = input.split(" ");
    return `Converted Output is : ${Number(value) * 1000}`;
  }
};

const result1 = kgToGMConverter(2) as number; //* type Assertion
result1;
const result2 = kgToGMConverter("2 kg") as string; //* type Assertion
result2;
console.log(result1, result2);

type CustomeError = {
  message: string;
};

try {
} catch (error) {
  console.log((error as CustomeError).message);
}
