export default function Select({
  name,
  value,
  onChange,
  error,
  options,
  label,
  className,
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <select
        className={`py-1 px-2 rounded border border-neutral-400 hover:border-dark focus:border-dark transition-all outline-none ${className}`}
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}
