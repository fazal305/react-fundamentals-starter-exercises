import useTheme from "../hooks/useTheme";

function PreviewBadge() {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <div className="rounded-lg border border-blue-300 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
      <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
        Deepest consumer
      </p>
      <p className="mt-2 text-sm text-blue-800 dark:text-blue-200">
        Current theme from context: {themeMode.toUpperCase()}
      </p>
      <button
        type="button"
        onClick={toggleTheme}
        className="mt-4 rounded-md border border-blue-700 bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        Toggle from nested component
      </button>
    </div>
  );
}

function PreviewPanel() {
  return (
    <div className="rounded-lg border border-slate-300 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        Middle component receives no theme props.
      </p>
      <div className="mt-4">
        <PreviewBadge />
      </div>
    </div>
  );
}

function NestedThemePreview() {
  return (
    <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
        Deeply nested theme preview
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
        The parent and middle components do not receive or forward theme props.
        Only the deepest component calls useTheme().
      </p>
      <div className="mt-5">
        <PreviewPanel />
      </div>
    </section>
  );
}

export default NestedThemePreview;
