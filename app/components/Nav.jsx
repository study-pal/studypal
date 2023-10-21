"use client";

import Button from "./forms/Button";

export default function Nav() {
  return (
    <nav className="w-full flex justify-between items-center px-8 border-b border-b-neutral-200">
      <p className="py-5 text-2xl font-bold">StudyPal</p>
      <div className="flex">
        <span className="px-4 py-3">
          If you're a tutor, login or sign up here
        </span>
        <div className="flex items-center">
          <Button
            onClick={() =>
              console.log("TODO: make sure that they redirect to auth page")
            }
          >
            Tutor Access
          </Button>
        </div>
      </div>
    </nav>
  );
}
