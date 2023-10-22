"use client";

import { createContext, useEffect, useState } from "react";

import { getCurrentUser } from "@/actions/passageUser";

export const AuthContext = createContext();

export default function Providers({ children }) {
  const [authStatus, setAuthStatus] = useState("authorizing");
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const { isAuthorized, userInfo } = await getCurrentUser();
      setAuthStatus(isAuthorized ? "authorized" : "unauthorized");
      if (isAuthorized) {
        setUser(userInfo);
      }
    })();
  }, [authStatus, setAuthStatus]);

  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus, user }}>
      {children}
    </AuthContext.Provider>
  );
}
