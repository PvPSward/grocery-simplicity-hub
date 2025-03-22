
import { Button } from "@/components/ui/button";
import { Bell, Search, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface HeaderBarProps {
  toggleSidebar: () => void;
}

export default function HeaderBar({ toggleSidebar }: HeaderBarProps) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="h-16 border-b border-border px-4 flex items-center justify-between bg-card/80 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          showSearch ? "w-full md:w-80" : "w-0 md:w-80"
        )}>
          {(showSearch || window.innerWidth >= 768) && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className="w-full pl-9 h-9"
                onBlur={() => window.innerWidth < 768 && setShowSearch(false)}
              />
            </div>
          )}
        </div>
        {!showSearch && window.innerWidth < 768 && (
          <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
            <Search className="h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        <div className="h-9 w-px bg-border mx-1 hidden md:block" />
        <span className="text-sm font-medium hidden md:block">John Doe</span>
      </div>
    </header>
  );
}
