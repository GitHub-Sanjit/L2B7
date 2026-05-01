//* function
//* arrow function, normal function

function add(num1: number, num2: number): number {
  return num1 + num2;
}

const add2 = (num1: number, num2: number): number => num1 + num2;

//* object -> funtion -> method

const poorUser = {
  name: "sanjit",
  balance: 0,
  addBalance(value: number) {
    const totalBalance = this.balance + value;
    return totalBalance;
  },
};

//* Callback function

const arr: number[] = [1, 4, 6];

const sqrArr = arr.map((elem: number): number => elem * elem);
