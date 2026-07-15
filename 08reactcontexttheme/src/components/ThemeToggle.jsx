import useTheme from "../hooks/useTheme";

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <label className="inline-flex cursor-pointer items-center gap-3 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
      <span>{isDarkMode ? "Dark mode" : "Light mode"}</span>
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={toggleTheme}
        role="switch"
        className="h-5 w-5 accent-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      />
    </label>
  );
}

export default ThemeToggle;
