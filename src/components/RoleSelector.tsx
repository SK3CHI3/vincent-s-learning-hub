import { motion } from "framer-motion";
import { GraduationCap, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export type UserRole = "student" | "admin";

interface RoleSelectorProps {
  onSelectRole: (role: UserRole) => void;
}

const roles = [
  {
    id: "student" as UserRole,
    icon: GraduationCap,
    title: "I'm a Learner",
    description: "Access lessons, take quizzes, and earn certificates",
    features: ["Watch video lessons", "Take quizzes", "Download certificates"],
  },
  {
    id: "admin" as UserRole,
    icon: ShieldCheck,
    title: "I'm an Admin",
    description: "Monitor learner progress and review analytics",
    features: ["View analytics dashboard", "Track learner engagement", "Monitor quiz performance"],
  },
];

const RoleSelector = ({ onSelectRole }: RoleSelectorProps) => {
  const [hoveredRole, setHoveredRole] = useState<UserRole | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12 relative z-10"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-elevated">
          <span className="text-2xl sm:text-3xl font-display font-bold text-accent">V</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
          Welcome to Vincent AI
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
          IDP Foundation's AI-powered leadership training platform. How would you like to continue?
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl relative z-10">
        {roles.map((role, i) => (
          <motion.button
            key={role.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            onMouseEnter={() => setHoveredRole(role.id)}
            onMouseLeave={() => setHoveredRole(null)}
            onClick={() => onSelectRole(role.id)}
            className={cn(
              "relative flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 group",
              "bg-card shadow-card hover:shadow-elevated",
              hoveredRole === role.id
                ? "border-accent scale-[1.02]"
                : "border-border hover:border-accent/50"
            )}
          >
            <div
              className={cn(
                "w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-300",
                hoveredRole === role.id ? "gradient-accent shadow-glow" : "gradient-primary"
              )}
            >
              <role.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
            </div>

            <h2 className="text-lg sm:text-xl font-display font-bold text-foreground mb-1.5">
              {role.title}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              {role.description}
            </p>

            <ul className="space-y-2 w-full mb-5">
              {role.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                hoveredRole === role.id ? "text-accent" : "text-muted-foreground"
              )}
            >
              Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 sm:mt-8 text-xs text-muted-foreground relative z-10"
      >
        You can switch roles anytime from your profile.
      </motion.p>
    </div>
  );
};

export default RoleSelector;
