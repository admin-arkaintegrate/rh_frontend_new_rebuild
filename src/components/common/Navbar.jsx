import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import profileIcon from "/src/assets/imgs/profile.png";
import dashboardIcon from "/src/assets/icons/dashboard-mobile.svg";
import teleMedIcon from "/src/assets/icons/tele-med-mobile.svg";
import telePrivIcon from "/src/assets/icons/tele-priv-mobile.svg";
import doctorsIcon from "/src/assets/icons/doctors-mobile.svg";
import settingsIcon from "/src/assets/icons/settings-mobile.svg";
import signOutIcon from "/src/assets/icons/sign-out-mobile.svg";
import { useAuth } from "../../hooks/useAuth";

const navItems = [
  { to: "/", icon: dashboardIcon, label: "Dashboard" },
  { to: "/tele-med", icon: teleMedIcon, label: "Tele MED" },
  { to: "/tele-priv", icon: telePrivIcon, label: "Tele PRIV" },
  { to: "/doctors", icon: doctorsIcon, label: "Doctors" },
  { to: "/settings", icon: settingsIcon, label: "Setting" },
];

export default function Navbar({ open, onClose }) {
  const { user: authUser } = useAuth?.() || { user: null };
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] md:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        className={`absolute left-0 top-0 h-full w-full transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full  m-auto bg-[#354D92] p-[6px] md:p-3 rounded-[20px]">
          <div className="flex h-full flex-col justify-between rounded-[16px] bg-white shadow-2xl px-4">
            <div>
              {/* Top bar */}
              <div className="flex items-center justify-between pt-4 pb-2">
                <button
                  onClick={onClose}
                  aria-label="Close menu"
                  className="rounded-xl p-2 hover:bg-[#3745570D]"
                >
                  <XMarkIcon className="h-6 w-6 text-slate-700" />
                </button>

                {/* Profile card */}
                <button
                  onClick={() => {
                    navigate("/");
                    onClose();
                  }}
                  className="mx-4 mt-2 flex items-center gap-3 rounded-2xl px-3 py-2 text-left hover:bg-slate-50"
                >
                  <img
                    src={profileIcon}
                    alt="profile"
                    className="h-12 w-12 rounded-2xl object-cover"
                  />
                  <div className="leading-tight">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-slate-800 truncate max-w-[150px]">
                        {authUser?.first_name || "Yasser"}{" "}
                        {authUser?.last_name || "Mohamed"}
                      </p>
                      <ChevronDownIcon className="h-4 w-4 text-slate-700" />
                    </div>
                    <p className="text-xs text-slate-500">Tele med</p>
                  </div>
                </button>
              </div>

              {/* Divider */}
              <div className="mx-4 my-3 h-px bg-[#CFE2FF]" />

              {/* Menu list */}
              <nav className="flex flex-col gap-2 px-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-3 rounded-3xl px-4 py-3 transition-all",
                        isActive
                          ? "bg-[#354D9224] shadow-sm"
                          : "hover:bg-slate-50",
                      ].join(" ")
                    }
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-xl">
                      <img src={item.icon} alt="" className="h-6 w-6" />
                    </span>
                    <span className="text-[15px] font-medium text-slate-700">
                      {item.label}
                    </span>
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Sign out */}
            <div className="px-3 pb-5 pt-4">
              <button
                onClick={() => {
                  navigate("/logout");
                  onClose();
                }}
                className="flex w-full items-center gap-3 rounded-2xl bg-[#EDEDED]/80 px-4 py-3 text-left hover:bg-[#3745570D]"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl">
                  <img src={signOutIcon} alt="" className="h-6 w-6" />
                </span>
                <span className="text-[15px] font-medium text-slate-700">
                  Sign Out
                </span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
