import { Link, useLocation, useNavigate } from "react-router";
import { learningConcepts } from "../data/learningConcepts";

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const notice = location.state?.notice;

  function handleExploreCourses() {
    navigate("/courses");
  }

  return (
    <section className="space-y-6">
      {notice && (
        <div
          className="rounded-md border border-green-300 bg-green-50 p-4 text-sm text-green-800"
          role="status"
        >
          {notice}
        </div>
      )}

      <div className="rounded-lg border border-slate-300 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          Client-side routing
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-950">
          React Router Learning Hub
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
          This app behaves like a small multi-page website, but it uses one HTML
          document, one React root, and route components rendered by React
          Router.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/courses"
            className="rounded-md border border-slate-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Explore Courses
          </Link>

          <button
            type="button"
            onClick={handleExploreCourses}
            className="rounded-md border border-blue-700 bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Navigate with useNavigate
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {learningConcepts.map((concept) => (
          <article
            key={concept.id}
            className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-950">
              {concept.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {concept.summary}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              <strong className="font-semibold text-slate-950">
                In this project:
              </strong>{" "}
              {concept.projectUsage}
            </p>
          </article>
        ))}
      </div>

      <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-950">Link vs anchor</h3>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          Use Link for internal routes handled by React Router. Use a normal
          anchor for external resources, downloads, mailto links, tel links, or
          same-document fragments.
        </p>
      </section>
    </section>
  );
}

export default HomePage;
