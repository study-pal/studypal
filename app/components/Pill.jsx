export default function Pill({ subjects }) {
  return (
    <div className="flex gap-1">
      {subjects.map((subject) => (
        <div className="text-xs py-1 px-2 bg-accent text-white rounded-xl">
          {subject}
        </div>
      ))}
    </div>
  );
}
