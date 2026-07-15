import Navigation from "./Navigation";

function Header() {
  return (
    <header className="border-b border-slate-300 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            React Fundamentals
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-950">
            React Router Learning Hub
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Client-side routing, layouts, route parameters, redirects, and 404s.
          </p>
        </div>

        <Navigation />
      </div>
    </header>
  );
}

export default Header;
