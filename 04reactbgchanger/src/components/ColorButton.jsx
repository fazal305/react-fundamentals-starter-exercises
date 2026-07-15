function ColorButton({ label, value, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
    >
      {label}
    </button>
  );
}

export default ColorButton;
