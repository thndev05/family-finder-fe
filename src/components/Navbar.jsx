import { NavLink, Link } from "react-router-dom";

const navLinks = [
  { label: "Trang chủ", to: "/" },
  { label: "Family Finder", to: "/finder" },
  { label: "Hồ sơ thực địa", to: "/cases" },
  { label: "Insights", to: "/insights" }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-bold tracking-wide text-white">
          Family Finder<span className="text-primary-400">.AI</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-300 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition hover:text-white ${isActive ? "text-white" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/finder"
          className="rounded-2xl bg-gradient-to-r from-primary-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-500/40"
        >
          Truy cập Finder
        </Link>
      </div>
    </header>
  );
}

