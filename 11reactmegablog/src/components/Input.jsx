function Input({ label, type = "text", className = "", ref, ...props }) {
  const inputId = props.id || props.name;

  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        ref={ref}
        type={type}
        className={`w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${className}`}
        {...props}
      />
    </div>
  );
}

export default Input;
