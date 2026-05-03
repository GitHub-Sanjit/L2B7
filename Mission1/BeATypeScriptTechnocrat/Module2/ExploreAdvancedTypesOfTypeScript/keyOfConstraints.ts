//* keyof Operator --> type operator

type RichPeopleVehicle = {
  car: string;
  bike: string;
  cng: string;
};

type MyVehicle1 = "bike" | "car" | "cng";
type MyVehicle2 = keyof RichPeopleVehicle;

const myVehicle1: MyVehicle1 = "bike";
const myVehicle2: MyVehicle2 = "car";

type User = {
  id: number;
  name: string;
  address: {
    city: string;
  };
};

const user: User = {
  id: 234,
  name: "A",
  address: {
    city: "jashore",
  },
};

// const myId = user.id;
// const myId2 = user["id"];
// const myName = user["name"];
// const address = user["address"];

// console.log({ myId, myId2, myName, address });

const getPropertyFromObj = <X>(obj: X, key: keyof X) => {
  return obj[key];
};

const result = getPropertyFromObj(user, "name");
