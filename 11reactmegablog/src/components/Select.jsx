function Select({ label, options = [], className = "", ref, ...props }) {
  const selectId = props.id || props.name;

  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={selectId}
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          {label}
        </label>
      ) : null}
      <select
        id={selectId}
        ref={ref}
        className={`w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
