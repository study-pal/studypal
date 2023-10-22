import TutorCard from "./components/TutorCard";
import Button from "./components/forms/Button";
import Select from "./components/forms/Select";
import { ageGroups, genderOptions } from "@/schemas/tutor";
import TextInput from "./components/forms/TextInput";

async function getTutors() {
  const res = await fetch("http://localhost:3000/api/tutors/", {
    cache: "no-store",
  });
  const tutorData = await res.json();
  return tutorData;
}

export default async function Home() {
  const tutors = await getTutors();

  return (
    <main className="flex lg:mx-44 md:mx-20 mx-6">
      <div className="w-full py-16">
        <h1 className="text-3xl font-bold mb-4">Tutors</h1>
        <div className="grid gap-6" style={homeGridColumns}>
          <TutorFilterBox />
          <TutorList tutors={tutors.data} />
        </div>
      </div>
    </main>
  );
}

function TutorFilterBox() {
  return (
    <div>
      <div className="py-2 px-3 border border-neutral-400 rounded">
        <Select
          options={genderOptions.map((opt) => ({
            value: opt,
          }))}
          label={"Gender"}
        />
        <Select
          options={ageGroups.map((opt) => ({
            value: opt,
          }))}
          label={"Age"}
        />
        <TextInput label={"Subjects"} />
        <Button className="w-full mt-3">Search</Button>
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
        {tutors.map(({ tutorData }) => (
          <TutorCard
            key={tutorData.id}
            id={tutorData.id}
            name={tutorData.name}
            ageGroup={tutorData.ageGroup}
            subjects={tutorData.subjects}
            imageUrl={tutorData.image}
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
