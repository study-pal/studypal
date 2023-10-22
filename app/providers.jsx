"use client";

import { createContext, useEffect, useState } from "react";

import { getCurrentUser } from "@/actions/passageUser";

export const AuthContext = createContext();

export default function Providers({ children }) {
  const [authStatus, setAuthStatus] = useState("authorizing");

  useEffect(() => {
    (async () => {
      const { isAuthorized } = await getCurrentUser();
      setAuthStatus(isAuthorized ? "authorized" : "unauthorized");
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
}
