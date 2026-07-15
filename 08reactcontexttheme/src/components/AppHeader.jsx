import useTheme from "../hooks/useTheme";
import ThemeToggle from "./ThemeToggle";

function AppHeader() {
  const { themeMode } = useTheme();

  return (
    <header className="border-b border-slate-300 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
            React Fundamentals
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">
            Context Theme Lab
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-300">
            Learning Context API, prop drilling, shared state, custom context
            hooks, and Tailwind v4 dark mode.
          </p>
          <p className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
            Current theme: {themeMode.toUpperCase()}
          </p>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}

export default AppHeader;
