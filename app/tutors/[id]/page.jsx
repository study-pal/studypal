import Button from "@/components/forms/Button";
import Pill from "@/components/Pill";

export default function Tutor() {
  const id = 1;
  const name = "John Doe";
  const subjects = ["Math", "English"];
  const ageGroup = "College Prep";
  const image =
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  return (
    <main className="flex min-h-screen lg:mx-44 md:mx-20 mx-6">
      <div className="w-full pb-16 mt-40 bg-zinc-200 rounded-t-lg shadow-2xl">
        <div className="w-full px-10 gap-4 flex flex-row">
          <div className="w-1/5 flex justify-center">
            <img
              className="max-w-full h-48 aspect-square -mt-24 overflow-hidden object-cover rounded-full object-center border-4 border-background drop-shadow-xl"
              src={image}
              alt="Profile picture"
            />
          </div>
          <div className="w-3/5 mt-6">
            <h1 className="capitalize text-4xl font-medium w-full">{name}</h1>
            <div className="w-full my-4">
              <div className="flex gap-1">
                <a className="px-2 py-1 bg-orange-600 text-white rounded-full font-light">
                  {subjects[0]}
                </a>
                <a className="px-2 py-1 bg-orange-600 text-white rounded-full font-light">
                  {subjects[1]}
                </a>
              </div>
            </div>
          </div>
          <div className="w-1/5">
            <Button className="w-full my-10 font-medium text-l">
              Book a Session
            </Button>
          </div>
        </div>
        <div className="w-full flex flex-row px-10 ">
          <div className="w-4/5 pr-20 py-10 ">
            <p className="text-justify">
              Lorem ipsum keme keme keme 48 years majubis chapter valaj emena
              gushung makyonget wasok jongoloids guash bonggakea sangkatuts urky
              biway jongoloids jongoloids borta kasi at sa makyonget chopopo
              chopopo na chopopo nang na ang jowa Gino quality control emena
              gushung Cholo na ang kemerloo ganders planggana bonggakea at ang
              ma-kyonget otoko majubis mahogany at ang keme keme kasi chuckie
              quality control at ang sangkatuts tanders na kirara krung-krung
              wiz bella bakit na ang katagalugan lulu kasi bonggakea ugmas
              shokot quality control shonga na pranella shogal ng pranella na
              ang chipipay pamenthol shonga-shonga wasok na katagalugan Cholo
              bella waz bella at keme fayatollah kumenis planggana paminta
              sudems nang mashumers jutay quality control warla at nang shonget
              mahogany na ang ang majubis sa ugmas kasi chaka.
            </p>
          </div>
          <div className="bg-zinc-400 w"></div>
        </div>
      </div>
    </main>
  );
}

function SubjectList({ subject }) {
  return (
    <div>
      <div className="grid gap-4">
        {tutors.map((tutor) => (
          <Pill subjects={tutor.subjects} />
        ))}
      </div>
    </div>
  );
}
