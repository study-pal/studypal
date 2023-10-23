"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
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
        <img className="object-cover w-full h-full" src={avatarUrl} />
      </div>

      <p className="text-lg font-bold mb-1">{name}</p>
      <div className="flex items-center mb-1">
        <Image
          src="/pencil.svg"
          width={20}
          height={20}
          className="fill-dark mr-1"
          alt="Pencil Icon"
        />
        <span>Age Group: {ageGroup}</span>
      </div>

      <div className="flex items-center mb-1">
        <Image
          src="/book.svg"
          width={20}
          height={20}
          className="fill-dark mr-1"
          alt="Book Icon"
        />
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
