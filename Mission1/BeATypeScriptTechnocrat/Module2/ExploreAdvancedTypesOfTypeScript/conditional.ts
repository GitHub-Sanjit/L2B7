//* conditional type

type A = null;

type B = undefined;

type C = A extends null ? true : B extends undefined ? true : false;

type RichPeoplesVehicles = {
  bike: string;
  car: string;
  ship: string;
};

type CheckVehicle<T> = T extends keyof RichPeoplesVehicles ? true : false;

type HasBike = CheckVehicle<"bike">;
