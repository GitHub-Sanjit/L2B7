{
  //* Spread Operator

  const bros1: string[] = ["X", "Y", "Z"];
  const bros2: string[] = ["A", "B", "C"];

  bros1.push(...bros2);

  const mentors1 = {
    typeScript: "a",
    redux: "b",
    rdbms: "c",
  };

  const mentors2 = {
    prisma: "a",
    next: "b",
    cloud: "c",
  };

  const mentorsList = {
    ...mentors1,
    ...mentors2,
  };

  //* Rest Operator

  const greetFriends = (...friends: string[]) => {
    // console.log(`Hi ${f1} ${f2} ${f3}`);
    friends.forEach((friend: string) => console.log(`Hi ${friend}`));
  };

  greetFriends("s", "k", "O");

  //* Destructuring
}
