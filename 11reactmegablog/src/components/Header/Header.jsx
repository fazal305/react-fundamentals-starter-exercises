import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router";
import Container from "../Container/Container";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    { name: "Home", path: "/", active: true },
    { name: "All Posts", path: "/all-posts", active: authStatus },
    { name: "Add Post", path: "/add-post", active: authStatus },
    { name: "Login", path: "/login", active: !authStatus },
    { name: "Signup", path: "/signup", active: !authStatus },
  ];

  return (
    <header className="border-b border-slate-200 bg-white">
      <Container className="flex min-h-16 items-center justify-between gap-4 py-3">
        <Link to="/" aria-label="MegaBlog home">
          <Logo />
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-2">
          {navItems
            .filter((item) => item.active)
            .map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    isActive
                      ? "bg-blue-50 text-blue-800"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          {authStatus ? <LogoutBtn /> : null}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
