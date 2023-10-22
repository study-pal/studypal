import { PassageUser } from "@passageidentity/passage-elements/passage-user";

export async function getCurrentUser() {
  const currentUser = {
    isAuthorized: false,
    userInfo: null,
  };

  try {
    const passageUser = new PassageUser();
    const isAuthorized = await passageUser.authGuard();
    if (!isAuthorized) {
      await passageUser.refresh();
    }
    const userInfo = await passageUser.userInfo();

    currentUser["isAuthorized"] = isAuthorized;
    currentUser["userInfo"] = userInfo;
    return currentUser;
  } catch (error) {
    return currentUser;
  }
}

export async function signOutUser() {
  const passageUser = new PassageUser();
  await passageUser.signOut();
}
