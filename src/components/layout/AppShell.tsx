
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import HeaderBar from "./HeaderBar";

export default function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate loading for smooth page transitions
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="h-full flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className={cn(
          "flex-1 overflow-auto p-6",
          isLoading ? "opacity-0" : "opacity-100 animate-fade-in"
        )}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
