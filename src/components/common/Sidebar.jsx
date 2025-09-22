
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "/src/assets/icons/logo.svg";
import dashboardIcon from "/src/assets/icons/dashboard.svg";
import teleMedIcon from "/src/assets/icons/tele-med.svg";
import telePrivIcon from "/src/assets/icons/tele-priv.svg";
import doctorsIcon from "/src/assets/icons/doctors.svg";
import settingsIcon from "/src/assets/icons/settings.svg";
import signOutIcon from "/src/assets/icons/sign-out.svg";

const navItems = [
  { to: "/", icon: dashboardIcon, label: "Dashboard" },
  { to: "/tele-med", icon: teleMedIcon, label: "Tele Med" },
  { to: "/tele-priv", icon: telePrivIcon, label: "Tele Priv" },
  { to: "/doctors", icon: doctorsIcon, label: "Doctors" },
  { to: "/settings", icon: settingsIcon, label: "Settings" },
  { to: "/logout", icon: signOutIcon, label: "Logout" },
];


export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside
      className="fixed left-0 top-[62%] translate-y-[-50%] h-screen w-28 flex flex-col items-center justify-between py-5"
      style={{ backgroundColor: "#354D92" }}
    >
      {/* Logo */}
      <button
        onClick={() => navigate("/")}
        className="focus:outline-none"
        aria-label="Go to dashboard"
        title="Dashboard"
      >
        <img src={logo} alt="Logo" className="h-[6rem] w-[6rem] object-contain" />
      </button>

      {/* Main nav */}
      <nav className="flex-1 flex flex-col items-center gap-5 pt-6">
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
            <img src={item.icon} alt="" className="h-8 w-8" />
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
