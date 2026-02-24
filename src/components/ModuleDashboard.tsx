import { motion } from "framer-motion";
import { PlayCircle, CheckCircle2, Clock, BookOpen } from "lucide-react";
import { modules, Lesson } from "@/data/courseData";
import { cn } from "@/lib/utils";

interface ModuleDashboardProps {
  onSelectLesson: (lesson: Lesson) => void;
}

const ModuleDashboard = ({ onSelectLesson }: ModuleDashboardProps) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Welcome back, Learner
        </h1>
        <p className="text-muted-foreground mt-1">
          Continue your journey with Vincent's leadership training.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Modules", value: "1", icon: BookOpen, color: "gradient-primary" },
          { label: "Lessons Completed", value: "1/3", icon: CheckCircle2, color: "gradient-accent" },
          { label: "Time Spent", value: "12 min", icon: Clock, color: "bg-success" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-4 shadow-card flex items-center gap-4"
          >
            <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", stat.color)}>
              <stat.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modules */}
      {modules.map((module) => (
        <div key={module.id}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-display font-bold text-foreground">
                {module.title}
              </h2>
              <p className="text-sm text-muted-foreground">{module.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full gradient-accent rounded-full"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {module.progress}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {module.lessons.map((lesson, i) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                onClick={() => onSelectLesson(lesson)}
                className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow cursor-pointer group"
              >
                <div className="relative aspect-video">
                  <img
                    src={lesson.thumbnail}
                    alt={lesson.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/30 transition-colors flex items-center justify-center">
                    <PlayCircle className="w-12 h-12 text-primary-foreground opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="absolute bottom-2 right-2 bg-primary/80 text-primary-foreground text-xs px-2 py-0.5 rounded">
                    {lesson.duration}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="font-display font-bold text-sm text-foreground line-clamp-1">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {lesson.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuleDashboard;
