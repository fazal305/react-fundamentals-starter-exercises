import { useLocation } from "react-router";

function formatMissingValue(value) {
  return value || "(empty)";
}

function RouteInspector() {
  const location = useLocation();

  const routeInfo = {
    pathname: location.pathname,
    search: formatMissingValue(location.search),
    hash: formatMissingValue(location.hash),
    state: location.state ?? "(no navigation state)",
  };

  return (
    <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-950">Route inspector</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        useLocation returns read-only information about the current route.
      </p>

      <pre className="mt-4 overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-100">
        {JSON.stringify(routeInfo, null, 2)}
      </pre>
    </section>
  );
}

export default RouteInspector;
