//* as const assertion

{
  //   enum UserRoles {
  //     Admin = "Admin",
  //     Editor = "Editor",
  //     Viewer = "Viewer",
  //   }
  const UserRoles = {
    Admin: "Admin",
    Editor: "Editor",
    Viewer: "Viewer",
  } as const;

  //   UserRoles.Admin = "Amin"

  const canEdit = (role: typeof UserRoles[keyof typeof UserRoles]) => {
    if (role === UserRoles.Admin || role === UserRoles.Editor) {
      return true;
    } else {
      return false;
    }
  };

  console.log(canEdit(UserRoles.Viewer));
}
