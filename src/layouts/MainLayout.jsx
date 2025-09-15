import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/common/SideBar";
import Navbar from "../components/common/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <div className="flex background max-md:h-[200vh] h-[50vh] ">
        <div
          className={`lg:block bg-white fixed hidden z-10 w-[265px] sideBar rounded-[20px] shadow-md`}
        >
          <SideBar />
        </div>
        <div
          className={`flex-1 flex flex-col max-lg:ml-0 h-fitlg:ml-24"
            transition-margin duration-300`}
        >
          <Navbar />
          <main className="overflow-auto flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
