"use client";

import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signOutUser } from "@/actions/passageUser";
import Button from "./forms/Button";
import { AuthContext } from "../providers";

export default function Nav() {
  const router = useRouter();
  const { authStatus, setAuthStatus } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOutUser();
    setAuthStatus("unauthorized");
    router.push("/");
  };

  return (
    <nav className="w-full flex justify-between items-center px-8 border-b border-b-neutral-200">
      <Link className="py-5 text-2xl font-bold" href="/">
        StudyPal
      </Link>

      {authStatus === "authorized" && (
        <AuthorizedUser router={router} handleLogout={handleLogout} />
      )}

      {authStatus === "unauthorized" && <GuestUser router={router} />}
    </nav>
  );
}

function AuthorizedUser({ router, handleLogout }) {
  return (
    <div className="flex gap-4">
      <div className="flex items-center">
        <Button onClick={() => router.push("/settings/account")}>
          Settings
        </Button>
      </div>
      <div className="flex items-center">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}

function GuestUser({ router }) {
  return (
    <div className="flex">
      <span className="px-4 py-3">
        If you're a tutor, login or sign up here
      </span>
      <div className="flex items-center">
        <Button onClick={() => router.push("/auth")}>Tutor Access</Button>
      </div>
    </div>
  );
}
