export default function TextInput({
  name,
  value,
  onChange,
  onKeyUp,
  error,
  placeholder,
  label,
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-medium">
        {label ?? placeholder}
      </label>
      <input
        name={name}
        type="text"
        className="py-1 px-2 rounded border border-neutral-400 hover:border-dark focus:border-dark transition-all outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}
