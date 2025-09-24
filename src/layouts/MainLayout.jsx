// src/layouts/MainLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import Header from "../components/common/Header"; 

export default function MainLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="h-full lg:min-h-screen bg-[#354D92] flex">

      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col m-3 md:h-[96vh] ml-3 lg:ml-28 mr-3 w-full bg-[#F5F7FA] rounded-2xl shadow">

          <div className="block md:hidden">
          <Header onOpenMobileNav={() => setMobileNavOpen(true)} />
          </div>

          <Navbar
            open={mobileNavOpen}
            onClose={() => setMobileNavOpen(false)}
          />

          <main className="overflow-y-auto flex-1 p-0 md:p-2 scrollbar-hide">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
