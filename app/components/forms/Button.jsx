export default function Button({
  children,
  className,
  onClick,
  type = "button",
}) {
  return (
    <button
      className={`h-10 text-center px-4 transition ease-in-out duration-300 bg-emerald-500 hover:bg-accent  text-white rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
