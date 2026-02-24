import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  PlayCircle,
  BarChart3,
  Award,
  Search,
  User,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navItems = [
  { id: "dashboard", icon: LayoutGrid, label: "Dashboard" },
  { id: "lesson", icon: PlayCircle, label: "Lessons" },
  { id: "analytics", icon: BarChart3, label: "Analytics" },
  { id: "certificate", icon: Award, label: "Certificates" },
];

const AppSidebar = ({ activeView, onViewChange }: AppSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "gradient-hero flex flex-col items-center py-6 transition-all duration-300 shrink-0",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Logo */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-8 flex items-center justify-center w-10 h-10 rounded-lg bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-primary hover:text-accent-foreground transition-colors"
      >
        {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
      </button>

      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 px-4 text-center"
        >
          <h2 className="text-sm font-bold tracking-wider text-sidebar-foreground uppercase font-display">
            Vincent AI
          </h2>
          <p className="text-xs text-sidebar-foreground/60 mt-1">by IDPF</p>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="flex flex-col gap-2 w-full px-3">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm",
                isActive
                  ? "bg-sidebar-primary text-accent-foreground shadow-glow"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="mt-auto flex flex-col gap-2 w-full px-3">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm">
          <User className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="font-medium">Profile</span>}
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
