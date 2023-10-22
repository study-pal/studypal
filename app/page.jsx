"use client";

import Loader from "./components/Loader";
import TutorCard from "./components/TutorCard";
import Button from "./components/forms/Button";
import useAuth from "./hooks/useAuth";
import Select from "./components/forms/Select";
import { ageGroups, genderOptions } from "@/schemas/tutor";
import TextInput from "./components/forms/TextInput";

export default function Home() {
  const {
    auth: { state },
  } = useAuth();

  // TODO: get tutors from api
  const dummyTutors = [
    {
      id: 1,
      name: "John Doe",
      subjects: ["Math", "English"],
      ageGroup: "College Prep",
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      name: "Jane Doe",
      subjects: ["History"],
      ageGroup: "Primary",
      image: null,
    },
  ];

  if (state === "loading")
    return (
      <div className="flex justify-center mt-20">
        <Loader />
      </div>
    );

  return (
    <main className="flex lg:mx-44 md:mx-20 mx-6">
      <div className="w-full py-16">
        <h1 className="text-3xl font-bold mb-4">Tutors</h1>
        <div className="grid gap-6" style={homeGridColumns}>
          <TutorFilterBox />
          <TutorList tutors={dummyTutors} />
        </div>
      </div>
    </main>
  );
}

// TODO: task for julie
function TutorFilterBox() {
  return (
    <div>
      <div className="py-2 px-3 border border-neutral-400 rounded">
        <Select options={genderOptions.map((opt) => ({
              value: opt,
            }))} label={"Gender"}/>
        <Select options={ageGroups.map((opt) => ({
              value: opt,
            }))}label={"Age"}/>
        <TextInput label={"Subjects"}/>
        <Button className="w-full">Search</Button>
      </div>
    </div>
  );
}

function TutorList({ tutors }) {
  const tutorsText = tutors.length > 1 ? "tutors" : "tutor";

  return (
    <div>
      <p className="mb-4">{`Found ${tutors.length} ${tutorsText}.`}</p>
      <div className="grid gap-4" style={tutorListGridColumns}>
        {tutors.map((tutor) => (
          <TutorCard
            key={tutor.id}
            id={tutor.id}
            name={tutor.name}
            ageGroup={tutor.ageGroup}
            subjects={tutor.subjects}
            imageUrl={tutor.image}
          />
        ))}
      </div>
    </div>
  );
}

const homeGridColumns = {
  gridTemplateColumns: "2fr 6fr",
};

const tutorListGridColumns = {
  gridTemplateColumns: "repeat(3, 1fr)",
};
