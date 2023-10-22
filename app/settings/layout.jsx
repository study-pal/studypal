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
      icon: (
        <UserIcon className="w-5 fill-dark mr-1 group-hover:fill-emerald-700" />
      ),
    },
    {
      path: "/settings/tutor",
      label: "Tutor Details",
      icon: (
        <PencilIcon className="w-5 fill-dark mr-1 group-hover:fill-emerald-700" />
      ),
    },
  ];
  return (
    //<div className="sm:flex m-0 md:grid gap-4 grid-cols-3 py-5 px-6 mt-10 mx-56">
    <div className="md:grid gap-2 grid-cols-4 py-5 px-6 mt-10 mx-10 lg:mx-40">
      <div className="flex flex-col gap-3 mt-2 w-40">
        <div className="text-lg font-medium flex border-b-2 border-neutral-300 pl-1 ">
          <AccountIcon className="w-5 fill-dark mr-1" />
          <span>John Doe</span>
        </div>
        {links.map(({ path, label, icon }) => {
          const activeLinkStyle =
            pathName === path
              ? "pt-1.5 bg-emerald-100 text-emerald-700 rounded group hover:bg-emerald-200"
              : "hover:text-emerald-500";
          // console.log(pathName);
          return (
            <div
              key={path}
              onClick={() => router.push(path)}
              className={`cursor-pointer font-medium flex py-1.5 pl-1 group ${activeLinkStyle}`}
            >
              {icon}
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
