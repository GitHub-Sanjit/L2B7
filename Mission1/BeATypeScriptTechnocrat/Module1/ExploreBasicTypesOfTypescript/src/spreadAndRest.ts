//* spread operator

const frineds = ["Rahim", "karim"];

const schoolFrineds = ["Pinto", "chinto", "Borkot"];

const collegeFriends = ["Mr. Smart", "Mr Do", "Mrs sm"];

frineds.push(...schoolFrineds);
frineds.push(...collegeFriends);

const user = { name: "a", B: "B" };

const otherInfo = { hobby: "outing", color: "blue" };

const userInfo = { ...user, ...otherInfo };

//* Rest Operator

const sendInvite = (...friends: string[]) => {
  friends.forEach((friend: string) => {
    console.log(`Send Invitation to ${friend}`);
  });
};

sendInvite("A", "B", "C", "D");
