import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "/src/assets/imgs/logo.png";

const navItems = [
  { to: "/", icon: "/src/assets/icons/dashboard.svg", label: "Dashboard" },
  {
    to: "/tele-med",
    icon: "/src/assets/icons/tele-med.svg",
    label: "Tele Med",
  },
  {
    to: "/tele-priv",
    icon: "/src/assets/icons/tele-priv.svg",
    label: "Tele Priv",
  },
  { to: "/doctors", icon: "/src/assets/icons/doctors.svg", label: "Doctors" },
  {
    to: "/settings",
    icon: "/src/assets/icons/settings.svg",
    label: "Settings",
  },
  { to: "/logout", icon: "/src/assets/icons/sign-out.svg", label: "Logout" },
];

export default function SideBar() {
  const navigate = useNavigate();

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-28 flex flex-col items-center justify-between py-5"
      style={{ backgroundColor: "#354D92" }}
    >
      {/* Logo */}
      <button
        onClick={() => navigate("/")}
        className="focus:outline-none"
        aria-label="Go to dashboard"
        title="Dashboard"
      >
        <img src={logo} alt="Logo" className="h-24 w-24 object-contain" />
      </button>

      {/* Main nav */}
      <nav className="flex-1 flex flex-col items-center gap-4 pt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                "relative grid place-items-center h-12 w-12 rounded-xl transition",
                isActive
                  ? "bg-white/20 ring-2 ring-white/50 shadow-lg"
                  : "hover:bg-white/10",
              ].join(" ")
            }
            title={item.label}
            aria-label={item.label}
          >
            <img src={item.icon} alt="" className="h-6 w-6" />
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
