export default function Select({
  className,
  onChange,
  options,
  value,
  placeholder,
}) {
  return (
    <select
      className={`py-1 px-2 rounded text-m border-2 border-solid border-neutral-400 focus:border-dark ${className}`}
      onChange={onChange}
      value={value}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.value}
        </option>
      ))}
    </select>
  );
}
