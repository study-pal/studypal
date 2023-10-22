import TutorCard from "../components/TutorCard";
import TutorFilterBox from "../components/TutorFilterBox";

async function getTutors(queries = "") {
  let url = "http://localhost:3000/api/tutors/";
  if (queries) {
    url += `?${queries}`;
  }
  const res = await fetch(url, {
    cache: "no-cache",
  });
  const tutorData = await res.json();
  return tutorData;
}

export default async function Home({ searchParams }) {
  const queries = new URLSearchParams(searchParams);
  const tutors = await getTutors(queries.toString());

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
