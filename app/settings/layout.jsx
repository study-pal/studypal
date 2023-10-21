"use client";

import { usePathname, useRouter } from "next/navigation";
import PencilIcon from "../icons/pencil.svg";
import UserIcon from "../icons/user.svg";
import AccountIcon from "../icons/account-circle.svg";

function SettingsLayout({ children }) {
  const pathName = usePathname();
  const router = useRouter();
  const links = [
    {
      path: "/settings/account",
      label: "Account Settings",
      icon: <UserIcon className="w-5 fill-dark mr-1" />,
    },
    {
      path: "/settings/tutor",
      label: "Tutor Details",
      icon: <PencilIcon className="w-5 fill-dark mr-1" />,
    },
  ];
  return (
    <div className="sm:flex md:grid gap-4 grid-cols-3 py-5 px-6 mt-10 mx-56">
      <div className="flex flex-col gap-2 mt-2 w-40">
        <div className="flex border-slate-400">
          <AccountIcon className="w-5 fill-dark mr-1" />
          <span>John Doe</span>
        </div>
        {links.map(({ path, label, icon }) => {
          const activeLinkStyle =
            pathName === path ? "font-bold text-emerald-600" : "";
          // console.log(pathName);
          return (
            <div
              key={path}
              onClick={() => router.push(path)}
              className={`cursor-pointer flex first:border-b-2 border-slate-400 ${activeLinkStyle}`}
            >
              {icon}
              {label}
            </div>
          );
        })}
      </div>
      <section className="col-start-2 col-end-4">{children}</section>
    </div>
  );
}

export default SettingsLayout;
