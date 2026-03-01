import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  TrendingUp,
  Award,
  BookOpen,
  ArrowUpRight,
  LayoutGrid,
} from "lucide-react";
import { analyticsData, modules } from "@/data/courseData";
import { cn } from "@/lib/utils";

const COLORS = [
  "hsl(224, 52%, 23%)",
  "hsl(42, 55%, 55%)",
  "hsl(152, 60%, 40%)",
  "hsl(210, 80%, 55%)",
];

const pieData = [
  { name: "Completed", value: 73 },
  { name: "In Progress", value: 18 },
  { name: "Not Started", value: 9 },
];

const AdminDashboard = () => {
  const stats = [
    { label: "Total Learners", value: analyticsData.totalUsers, icon: Users, change: "+12%" },
    { label: "Active This Week", value: analyticsData.activeUsers, icon: TrendingUp, change: "+8%" },
    { label: "Avg. Completion", value: `${analyticsData.averageCompletion}%`, icon: BookOpen, change: "+3%" },
    { label: "Avg. Quiz Score", value: `${analyticsData.averageQuizScore}%`, icon: Award, change: "+5%" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Overview of learner engagement and platform performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-3 sm:p-4 shadow-card"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              </div>
              <span className="flex items-center text-[10px] sm:text-xs font-medium text-success">
                <ArrowUpRight className="w-3 h-3" />
                {stat.change}
              </span>
            </div>
            <p className="text-lg sm:text-2xl font-bold font-display text-foreground">{stat.value}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Module Overview for Admin */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl p-3 sm:p-4 shadow-card"
      >
        <h3 className="font-display font-bold text-foreground mb-3 text-sm sm:text-base flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-muted-foreground" />
          Modules Overview
        </h3>
        <div className="space-y-3">
          {modules.map((module) => (
            <div key={module.id} className="flex items-center gap-3 p-2 sm:p-3 rounded-lg bg-muted/50">
              <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-foreground truncate">{module.title}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{module.lessons.length} lessons</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-16 sm:w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-accent rounded-full" style={{ width: `${module.progress}%` }} />
                </div>
                <span className="text-[10px] sm:text-xs text-muted-foreground font-medium w-8 text-right">{module.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Engagement Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl p-3 sm:p-4 shadow-card lg:col-span-2"
        >
          <h3 className="font-display font-bold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">
            Weekly Engagement
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={analyticsData.weeklyEngagement}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 88%)" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 16%, 88%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="users" fill="hsl(224, 52%, 23%)" radius={[4, 4, 0, 0]} name="Users" />
              <Bar dataKey="completions" fill="hsl(42, 55%, 55%)" radius={[4, 4, 0, 0]} name="Completions" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Completion Pie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl p-3 sm:p-4 shadow-card"
        >
          <h3 className="font-display font-bold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">
            Completion Rate
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                dataKey="value"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {pieData.map((item, i) => (
              <div key={item.name} className="flex items-center gap-2 text-[10px] sm:text-xs">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                <span className="text-muted-foreground">{item.name}</span>
                <span className="ml-auto font-medium text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quiz Performance & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl p-3 sm:p-4 shadow-card"
        >
          <h3 className="font-display font-bold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">
            Quiz Performance
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={analyticsData.modulePerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 88%)" />
              <XAxis dataKey="module" tick={{ fontSize: 10 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(220, 10%, 46%)" />
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 16%, 88%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Line type="monotone" dataKey="avgScore" stroke="hsl(224, 52%, 23%)" strokeWidth={2} name="Avg Score" />
              <Line type="monotone" dataKey="passRate" stroke="hsl(42, 55%, 55%)" strokeWidth={2} name="Pass Rate" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-xl p-3 sm:p-4 shadow-card"
        >
          <h3 className="font-display font-bold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">
            Recent Activity
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {analyticsData.recentActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full gradient-primary flex items-center justify-center text-[10px] sm:text-xs font-bold text-primary-foreground shrink-0">
                  {activity.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                    {activity.user}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                    {activity.action}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  {activity.score && (
                    <p className="text-xs sm:text-sm font-bold text-success">{activity.score}%</p>
                  )}
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
