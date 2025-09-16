// src/components/common/Header.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { DateRange } from "react-date-range";
import { format, parseISO, isValid, isSameDay } from "date-fns";
import profileIcon from "/src/assets/imgs/profile.png";
import calendar from "/src/assets/icons/calendar.svg";
import userIcon from "/src/assets/icons/user.svg";
import { useAuth } from "../../hooks/useAuth";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function Header({
  onDateChange = () => {},
  onTypeChange = () => {},
  selectedStartDate,   // ex: "2025-09-16"
  selectedEndDate,     // ex: "2025-09-16"
  selectedType = "all", // "all" | "tele_med" | "tele_priv"
}) {
  const { user: authUser } = useAuth();

  // ---------- Config ----------
  const types = useMemo(
    () => [
      { name: "All", id: 1, key: "all" },
      { name: "MED", id: 2, key: "tele_med" },
      { name: "PRIV", id: 3, key: "tele_priv" },
    ],
    []
  );

  // ---------- Date state (controlled by props with safe fallback = today) ----------
  const today = new Date();

  const initialStart = useMemo(() => {
    if (selectedStartDate) {
      const d = parseISO(selectedStartDate);
      return isValid(d) ? d : today;
    }
    return today;
  }, [selectedStartDate]);

  const initialEnd = useMemo(() => {
    if (selectedEndDate) {
      const d = parseISO(selectedEndDate);
      return isValid(d) ? d : today;
    }
    return today;
  }, [selectedEndDate]);

  const [range, setRange] = useState([
    { startDate: initialStart, endDate: initialEnd, key: "selection" },
  ]);

  // Sync picker when URL props change (e.g., on refresh/back/forward)
  useEffect(() => {
    setRange([{ startDate: initialStart, endDate: initialEnd, key: "selection" }]);
  }, [initialStart, initialEnd]);

  // ---------- Type state (controlled by props with fallback = All) ----------
  const [type, setType] = useState(
    () => types.find((t) => t.key === selectedType) || types[0]
  );

  useEffect(() => {
    const found = types.find((t) => t.key === selectedType) || types[0];
    setType(found);
  }, [selectedType, types]);

  // ---------- Date popover handling ----------
  const calendarRef = useRef(null);
  const calendarToggleRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

  // Close picker on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        calendarToggleRef.current &&
        !calendarToggleRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // ---------- UI helpers ----------
  const formatLabel = () => {
    const s = range[0]?.startDate;
    const e = range[0]?.endDate;
    if (!s || !e) return "Select range";
    // لو اليومين نفس اليوم، اكتب Today
    if (isSameDay(s, today) && isSameDay(e, today)) return "Today";
    return `${format(s, "dd LLL")} - ${format(e, "dd LLL")}`;
  };

  // ---------- Render ----------
  return (
    <header className="w-full">
      <div className="rounded-2xl bg-white shadow p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
              Dashboard
            </h1>

            {/* Date filter */}
            <div className="relative w-fit">
              <div
                ref={calendarToggleRef}
                onClick={() => setOpen((prev) => !prev)}
                className="border-right-date flex items-center max-md:h-10 max-md:w-auto justify-between pe-2 py-1 md:px-3 md:py-2 rounded-3xl font-medium cursor-pointer bg-[#F9FAFB]"
              >
                <img src={calendar} className="w-[24px] h-[24px] ms-2" alt="calendar" />
                <div className="block px-2 text-sm">{formatLabel()}</div>
                <ChevronDownIcon className="size-4" />
              </div>

              {open && (
                <>
                  {/* Overlay */}
                  <div
                    className="fixed inset-0 bg-black/30 z-[100]"
                    onClick={() => setOpen(false)}
                  />
                  {/* Panel */}
                  <div
                    ref={calendarRef}
                    className="absolute md:-translate-x-1/2 md:left-1/2 z-[110] rounded-lg overflow-hidden mt-2 shadow-lg bg-white"
                  >
                    <DateRange
                      editableDateInputs
                      onChange={(item) => {
                        const { startDate, endDate } = item.selection;
                        setRange([item.selection]);
                        if (isSelecting) {
                          setIsSelecting(false);
                          return;
                        }
                        if (startDate && endDate) {
                          setOpen(false);
                          onDateChange(startDate, endDate); // يحدّث الـ URL في Dashboard
                          setIsSelecting(true);
                        }
                      }}
                      moveRangeOnFirstSelection={false}
                      ranges={range}
                      rangeColors={["#2563eb"]}
                      showMonthAndYearPickers={false}
                      showSelectionPreview
                      months={1}
                      direction={
                        typeof window !== "undefined" && window.innerWidth < 768
                          ? "vertical"
                          : "horizontal"
                      }
                    />
                  </div>
                </>
              )}
            </div>

            {/* Type dropdown */}
            <Menu as="div" className="relative">
              <MenuButton
                onClick={() => setOpen(false)}
                onTouchStart={() => setOpen(false)}
                className="w-auto md:w-28 flex items-center gap-4 px-3 py-2 text-sm font-medium rounded-3xl bg-[#F9FAFB] hover:bg-[#F3F4F6]"
                aria-label="Filter by type"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={userIcon}
                    alt="user"
                    className="md:w-[14px] md:h-[14px]"
                  />
                  <span className="text-sm">{type?.name}</span>
                </div>
                <ChevronDownIcon className="size-4" />
              </MenuButton>

              <Transition
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 scale-95 -translate-y-1"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100 translate-y-0"
                leaveTo="opacity-0 scale-95 -translate-y-1"
              >
                <MenuItems
                  anchor="bottom end"
                  className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                >
                  <div className="py-1">
                    {types.map((opt) => (
                      <MenuItem key={opt.id}>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              setType(opt);
                              onTypeChange(opt.key); // يكتب في URL من Dashboard
                            }}
                            className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-sm ${
                              active ? "bg-slate-50" : ""
                            } ${
                              type.key === opt.key
                                ? "font-semibold text-slate-900"
                                : "text-slate-700"
                            }`}
                          >
                            <span>{opt.name}</span>
                            {type.key === opt.key && (
                              <CheckIcon className="h-4 w-4" aria-hidden="true" />
                            )}
                          </button>
                        )}
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Transition>
            </Menu>
          </div>

          {/* Profile */}
          <button className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2 text-left shadow-sm hover:shadow">
            <img
              src={profileIcon}
              alt="profile"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-800">
                {authUser?.first_name} {authUser?.last_name}
              </p>
              <p className="text-xs text-slate-500">
                {type.name === "All" ? "Admin" : type.name}
              </p>
            </div>
            <ChevronDownIcon className="h-4 w-4 text-slate-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
