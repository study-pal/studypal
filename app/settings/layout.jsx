"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PencilIcon from "../icons/pencil.svg";
import UserIcon from "../icons/user.svg";
import AccountIcon from "../icons/account-circle.svg";
import { getCurrentUser } from "@/actions/passageUser";

function SettingsLayout({ children }) {
  const pathName = usePathname();
  const router = useRouter();
  const [name, setName] = useState();

  useEffect(() => {
    (async () => {
      const { userInfo } = await getCurrentUser();
      setName(
        `${userInfo.user_metadata.first_name} ${userInfo.user_metadata.last_name}`,
      );
    })();
  }, [setName]);

  const links = [
    {
      path: "/settings/account",
      label: "Account Settings",
      icon: (active) => (
        <UserIcon
          className={`w-5 mr-1 ${
            active
              ? "fill-emerald-700 group-hover:fill-emerald-700"
              : " fill-dark group-hover:fill-emerald-500"
          }`}
        />
      ),
    },
    {
      path: "/settings/tutor",
      label: "Tutor Details",
      icon: (active) => (
        <PencilIcon
          className={`w-5 mr-1 ${
            active
              ? "fill-emerald-700 group-hover:fill-emerald-700"
              : " fill-dark group-hover:fill-emerald-500"
          }`}
        />
      ),
    },
  ];

  return (
    <div className="md:grid gap-2 grid-cols-4 py-5 px-6 mt-10 mx-10 lg:mx-40">
      <div className="col-start-1 col-end-2 flex flex-col gap-2 mt-2">
        <div className="text-lg font-medium flex border-b-2 border-neutral-300 pl-1 ">
          <AccountIcon className="w-5 fill-dark mr-1" />
          <span>{name}</span>
        </div>
        {links.map(({ path, label, icon }) => {
          const activeLinkStyle =
            pathName === path
              ? "pt-1.5 bg-emerald-100 text-emerald-700 rounded group hover:bg-emerald-200"
              : "hover:text-emerald-500";
          return (
            <div
              key={path}
              onClick={() => router.push(path)}
              className={`cursor-pointer font-medium flex py-1.5 pl-1 group ${activeLinkStyle}`}
            >
              {icon(pathName === path)}
              {label}
            </div>
          );
        })}
      </div>
      <section className="col-start-2 col-end-5 ml-3">{children}</section>
    </div>
  );
}

export default SettingsLayout;
