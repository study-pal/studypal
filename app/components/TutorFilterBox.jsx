"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ageGroups, genderOptions } from "@/schemas/tutor";
import Button from "./forms/Button";
import Select from "./forms/Select";
import TextInput from "./forms/TextInput";

export default function TutorFilterBox() {
  const [gender, setGender] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [subject, setSubject] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (gender) {
      params.set("gender", gender);
    }
    if (ageGroup) {
      params.set("ageGroup", ageGroup);
    }
    if (subject) {
      params.set("subject", subject);
    }

    router.push(pathname + "?" + params.toString());
  };

  return (
    <div>
      <div className="py-2 px-3 border border-neutral-400 rounded">
        <Select
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          options={genderOptions.map((opt) => ({
            value: opt,
          }))}
          label={"Gender"}
        />
        <Select
          name="ageGroup"
          onChange={(e) => setAgeGroup(e.target.value)}
          value={ageGroup}
          options={ageGroups.map((opt) => ({
            value: opt,
          }))}
          label={"Age Group"}
        />
        <TextInput
          name="subject"
          label={"Subject"}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <Button onClick={handleSearch} className="w-full mt-3">
          Search
        </Button>
      </div>
    </div>
  );
}
