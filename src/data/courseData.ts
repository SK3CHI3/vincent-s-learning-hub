import lessonThumb1 from "@/assets/lesson-thumbnail-1.jpg";
import lessonThumb2 from "@/assets/lesson-thumbnail-2.jpg";
import lessonThumb3 from "@/assets/lesson-thumbnail-3.jpg";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  moduleId: string;
  order: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  progress: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  lessonId: string;
  questions: QuizQuestion[];
  passThreshold: number;
}

export interface UserProgress {
  lessonId: string;
  watchPercentage: number;
  quizScore: number | null;
  quizAttempts: number;
  completed: boolean;
  completedAt?: string;
}

export const modules: Module[] = [
  {
    id: "mod-1",
    title: "Foundations of School Leadership",
    description: "Learn the fundamentals of effective school leadership in developing communities.",
    progress: 65,
    lessons: [
      {
        id: "lesson-1",
        title: "Introduction to School Leadership",
        description: "What makes a great school leader? Vincent explores the core principles that drive impactful education in low-resource settings.",
        duration: "4:32",
        thumbnail: lessonThumb1,
        moduleId: "mod-1",
        order: 1,
      },
      {
        id: "lesson-2",
        title: "Building a Learning Community",
        description: "How to create a collaborative environment among teachers, parents, and community stakeholders.",
        duration: "3:48",
        thumbnail: lessonThumb2,
        moduleId: "mod-1",
        order: 2,
      },
      {
        id: "lesson-3",
        title: "Resource Management for Schools",
        description: "Practical strategies for making the most of limited resources to maximize student outcomes.",
        duration: "5:10",
        thumbnail: lessonThumb3,
        moduleId: "mod-1",
        order: 3,
      },
    ],
  },
];

export const quizzes: Record<string, Quiz> = {
  "lesson-1": {
    lessonId: "lesson-1",
    passThreshold: 70,
    questions: [
      {
        id: "q1",
        question: "What is the primary role of a school leader in a developing community?",
        options: [
          "Managing the budget exclusively",
          "Creating an environment where every child can learn effectively",
          "Disciplining students",
          "Handling government paperwork",
        ],
        correctIndex: 1,
        explanation: "A school leader's primary role is creating an environment where every child can learn effectively, going beyond administrative tasks.",
      },
      {
        id: "q2",
        question: "According to Vincent, which quality is most important for school leaders?",
        options: [
          "Strict discipline",
          "Academic credentials",
          "Empathy and adaptability",
          "Political connections",
        ],
        correctIndex: 2,
        explanation: "Vincent emphasizes that empathy and adaptability allow leaders to understand community needs and respond to challenges creatively.",
      },
      {
        id: "q3",
        question: "What is the recommended approach to community engagement?",
        options: [
          "Top-down communication only",
          "Inclusive partnership with parents and local leaders",
          "Keeping the community at a distance",
          "Only involving government officials",
        ],
        correctIndex: 1,
        explanation: "Inclusive partnership ensures that the school reflects the community's values and gains essential support.",
      },
    ],
  },
  "lesson-2": {
    lessonId: "lesson-2",
    passThreshold: 70,
    questions: [
      {
        id: "q4",
        question: "What is the first step in building a learning community?",
        options: [
          "Hiring more teachers",
          "Establishing trust between all stakeholders",
          "Building new classrooms",
          "Creating strict rules",
        ],
        correctIndex: 1,
        explanation: "Trust is the foundation upon which all collaborative efforts are built.",
      },
      {
        id: "q5",
        question: "How should teachers be supported in a learning community?",
        options: [
          "Through regular evaluation only",
          "Through peer mentorship and ongoing professional development",
          "By leaving them alone",
          "Through financial incentives only",
        ],
        correctIndex: 1,
        explanation: "Peer mentorship and ongoing professional development create sustainable growth.",
      },
    ],
  },
  "lesson-3": {
    lessonId: "lesson-3",
    passThreshold: 70,
    questions: [
      {
        id: "q6",
        question: "What is the most effective approach to resource management in schools?",
        options: [
          "Spending everything at once",
          "Prioritizing based on student impact",
          "Saving all funds for emergencies",
          "Copying other schools exactly",
        ],
        correctIndex: 1,
        explanation: "Prioritizing spending based on direct student impact ensures maximum educational value.",
      },
    ],
  },
};

export const analyticsData = {
  totalUsers: 247,
  activeUsers: 182,
  averageCompletion: 73,
  averageQuizScore: 81,
  weeklyEngagement: [
    { day: "Mon", users: 45, completions: 12 },
    { day: "Tue", users: 62, completions: 18 },
    { day: "Wed", users: 58, completions: 15 },
    { day: "Thu", users: 71, completions: 22 },
    { day: "Fri", users: 53, completions: 14 },
    { day: "Sat", users: 38, completions: 8 },
    { day: "Sun", users: 29, completions: 6 },
  ],
  modulePerformance: [
    { module: "Lesson 1", avgScore: 85, attempts: 198, passRate: 78 },
    { module: "Lesson 2", avgScore: 79, attempts: 156, passRate: 71 },
    { module: "Lesson 3", avgScore: 82, attempts: 112, passRate: 75 },
  ],
  recentActivity: [
    { user: "Kwame A.", action: "Completed Lesson 1 Quiz", score: 90, time: "2 min ago" },
    { user: "Ama B.", action: "Started Lesson 2", score: null, time: "5 min ago" },
    { user: "Kofi M.", action: "Downloaded Certificate", score: null, time: "12 min ago" },
    { user: "Abena S.", action: "Completed Lesson 3 Quiz", score: 85, time: "18 min ago" },
    { user: "Yaw K.", action: "Retook Lesson 1 Quiz", score: 75, time: "25 min ago" },
  ],
};
