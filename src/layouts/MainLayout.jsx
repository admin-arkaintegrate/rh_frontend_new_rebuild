import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
// import Navbar from "../components/common/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#354D92] flex ">
      <Sidebar />

      {/* Centered content */}
      <div className="flex flex-1 items-center justify-center green">
        <div className="flex  flex-col h-[96vh] ml-28 mr-3  w-full bg-[#F5F7FA] rounded-2xl shadow">
          {/* <Navbar /> */}
          <main className="overflow-auto flex-1 p-2 scrollbar-hide">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
