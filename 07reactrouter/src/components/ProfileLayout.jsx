import { NavLink, Outlet } from "react-router";

const baseClasses =
  "rounded-md px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2";
const activeClasses = `${baseClasses} bg-blue-700 text-white`;
const inactiveClasses = `${baseClasses} text-slate-700 hover:bg-slate-100 hover:text-slate-950`;

function ProfileLayout() {
  return (
    <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Profile</h2>
          <p className="mt-1 text-sm text-slate-600">
            A nested layout route with its own navigation and Outlet.
          </p>
        </div>

        <nav aria-label="Profile navigation">
          <ul className="flex flex-wrap gap-2">
            <li>
              <NavLink
                to="/profile"
                end
                className={({ isActive }) =>
                  isActive ? activeClasses : inactiveClasses
                }
              >
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/settings"
                className={({ isActive }) =>
                  isActive ? activeClasses : inactiveClasses
                }
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="pt-5">
        <Outlet />
      </div>
    </section>
  );
}

export default ProfileLayout;
