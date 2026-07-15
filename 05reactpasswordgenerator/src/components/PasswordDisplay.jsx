function PasswordDisplay({
  password,
  inputRef,
  isCopied,
  onCopy,
  onRegenerate,
}) {
  return (
    <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
      <label
        htmlFor="generated-password"
        className="block text-sm font-semibold text-slate-700"
      >
        Generated password
      </label>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          id="generated-password"
          ref={inputRef}
          type="text"
          value={password}
          readOnly
          className="min-w-0 flex-1 rounded-md border border-slate-300 px-4 py-3 font-mono text-sm text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCopy}
            disabled={!password}
            className="rounded-md border border-slate-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCopied ? "Copied!" : "Copy"}
          </button>

          <button
            type="button"
            onClick={onRegenerate}
            className="rounded-md border border-slate-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Regenerate
          </button>
        </div>
      </div>
    </section>
  );
}

export default PasswordDisplay;
