// src/components/common/Header.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { DateRange } from "react-date-range";
import { format, parseISO, isValid, isSameDay } from "date-fns";
import profileIcon from "/src/assets/imgs/profile.png";
import calendar from "/src/assets/icons/calendar.svg";
import userIcon from "/src/assets/icons/user.svg";
import menu from "/src/assets/icons/menu.svg";

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

function DateFilter({ range, setRange, open, setOpen, onDateChange }) {
  const today = new Date();
  const calendarRef = useRef(null);
  const toggleRef = useRef(null);

  const formatLabel = () => {
    const s = range[0]?.startDate;
    const e = range[0]?.endDate;
    if (!s || !e) return "Select range";
    if (isSameDay(s, today) && isSameDay(e, today)) return "Today";
    return `${format(s, "dd LLL")} - ${format(e, "dd LLL")}`;
  };

  const handleDateSelect = (item) => {
    const { startDate, endDate } = item.selection;
    setRange([item.selection]);
    if (startDate && endDate) {
      if (!isSameDay(startDate, endDate)) setOpen(false);
      onDateChange(startDate, endDate);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative w-full md:w-auto">
      <div
        ref={toggleRef}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between px-3 py-2 rounded-3xl font-medium cursor-pointer bg-[#F9FAFB] w-full"
      >
        <img src={calendar} className="w-5 h-5" alt="calendar" />
        <div className="flex-1 px-2 text-sm">{formatLabel()}</div>
        <ChevronDownIcon className="size-4" />
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-[100]"
            onClick={() => setOpen(false)}
          />
          <div
            ref={calendarRef}
            className="absolute md:-translate-x-1/2 md:left-1/2 z-[110] rounded-lg overflow-hidden mt-2 shadow-lg bg-white"
          >
            <DateRange
              editableDateInputs
              onChange={handleDateSelect}
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
  );
}

function TypeFilter({ types, type, setType, onTypeChange }) {
  return (
    <Menu as="div" className="relative w-full md:w-auto">
      <MenuButton
        className="flex items-center justify-between gap-4 px-3 py-2 text-sm font-medium rounded-3xl max-md:shadow-sm bg-[#F9FAFB] hover:bg-[#F3F4F6] w-full"
        aria-label="Filter by type"
      >
        <div className="flex items-center gap-2">
          <img src={userIcon} alt="user" className="w-4 h-4" />
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
        <MenuItems className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-xl max-md:shadow-sm bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-1">
            {types.map((opt) => (
              <MenuItem key={opt.id}>
                {({ active }) => (
                  <button
                    onClick={() => {
                      setType(opt);
                      onTypeChange(opt.key);
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
                    {type.key === opt.key && <CheckIcon className="h-4 w-4" />}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

export default function Header({
  onDateChange = () => {},
  onTypeChange = () => {},
  selectedStartDate,
  selectedEndDate,
  selectedType = "all",
  onOpenMobileNav = () => {},
}) {
  const { user: authUser } = useAuth();

  const types = useMemo(
    () => [
      { name: "All", id: 1, key: "all" },
      { name: "MED", id: 2, key: "tele_med" },
      { name: "PRIV", id: 3, key: "tele_priv" },
    ],
    []
  );

  const today = new Date();
  const initialStart = selectedStartDate
    ? isValid(parseISO(selectedStartDate))
      ? parseISO(selectedStartDate)
      : today
    : today;
  const initialEnd = selectedEndDate
    ? isValid(parseISO(selectedEndDate))
      ? parseISO(selectedEndDate)
      : today
    : today;

  const [range, setRange] = useState([
    { startDate: initialStart, endDate: initialEnd, key: "selection" },
  ]);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(
    types.find((t) => t.key === selectedType) || types[0]
  );

  return (
    <header className="w-full">
      <div className="rounded-2xl bg-white shadow p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenMobileNav}
                aria-label="Open menu"
                className="block md:hidden rounded-xl p-2 hover:bg-slate-100"
              >
                <img className="w-6 h-6" src={menu} alt="menu" />
              </button>
              <h1 className="text-lg md:text-3xl font-semibold text-slate-800">
                Dashboard
              </h1>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <DateFilter
                range={range}
                setRange={setRange}
                open={open}
                setOpen={setOpen}
                onDateChange={onDateChange}
              />
              <div className="h-[35px] w-[1px] bg-[#DDDDDD]" />
              <TypeFilter
                types={types}
                type={type}
                setType={setType}
                onTypeChange={onTypeChange}
              />
            </div>
          </div>

          {/* Profile */}
          <button className="flex items-center gap-3 text-left">
            <img
              src={profileIcon}
              alt="profile"
              className="h-12 w-12 rounded-[16px] object-cover"
            />
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-800">
                  {authUser?.first_name} {authUser?.last_name}
                </p>
                <ChevronDownIcon className="h-4 w-5 text-black" />
              </div>
              <p className="text-xs text-slate-500">
                {type.name === "All" ? "Admin" : type.name}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="rounded-2xl md:hidden flex  gap-3 p-4 mt-4">
        <DateFilter
          range={range}
          setRange={setRange}
          open={open}
          setOpen={setOpen}
          onDateChange={onDateChange}
        />
        <div className="h-[35px] w-[1px] bg-[#DDDDDD]" />
        <TypeFilter
          types={types}
          type={type}
          setType={setType}
          onTypeChange={onTypeChange}
        />
      </div>
    </header>
  );
}
