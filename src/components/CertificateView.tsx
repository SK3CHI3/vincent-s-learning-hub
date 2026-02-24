import { motion } from "framer-motion";
import { Award, Download, Share2, CheckCircle2 } from "lucide-react";

const CertificateView = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Your Certificates
        </h1>
        <p className="text-muted-foreground mt-1">
          Download your earned certificates of completion.
        </p>
      </div>

      {/* Certificate Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-2xl shadow-elevated overflow-hidden"
      >
        {/* Certificate Preview */}
        <div className="gradient-hero p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-accent"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
          <div className="relative z-10">
            <Award className="w-16 h-16 text-accent mx-auto mb-4" />
            <p className="text-xs text-primary-foreground/60 uppercase tracking-widest mb-2">
              Certificate of Completion
            </p>
            <h2 className="text-2xl font-display font-bold text-primary-foreground mb-1">
              Foundations of School Leadership
            </h2>
            <p className="text-sm text-primary-foreground/70 mb-4">
              IDP Foundation – Vincent AI Training Program
            </p>
            <div className="w-20 h-0.5 gradient-accent mx-auto mb-4" />
            <p className="text-lg text-primary-foreground font-display">
              Awarded to <span className="font-bold text-accent">Learner Name</span>
            </p>
            <p className="text-xs text-primary-foreground/50 mt-2">
              Completed on February 24, 2026
            </p>
          </div>
        </div>

        <div className="p-6 flex items-center justify-center gap-4">
          <button className="flex items-center gap-2 px-6 py-2.5 gradient-accent text-accent-foreground rounded-lg font-medium shadow-glow hover:opacity-90 transition-opacity">
            <Download className="w-4 h-4" /> Download PDF
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </motion.div>

      {/* Pending */}
      <div className="bg-card rounded-xl p-4 shadow-card">
        <h3 className="font-display font-bold text-foreground mb-3">
          Pending Certificates
        </h3>
        <div className="space-y-2">
          {["Building a Learning Community", "Resource Management for Schools"].map(
            (title) => (
              <div
                key={title}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
              >
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Award className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">
                    Complete quiz to earn certificate
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateView;
