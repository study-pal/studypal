"use client";

import { PassageUser } from "@passageidentity/passage-elements/passage-user";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [auth, setAuth] = useState({
    state: "loading",
    user: null,
  });

  useEffect(() => {
    if (localStorage.getItem("psg_auth_token")) {
      const user = new PassageUser();
      user.authGuard().then((isAuthorized) => {
        if (isAuthorized === false) {
          setAuth({
            state: "unauthorized",
            user: null,
          });
          return;
        }
        setAuth({
          state: "authorized",
          user,
        });
      });
    } else {
      setAuth({
        state: "unauthorized",
        user: null,
      });
    }
  }, []);

  async function handleLogout() {
    const user = new PassageUser();
    setAuth({
      state: "loggingOut",
      user,
    });
    await user.signOut();
    setAuth({
      state: "unauthorized",
      user: null,
    });
  }

  return { auth, handleLogout };
}
