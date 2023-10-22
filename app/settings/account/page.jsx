"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { signOutUser } from "@/actions/passageUser";
import Loader from "@/components/Loader";
import Button from "@/components/forms/Button";
import { AuthContext } from "@/app/providers";

export default function AccountSettings() {
  const router = useRouter();
  const [deleteStatus, setDeleteStatus] = useState("idle");
  const { setAuthStatus, user } = useContext(AuthContext);

  useEffect(() => {
    require("@passageidentity/passage-elements/passage-profile");
  }, []);

  const handleDelete = async () => {
    setDeleteStatus("deleting");
    await signOutUser();
    await fetch(`/api/users/${user.id}`, {
      method: "DELETE",
    });
    setAuthStatus("unauthorized");
    router.push("/");
  };

  if (deleteStatus === "deleting")
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end items-center gap-3">
        {deleteStatus === "idle" && (
          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={() => setDeleteStatus("confirmation")}
          >
            Delete
          </Button>
        )}

        {deleteStatus === "confirmation" && (
          <>
            <p>Are you sure you want to delete your account?</p>
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDelete}
            >
              Yes
            </Button>
            <Button
              className="bg-gray-700 hover:bg-gray-800"
              onClick={() => setDeleteStatus("idle")}
            >
              No
            </Button>
          </>
        )}
      </div>
      <passage-profile
        app-id={process.env.NEXT_PUBLIC_PASSAGE_APP_ID}
      ></passage-profile>
    </div>
  );
}
