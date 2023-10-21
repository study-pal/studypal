"use client";

import { useEffect } from "react";

export default function Auth() {
  // Setup passage according to docs
  useEffect(() => {
    require("@passageidentity/passage-elements/passage-auth");
  }, []);

  return (
    <div className="mt-10">
      <passage-auth
        app-id={process.env.NEXT_PUBLIC_PASSAGE_APP_ID}
      ></passage-auth>
    </div>
  );
}
