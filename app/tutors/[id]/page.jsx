import Button from "@/app/components/forms/Button";
import Pill from "@/app/components/Pill";

async function getTutor(id) {
  const res = await fetch("http://localhost:3000/api/tutors/" + id, {
    cache: "no-store",
  });
  const tutorData = await res.json();
  return tutorData;
}

export default async function Tutor({ params }) {
  const tutor = await getTutor(params.id);

  if (tutor.status === "error") {
    return <p>not found</p>;
  }

  const avatar =
    tutor.data?.image ??
    "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

  return (
    <main className="flex min-h-screen lg:mx-44 md:mx-20 mx-6">
      <div className="w-full pb-16 mt-40 bg-zinc-200 rounded-t-lg shadow-2xl">
        <div className="w-full px-10 gap-4 flex flex-row">
          <div className="w-1/5 flex justify-center">
            <img
              className="max-w-full h-48 aspect-square -mt-24 overflow-hidden object-cover rounded-full object-center border-4 border-background drop-shadow-xl"
              src={avatar}
              alt="Profile picture"
            />
          </div>
          <div className="w-3/5 mt-6">
            <h1 className="capitalize text-4xl font-medium w-full">{"name"}</h1>
            <div className="w-full my-4">
              <div className="flex gap-1">
                {tutor.data.subjects.map((subject) => (
                  <Pill value={subject} key={subject} />
                ))}
              </div>
            </div>
          </div>
          <div className="w-1/5">
            <a href={tutor.data.bookingLink}>
              <Button className="w-full my-10 font-medium text-l">
                Book a Session
              </Button>
            </a>
          </div>
        </div>
        <div className="w-full flex flex-row px-10 gap-4">
          <div className="w-4/5 pr-20 py-10 ">
            <p className="text-justify">{tutor.data.bio}</p>
          </div>
          <div className="bg-zinc-300 border-zinc-400 border-solid border-2 w-1/5 flex flex-col px-6 text-center">
            <div className="w-full">
              <h2 className="my-2 font-semibold">Age Group:</h2>
              <h3 className="">{tutor.data.ageGroup}</h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
