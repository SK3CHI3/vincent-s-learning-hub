import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ThumbsUp,
  Share2,
  Download,
  FileText,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Lesson, Quiz, QuizQuestion, quizzes } from "@/data/courseData";

interface LessonViewProps {
  lesson: Lesson;
  onComplete: () => void;
}

const parseDuration = (duration: string): number => {
  const parts = duration.split(":").map(Number);
  return parts[0] * 60 + parts[1];
};

const formatTime = (totalSeconds: number): string => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const LessonView = ({ lesson, onComplete }: LessonViewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const quiz = quizzes[lesson.id];
  const totalSeconds = parseDuration(lesson.duration);
  const currentSeconds = (progress / 100) * totalSeconds;

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval.current!);
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.5;
        });
      }, 150);
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current);
    }
  };

  const handleFullscreen = useCallback(async () => {
    if (!videoContainerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await videoContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.log("Fullscreen not supported");
    }
  }, []);

  const handleDownloadNotes = () => {
    import("jspdf").then(({ jsPDF }) => {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // Header
      doc.setFillColor(27, 42, 91);
      doc.rect(0, 0, pageWidth, 35, "F");
      doc.setTextColor(212, 168, 67);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("IDPF - Vincent AI Training", pageWidth / 2, 15, { align: "center" });
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255);
      doc.text("Lesson Notes", pageWidth / 2, 25, { align: "center" });
      
      // Content
      let y = 45;
      doc.setTextColor(27, 42, 91);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(lesson.title, 15, y);
      y += 10;
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      const descLines = doc.splitTextToSize(lesson.description, pageWidth - 30);
      doc.text(descLines, 15, y);
      y += descLines.length * 5 + 10;
      
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(27, 42, 91);
      doc.text("Key Takeaways", 15, y);
      y += 8;
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      const takeaways = [
        "Focus on practical, community-based approaches",
        "Engage all stakeholders in the learning process",
        "Apply leadership principles to real school challenges",
        "Build sustainable systems for long-term impact",
      ];
      takeaways.forEach((t) => {
        doc.text(`•  ${t}`, 18, y);
        y += 6;
      });
      y += 8;
      
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(27, 42, 91);
      doc.text("Quiz Review", 15, y);
      y += 8;
      
      doc.setFontSize(10);
      quiz.questions.forEach((q, i) => {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(27, 42, 91);
        const qLines = doc.splitTextToSize(`${i + 1}. ${q.question}`, pageWidth - 30);
        doc.text(qLines, 15, y);
        y += qLines.length * 5 + 3;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(34, 120, 69);
        doc.text(`Answer: ${q.options[q.correctIndex]}`, 20, y);
        y += 5;
        doc.setTextColor(100, 100, 100);
        const expLines = doc.splitTextToSize(q.explanation, pageWidth - 35);
        doc.text(expLines, 20, y);
        y += expLines.length * 5 + 6;
      });
      
      doc.save(`${lesson.title.replace(/\s+/g, "_")}_Notes.pdf`);
    });
  };

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    const isCorrect = index === quiz.questions[currentQuestion].correctIndex;
    if (isCorrect) setScore((s) => s + 1);
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = isCorrect;
    setAnsweredQuestions(newAnswered);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const quizPassed =
    showResult && (score / quiz.questions.length) * 100 >= quiz.passThreshold;

  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 h-full">
      {/* Main Video Area */}
      <div className="flex-1 min-w-0">
        {/* Video Player */}
        <div
          ref={videoContainerRef}
          className={cn(
            "relative rounded-xl overflow-hidden bg-primary shadow-elevated group",
            isFullscreen && "rounded-none"
          )}
        >
          <img
            src={lesson.thumbnail}
            alt={lesson.title}
            className="w-full aspect-video object-cover"
          />
          {/* Play overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-primary/30 group-hover:bg-primary/40 transition-colors"
            onClick={handlePlay}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent flex items-center justify-center shadow-glow"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 sm:w-7 sm:h-7 text-accent-foreground" />
              ) : (
                <Play className="w-6 h-6 sm:w-7 sm:h-7 text-accent-foreground ml-1" />
              )}
            </motion.div>
          </div>

          {/* Controls bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-3 sm:p-4">
            {/* Progress */}
            <div className="w-full h-1 bg-primary-foreground/20 rounded-full mb-2 sm:mb-3 cursor-pointer">
              <div
                className="h-full gradient-accent rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <button onClick={handlePlay} className="text-primary-foreground hover:text-accent transition-colors">
                  {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
                <span className="text-[10px] sm:text-xs text-primary-foreground/80 font-body">
                  {formatTime(currentSeconds)} / {lesson.duration}
                </span>
                <button onClick={() => setIsMuted(!isMuted)} className="text-primary-foreground hover:text-accent transition-colors">
                  {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button onClick={handleFullscreen} className="text-primary-foreground hover:text-accent transition-colors">
                  {isFullscreen ? <Minimize className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Info */}
        <div className="mt-3 sm:mt-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <div>
              <h1 className="text-base sm:text-xl font-display font-bold text-foreground">
                {lesson.title}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 flex items-center gap-2">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full gradient-accent flex items-center justify-center text-xs font-bold text-accent-foreground shrink-0">
                  V
                </span>
                by Vincent • IDPF
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-xs sm:text-sm">
                <ThumbsUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 145
              </button>
              <button className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-xs sm:text-sm">
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
            {lesson.description}
          </p>
        </div>
      </div>

      {/* Right Sidebar - Quiz & Attachments */}
      <div className="w-full lg:w-80 shrink-0 flex flex-col gap-3 sm:gap-4">
        {/* Attachments */}
        <div className="bg-card rounded-xl p-3 sm:p-4 shadow-card">
          <h3 className="font-display font-bold text-foreground mb-3 text-sm sm:text-base">Attachments</h3>
          <div className="space-y-2 sm:space-y-3">
            <button
              onClick={handleDownloadNotes}
              className="flex items-center gap-3 w-full p-2.5 sm:p-3 rounded-lg bg-muted hover:bg-accent/20 transition-colors text-left"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg gradient-accent flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-accent-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-foreground">Lesson Notes</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">PDF • Download</p>
              </div>
              <Download className="w-4 h-4 text-muted-foreground ml-auto shrink-0" />
            </button>
            <button className="flex items-center gap-3 w-full p-2.5 sm:p-3 rounded-lg bg-muted hover:bg-accent/20 transition-colors text-left">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-success flex items-center justify-center shrink-0">
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-foreground">Quiz</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  {quiz.questions.length} questions
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto shrink-0" />
            </button>
          </div>
        </div>

        {/* Quiz Panel */}
        <div className="bg-card rounded-xl p-3 sm:p-4 shadow-card flex-1">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="font-display font-bold text-foreground text-sm sm:text-base">
              Lesson Quiz
            </h3>
            {progress < 80 && (
              <span className="text-[10px] sm:text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                Watch 80% to unlock
              </span>
            )}
          </div>

          {progress < 80 ? (
            <div className="text-center py-6 sm:py-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <HelpCircle className="w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Watch at least 80% of the video to unlock the quiz.
              </p>
              <div className="mt-3 w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full gradient-accent rounded-full transition-all"
                  style={{ width: `${(progress / 80) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round(progress)}% / 80%
              </p>
            </div>
          ) : showResult ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-4"
            >
              <div
                className={cn(
                  "w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-3",
                  quizPassed ? "bg-success/10" : "bg-destructive/10"
                )}
              >
                {quizPassed ? (
                  <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-success" />
                ) : (
                  <XCircle className="w-8 h-8 sm:w-10 sm:h-10 text-destructive" />
                )}
              </div>
              <h4 className="font-display font-bold text-base sm:text-lg text-foreground">
                {quizPassed ? "Congratulations!" : "Try Again"}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Score: {Math.round((score / quiz.questions.length) * 100)}%
              </p>
              <p className="text-xs text-muted-foreground">
                {score}/{quiz.questions.length} correct
              </p>
              {quizPassed ? (
                <button
                  onClick={onComplete}
                  className="mt-4 px-4 py-2 gradient-accent text-accent-foreground rounded-lg text-sm font-medium shadow-glow hover:opacity-90 transition-opacity"
                >
                  Get Certificate
                </button>
              ) : (
                <button
                  onClick={resetQuiz}
                  className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Retake Quiz
                </button>
              )}
            </motion.div>
          ) : (
            <div>
              <div className="flex gap-1 mb-3 sm:mb-4">
                {quiz.questions.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 h-1.5 rounded-full transition-colors",
                      i === currentQuestion
                        ? "gradient-accent"
                        : i < currentQuestion
                        ? "bg-success"
                        : "bg-muted"
                    )}
                  />
                ))}
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </p>
              <p className="text-xs sm:text-sm font-medium text-foreground mb-3 sm:mb-4">
                {quiz.questions[currentQuestion].question}
              </p>
              <div className="space-y-2">
                {quiz.questions[currentQuestion].options.map((opt, i) => {
                  const isSelected = selectedAnswer === i;
                  const isCorrect =
                    i === quiz.questions[currentQuestion].correctIndex;
                  const showFeedback = selectedAnswer !== null;
                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswerSelect(i)}
                      className={cn(
                        "w-full text-left p-2.5 sm:p-3 rounded-lg border text-xs sm:text-sm transition-all",
                        showFeedback && isCorrect
                          ? "border-success bg-success/10 text-foreground"
                          : showFeedback && isSelected && !isCorrect
                          ? "border-destructive bg-destructive/10 text-foreground"
                          : "border-border bg-muted/50 text-foreground hover:bg-muted"
                      )}
                    >
                      <span className="font-medium mr-2 text-muted-foreground">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3"
                >
                  <p className="text-[10px] sm:text-xs text-muted-foreground bg-muted p-2 rounded-lg">
                    {quiz.questions[currentQuestion].explanation}
                  </p>
                  <button
                    onClick={handleNextQuestion}
                    className="mt-3 w-full py-2 gradient-accent text-accent-foreground rounded-lg text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    {currentQuestion < quiz.questions.length - 1
                      ? "Next Question"
                      : "See Results"}
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonView;
