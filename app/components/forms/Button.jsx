export default function Button({ children, className, onClick }) {
  return (
    <button
      className={`h-10 text-center px-6 bg-green-500 hover:bg-green-600 font-medium text-white rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
