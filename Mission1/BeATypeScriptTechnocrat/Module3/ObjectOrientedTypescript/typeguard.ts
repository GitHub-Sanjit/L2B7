type AlphaNumeric = number | string;

const add = (num1: AlphaNumeric, num2: AlphaNumeric) => {
  if (typeof num1 === "number" && typeof num2 === "number") {
    return num1 + num2;
  } else {
    return num1.toString() + num2.toString();
  }
};

type NormalUser = {
  name: string;
};

type AdminUser = {
  name: string;
  role: "Admin";
};

const getUserInfo = (user: NormalUser | AdminUser) => {
  if ("role" in user) {
    console.log(
      `The name of the user is ${user.name} and his role is ${user.role}`,
    );
  } else {
    console.log(`The name of the user is ${user.name}`);
  }
};

getUserInfo({ name: "Normal", role: "Admin" });
