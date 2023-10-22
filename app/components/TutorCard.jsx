"use client";

import { useRouter } from "next/navigation";
// import BookIcon from "../icons/book.svg";
// import PencilIcon from "../icons/pencil.svg";
import Pill from "./Pill";

export default function TutorCard({ id, name, ageGroup, subjects, imageUrl }) {
  const router = useRouter();

  // If avatar is null, show placeholder
  const avatarUrl =
    imageUrl ??
    "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

  return (
    <div
      onClick={() => router.push("/tutors/" + id)}
      className="w-full p-2 flex flex-col border border-neutral-400 rounded cursor-pointer"
    >
      <div className="flex items-center justify-center aspect-square bg-slate-300 rounded mb-2 overflow-hidden">
        <img className="object-cover" src={avatarUrl} />
      </div>

      <p className="text-lg font-bold mb-1">{name}</p>
      <div className="flex items-center mb-1">
        {/* <PencilIcon className="w-5 fill-dark mr-1" /> */}
        <span>Age Group: {ageGroup}</span>
      </div>

      <div className="flex items-center mb-1">
        {/* <BookIcon className="w-5 fill-dark mr-1" /> */}
        <span>Subjects:</span>
      </div>
      <div className="flex gap-1">
        {subjects.map((subject) => (
          <Pill value={subject} key={subject} />
        ))}
      </div>
    </div>
  );
}
