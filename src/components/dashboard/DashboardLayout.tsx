import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <div className="flex">
        <div className="sticky h-screen left-0 top-0">
          <Sidebar />
        </div>
        <div className="flex-grow">
          <main className={` overflow-x-auto`}>{children}</main>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
