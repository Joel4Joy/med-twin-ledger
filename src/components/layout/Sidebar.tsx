import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  Activity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Medicine Inventory",
    href: "/inventory",
    icon: Package,
  },
  {
    title: "Suppliers",
    href: "/suppliers",
    icon: Users,
  },
  {
    title: "Usage Logs",
    href: "/usage-logs",
    icon: FileText,
  },
  {
    title: "Expenses",
    href: "/expenses",
    icon: DollarSign,
  },
  {
    title: "Predictive Analytics",
    href: "/analytics",
    icon: TrendingUp,
  },
  {
    title: "Digital Twin",
    href: "/simulation",
    icon: Activity,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-card shadow-soft transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card-header">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">HealthChain AI</h1>
              <p className="text-xs text-muted-foreground">Digital Twin</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0 hover:bg-accent"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                isCollapsed ? "justify-center" : "justify-start"
              )}
            >
              <item.icon className={cn("w-5 h-5", isCollapsed ? "mx-0" : "mx-0")} />
              {!isCollapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t bg-card-header">
        <div className="flex items-center space-x-2">
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-xs font-medium">System Status</p>
              <div className="flex items-center space-x-1 mt-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-xs text-success">All Systems Online</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}