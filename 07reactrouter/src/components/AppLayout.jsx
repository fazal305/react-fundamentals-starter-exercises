import { useState } from "react";
import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import RouteInspector from "./RouteInspector";

function AppLayout() {
  const [layoutCounter, setLayoutCounter] = useState(0);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="mb-6 rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            Shared layout state demo
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            This counter lives in the shared layout. It stays the same while you
            navigate with Link or NavLink because the layout remains mounted.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setLayoutCounter((count) => count + 1)}
              className="rounded-md border border-slate-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              Increment layout counter
            </button>

            <span className="text-sm font-semibold text-slate-950">
              Count: {layoutCounter}
            </span>

            <a
              href="/about"
              className="rounded-md border border-amber-400 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
            >
              Reload through a normal anchor
            </a>
          </div>

          <p className="mt-3 text-xs leading-5 text-slate-600">
            The anchor above is intentionally included as a teaching comparison.
            It asks the browser for a new document and can reset in-memory React
            state. Normal internal app navigation should use Link or NavLink.
          </p>
        </section>

        <RouteInspector />

        <div className="mt-6">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
