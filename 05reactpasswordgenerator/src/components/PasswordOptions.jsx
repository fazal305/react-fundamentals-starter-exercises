function PasswordOptions({
  length,
  minLength,
  maxLength,
  numberAllowed,
  characterAllowed,
  onLengthChange,
  onNumberAllowedChange,
  onCharacterAllowedChange,
}) {
  return (
    <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-950">Password options</h2>

      <div className="mt-5 space-y-5">
        <div>
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="password-length"
              className="text-sm font-semibold text-slate-700"
            >
              Length
            </label>
            <span className="text-sm font-semibold text-slate-950">
              {length}
            </span>
          </div>

          <input
            id="password-length"
            type="range"
            min={minLength}
            max={maxLength}
            value={length}
            onChange={(event) => onLengthChange(Number(event.target.value))}
            className="mt-3 w-full accent-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          />
        </div>

        <label className="flex items-center gap-3 text-sm font-medium text-slate-800">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={(event) => onNumberAllowedChange(event.target.checked)}
            className="h-4 w-4 accent-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          />
          Include numbers
        </label>

        <label className="flex items-center gap-3 text-sm font-medium text-slate-800">
          <input
            type="checkbox"
            checked={characterAllowed}
            onChange={(event) => onCharacterAllowedChange(event.target.checked)}
            className="h-4 w-4 accent-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          />
          Include special characters
        </label>
      </div>
    </section>
  );
}

export default PasswordOptions;
