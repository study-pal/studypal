import { useEffect, useState } from "react";
import { getCurrentUser } from "@/actions/passageUser";

export default function useAuth() {
  const [authStatus, setAuthStatus] = useState("authorizing");

  useEffect(() => {
    (async () => {
      const { isAuthorized } = await getCurrentUser();
      setAuthStatus(isAuthorized ? "authorized" : "unauthorized");
    })();
  }, [authStatus]);

  return { authStatus, setAuthStatus };
}
