//* nullable type

const getUser = (input: string | null) => {
  if (input) {
    console.log(`DB ${input}`);
  } else {
    console.log("All user");
  }
};
