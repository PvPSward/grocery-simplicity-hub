
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart4, 
  CreditCard, 
  Settings, 
  Menu, 
  ChevronLeft,
  BadgeDollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { 
    name: "Dashboard", 
    path: "/", 
    icon: <LayoutDashboard className="h-5 w-5" /> 
  },
  { 
    name: "Sales", 
    path: "/sales", 
    icon: <ShoppingCart className="h-5 w-5" /> 
  },
  { 
    name: "Inventory", 
    path: "/inventory", 
    icon: <Package className="h-5 w-5" /> 
  },
  {
    name: "Loans",
    path: "/loans",
    icon: <BadgeDollarSign className="h-5 w-5" />
  },
  { 
    name: "Users", 
    path: "/users", 
    icon: <Users className="h-5 w-5" /> 
  },
  { 
    name: "Reports", 
    path: "/reports", 
    icon: <BarChart4 className="h-5 w-5" /> 
  },
  { 
    name: "Payments", 
    path: "/payments", 
    icon: <CreditCard className="h-5 w-5" /> 
  },
  { 
    name: "Settings", 
    path: "/settings", 
    icon: <Settings className="h-5 w-5" /> 
  }
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "bg-card text-card-foreground border-r border-border transition-all duration-300 ease-smooth flex flex-col",
        isOpen ? "w-60" : "w-20"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border h-16">
        {isOpen ? (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold">
              AI
            </div>
            <span className="font-semibold whitespace-nowrap overflow-hidden transition-all duration-300">
              A.I Stores
            </span>
          </div>
        ) : (
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold mx-auto">
            AI
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(isOpen ? "flex" : "hidden")}
          onClick={() => setIsOpen(false)}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(!isOpen ? "flex" : "hidden")}
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent",
                  location.pathname === item.path ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground",
                  !isOpen && "justify-center"
                )}
              >
                {item.icon}
                {isOpen && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium shrink-0">
            JD
          </div>
          {isOpen && (
            <div className="overflow-hidden">
              <p className="font-medium text-sm truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">Admin</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
