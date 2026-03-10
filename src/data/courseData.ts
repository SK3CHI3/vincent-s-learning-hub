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
    title: "Financial Sustainability for Schools",
    description: "Learn how to build financial stability and plan for sustainable growth in your institution.",
    progress: 65,
    lessons: [
      {
        id: "lesson-1",
        title: "The Reality of School Sustainability",
        description: "Understand why financial sustainability matters and how structure strengthens your school's foundation.",
        duration: "4:32",
        thumbnail: lessonThumb1,
        moduleId: "mod-1",
        order: 1,
      },
      {
        id: "lesson-2",
        title: "Understanding the Flow of Money",
        description: "Learn to track income and spending with clarity so decisions are driven by awareness, not assumption.",
        duration: "3:48",
        thumbnail: lessonThumb2,
        moduleId: "mod-1",
        order: 2,
      },
      {
        id: "lesson-3",
        title: "Planning for Stability and Growth",
        description: "Build financial preparedness and learn to grow your institution strategically and sustainably.",
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
        question: "According to the session, what does financial sustainability in a school primarily mean?",
        options: [
          "Maximizing profit from tuition fees",
          "Stability — ensuring the school remains steady even when payments delay or enrollment shifts",
          "Cutting costs wherever possible",
          "Relying on external donors for support",
        ],
        correctIndex: 1,
        explanation: "Financial sustainability is about stability — knowing that even if payments delay or enrollment shifts, your school remains steady.",
      },
      {
        id: "q2",
        question: "What does the session identify as the root problem when school leaders feel things are 'tight' despite working hard?",
        options: [
          "Teachers are not committed enough",
          "Enrollment numbers are too low",
          "The structure needs strengthening",
          "Fees are set too low",
        ],
        correctIndex: 2,
        explanation: "Feeling financial pressure despite hard work means the structure needs strengthening, not that there is failure.",
      },
      {
        id: "q3",
        question: "What does 'operating term by term' lead to, according to the session?",
        options: [
          "Strong financial planning",
          "A reactive cycle where fees come in and urgent bills go out repeatedly",
          "Increased enrollment",
          "Better staff retention",
        ],
        correctIndex: 1,
        explanation: "Operating term by term creates a reactive cycle — fees come in, urgent bills go out, and the cycle repeats without true leadership.",
      },
      {
        id: "q4",
        question: "What does the session say is required before leadership can happen?",
        options: [
          "More funding",
          "Government support",
          "Clarity, which requires structure",
          "Larger enrollment",
        ],
        correctIndex: 2,
        explanation: "Leadership requires clarity, and clarity requires structure — specifically understanding your financial foundation.",
      },
    ],
  },
  "lesson-2": {
    lessonId: "lesson-2",
    passThreshold: 70,
    questions: [
      {
        id: "q5",
        question: "What lies between the movement of money in and money out of a school?",
        options: [
          "Profit or loss",
          "Control or confusion",
          "Growth or decline",
          "Success or failure",
        ],
        correctIndex: 1,
        explanation: "Between income and expenses lies either control or confusion — visibility into your finances determines which one.",
      },
      {
        id: "q6",
        question: "Why is estimation not the same as visibility when it comes to school finances?",
        options: [
          "Estimates are always wrong",
          "Estimation misses patterns, delays, and quietly widening gaps",
          "Visibility requires expensive software",
          "Estimates are only useful for large schools",
        ],
        correctIndex: 1,
        explanation: "When income isn't clearly tracked week by week, patterns are missed, delays go unnoticed, and gaps widen quietly.",
      },
      {
        id: "q7",
        question: "What does the session say typically destabilizes a school financially?",
        options: [
          "One dramatic spending decision",
          "The accumulation of small approvals and minor purchases over time",
          "Staff salary increases",
          "Government policy changes",
        ],
        correctIndex: 1,
        explanation: "It is rarely one dramatic decision — it is the accumulation of small approvals and expenses that seem minor in the moment.",
      },
      {
        id: "q8",
        question: "What single question should a school leader ask before committing resources?",
        options: [
          "Can we afford this right now?",
          "Does this align with our current plan?",
          "Will parents approve of this?",
          "Is this cheaper than the alternative?",
        ],
        correctIndex: 1,
        explanation: "The key question is 'Does this align with our current plan?' — that single pause before spending can protect months of effort.",
      },
    ],
  },
  "lesson-3": {
    lessonId: "lesson-3",
    passThreshold: 70,
    questions: [
      {
        id: "q9",
        question: "According to the session, what is stability really about?",
        options: [
          "Having full classrooms and engaged parents",
          "Appearances of success",
          "Preparedness for unexpected challenges",
          "Having the largest enrollment in the area",
        ],
        correctIndex: 2,
        explanation: "Stability is not about appearance — it is about preparedness for moments when payments delay, enrollment shifts, or unexpected repairs arise.",
      },
      {
        id: "q10",
        question: "What does building a modest financial cushion allow a school leader to do?",
        options: [
          "Expand the school immediately",
          "Make calmer decisions and lead more steadily",
          "Increase staff salaries right away",
          "Stop tracking expenses",
        ],
        correctIndex: 1,
        explanation: "A financial cushion means decisions become calmer and leadership becomes steadier — operating from intention rather than urgency.",
      },
      {
        id: "q11",
        question: "What question should be asked before expanding — adding classrooms, staff, or programs?",
        options: [
          "Will this impress the community?",
          "Can we sustain this comfortably?",
          "Are other schools doing this?",
          "Is there government funding available?",
        ],
        correctIndex: 1,
        explanation: "'Can we sustain this comfortably?' is the single question that protects institutions from unstable growth.",
      },
      {
        id: "q12",
        question: "The session states that stability is not accidental. What is it?",
        options: [
          "Lucky",
          "Inherited",
          "Designed deliberately",
          "Guaranteed by enrollment",
        ],
        correctIndex: 2,
        explanation: "Stability is not accidental — it is designed. A stable school reviews its numbers consistently and adjusts early from discipline, not fear.",
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
    { module: "Session 1", avgScore: 85, attempts: 198, passRate: 78 },
    { module: "Session 2", avgScore: 79, attempts: 156, passRate: 71 },
    { module: "Session 3", avgScore: 82, attempts: 112, passRate: 75 },
  ],
  recentActivity: [
    { user: "Kwame A.", action: "Completed Session 1 Quiz", score: 90, time: "2 min ago" },
    { user: "Ama B.", action: "Started Session 2", score: null, time: "5 min ago" },
    { user: "Kofi M.", action: "Downloaded Certificate", score: null, time: "12 min ago" },
    { user: "Abena S.", action: "Completed Session 3 Quiz", score: 85, time: "18 min ago" },
    { user: "Yaw K.", action: "Retook Session 1 Quiz", score: 75, time: "25 min ago" },
  ],
};
