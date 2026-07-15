import { NavLink } from "react-router";
import { navigationItems } from "../data/navigationItems";

const baseClasses =
  "rounded-md px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2";
const activeClasses = `${baseClasses} bg-slate-950 text-white`;
const inactiveClasses = `${baseClasses} text-slate-700 hover:bg-slate-100 hover:text-slate-950`;

function Navigation() {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-wrap gap-2">
        {navigationItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? activeClasses : inactiveClasses
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
