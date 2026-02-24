import { useState } from "react";
import { Search, Bell } from "lucide-react";
import AppSidebar from "@/components/AppSidebar";
import ModuleDashboard from "@/components/ModuleDashboard";
import LessonView from "@/components/LessonView";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import CertificateView from "@/components/CertificateView";
import { Lesson, modules } from "@/data/courseData";

const Index = () => {
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

  const renderContent = () => {
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
      case "analytics":
        return <AnalyticsDashboard />;
      case "certificate":
        return <CertificateView />;
      default:
        return <ModuleDashboard onSelectLesson={handleSelectLesson} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar activeView={activeView} onViewChange={handleViewChange} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="shrink-0 flex items-center justify-between px-6 py-3 bg-card border-b border-border">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search lessons, quizzes..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
            </button>
            <div className="w-9 h-9 rounded-full gradient-accent flex items-center justify-center text-sm font-bold text-accent-foreground">
              L
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
