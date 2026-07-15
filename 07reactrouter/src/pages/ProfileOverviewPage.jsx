import { Link } from "react-router";

const completedProjects = [
  {
    id: "01basicreact",
    label: "01basicreact",
  },
  {
    id: "01vitereact",
    label: "01vitereact",
  },
  {
    id: "02reactcounter",
    label: "02reactcounter",
  },
  {
    id: "03reactfiberprops",
    label: "03reactfiberprops",
  },
  {
    id: "04reactbgchanger",
    label: "04reactbgchanger",
  },
  {
    id: "05reactpasswordgenerator",
    label: "05reactpasswordgenerator",
  },
  {
    id: "06reactcurrencyconverter",
    label: "06reactcurrencyconverter",
  },
];

function ProfileOverviewPage() {
  return (
    <section>
      <h3 className="text-2xl font-semibold text-slate-950">
        Learning profile overview
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        This nested index route shows a small profile summary. The surrounding
        profile layout stays shared between the overview and settings pages.
      </p>

      <h4 className="mt-5 text-lg font-semibold text-slate-950">
        Completed projects
      </h4>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {completedProjects.map((project) => (
          <li
            key={project.id}
            className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800"
          >
            {project.label}
          </li>
        ))}
      </ul>

      <Link
        to="/profile/settings"
        className="mt-5 inline-flex rounded-md border border-slate-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        Go to profile settings
      </Link>
    </section>
  );
}

export default ProfileOverviewPage;
