import { Link, useLocation, useNavigate } from "react-router";

function NotFoundPage() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="rounded-lg border border-slate-300 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
        404
      </p>
      <h2 className="mt-2 text-3xl font-bold text-slate-950">Page not found</h2>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        No route matched{" "}
        <code className="font-mono text-slate-950">{location.pathname}</code>.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/"
          className="rounded-md border border-slate-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Go home
        </Link>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-md border border-slate-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Go back
        </button>
      </div>
    </section>
  );
}

export default NotFoundPage;
