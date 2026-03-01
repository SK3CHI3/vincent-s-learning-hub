import { useState } from "react";
import { Search, Bell } from "lucide-react";
import AppSidebar from "@/components/AppSidebar";
import ModuleDashboard from "@/components/ModuleDashboard";
import LessonView from "@/components/LessonView";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import CertificateView from "@/components/CertificateView";
import RoleSelector, { UserRole } from "@/components/RoleSelector";
import { Lesson, modules } from "@/data/courseData";

const Index = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setActiveView("lesson");
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
    if (view === "lesson" && !selectedLesson) {
      setSelectedLesson(modules[0].lessons[0]);
    }
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setActiveView(selectedRole === "admin" ? "analytics" : "dashboard");
  };

  const handleLogout = () => {
    setRole(null);
    setActiveView("dashboard");
    setSelectedLesson(null);
  };

  if (!role) {
    return <RoleSelector onSelectRole={handleRoleSelect} />;
  }

  const renderContent = () => {
    if (role === "admin") {
      switch (activeView) {
        case "dashboard":
          return <AdminDashboard />;
        case "analytics":
          return <AnalyticsDashboard />;
        default:
          return <AdminDashboard />;
      }
    }

    switch (activeView) {
      case "dashboard":
        return <ModuleDashboard onSelectLesson={handleSelectLesson} />;
      case "lesson":
        return selectedLesson ? (
          <LessonView
            lesson={selectedLesson}
            onComplete={() => setActiveView("certificate")}
          />
        ) : null;
      case "certificate":
        return <CertificateView />;
      default:
        return <ModuleDashboard onSelectLesson={handleSelectLesson} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar
        activeView={activeView}
        onViewChange={handleViewChange}
        role={role}
        onLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 bg-card border-b border-border">
          <div className="flex items-center gap-3 flex-1 max-w-md ml-12 md:ml-0">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search lessons, quizzes..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0"
            />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
            </button>
            <div className="w-9 h-9 rounded-full gradient-accent flex items-center justify-center text-sm font-bold text-accent-foreground">
              {role === "admin" ? "A" : "L"}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
