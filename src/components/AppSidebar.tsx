import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  PlayCircle,
  BarChart3,
  Award,
  User,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserRole } from "./RoleSelector";

interface AppSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  role: UserRole;
  onLogout: () => void;
}

const allNavItems = [
  { id: "dashboard", icon: LayoutGrid, label: "Dashboard", roles: ["student", "admin"] },
  { id: "lesson", icon: PlayCircle, label: "Lessons", roles: ["student"] },
  { id: "analytics", icon: BarChart3, label: "Analytics", roles: ["admin"] },
  { id: "certificate", icon: Award, label: "Certificates", roles: ["student"] },
];

const AppSidebar = ({ activeView, onViewChange, role, onLogout }: AppSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = allNavItems.filter((item) => item.roles.includes(role));

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between w-full px-3 mb-6">
        <button
          onClick={() => {
            if (window.innerWidth < 768) {
              setMobileOpen(false);
            } else {
              setCollapsed(!collapsed);
            }
          }}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-primary hover:text-accent-foreground transition-colors"
        >
          {collapsed && !mobileOpen ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>

      {(!collapsed || mobileOpen) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 px-4 text-center"
        >
          <h2 className="text-sm font-bold tracking-wider text-sidebar-foreground uppercase font-display">
            Vincent AI
          </h2>
          <p className="text-xs text-sidebar-foreground/60 mt-1">by IDPF</p>
          <span className="inline-block mt-2 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-sidebar-accent text-sidebar-foreground/80">
            {role}
          </span>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="flex flex-col gap-1.5 w-full px-3 flex-1">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onViewChange(item.id);
                setMobileOpen(false);
              }}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 text-sm",
                isActive
                  ? "bg-sidebar-primary text-accent-foreground shadow-glow"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {(!collapsed || mobileOpen) && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="mt-auto flex flex-col gap-1.5 w-full px-3 pb-2">
        <button className="flex items-center gap-3 px-3 py-3 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm">
          <User className="w-5 h-5 shrink-0" />
          {(!collapsed || mobileOpen) && <span className="font-medium">Profile</span>}
        </button>
        <button
          onClick={() => { onLogout(); setMobileOpen(false); }}
          className="flex items-center gap-3 px-3 py-3 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {(!collapsed || mobileOpen) && <span className="font-medium">Switch Role</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 w-10 h-10 rounded-lg gradient-hero flex items-center justify-center text-sidebar-foreground shadow-elevated"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-foreground/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "md:hidden fixed top-0 left-0 h-full w-64 gradient-hero flex flex-col items-center py-6 z-50 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex gradient-hero flex-col items-center py-6 transition-all duration-300 shrink-0",
          collapsed ? "w-16" : "w-56"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default AppSidebar;
