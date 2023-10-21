export default function TextArea({
  name,
  value,
  onChange,
  cols = 30,
  rows = 10,
  classname,
  placeholder,
  label,
  error,
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <textarea
        className={`py-1 px-2 rounded border border-neutral-400 hover:border-dark focus:border-dark transition-all outline-none ${classname}`}
        name={name}
        cols={cols}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}
