//* Learning Function

// Normal Function
// Arrow Function

function add(num1: number, num2: number): number {
  return num1 + num2;
}

add(4, 6);

const addArrow = (num1: number, num2: number): number => num1 + num2;

//* Object --> function --> Method

const poorUser = {
  name: "sanjit",
  balance: 0,
  addBalance(balance: number): string {
    return ` My new balance is : ${balance + this.balance}`;
  },
};

const arr: number[] = [1, 2, 3, 4];

const newArr: number[] = arr.map((elem: number): number => elem * elem);
