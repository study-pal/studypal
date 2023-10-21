"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Button from "./forms/Button";

export default function Nav() {
  const router = useRouter();
  const {
    auth: { state, user },
    handleLogout,
  } = useAuth();

  if (state === "loading") return null;

  return (
    <nav className="w-full flex justify-between items-center px-8 border-b border-b-neutral-200">
      <Link className="py-5 text-2xl font-bold" href="/">
        StudyPal
      </Link>

      {user !== null ? (
        <AuthorizedUser router={router} handleLogout={handleLogout} />
      ) : (
        <GuestUser router={router} />
      )}
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
