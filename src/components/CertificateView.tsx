import { motion } from "framer-motion";
import { Award, Download, Share2 } from "lucide-react";

const CertificateView = () => {
  const handleDownloadCertificate = () => {
    import("jspdf").then(({ jsPDF }) => {
      const doc = new jsPDF({ orientation: "landscape" });
      const w = doc.internal.pageSize.getWidth();
      const h = doc.internal.pageSize.getHeight();

      // Background
      doc.setFillColor(27, 42, 91);
      doc.rect(0, 0, w, h, "F");

      // Inner frame
      doc.setDrawColor(212, 168, 67);
      doc.setLineWidth(2);
      doc.rect(12, 12, w - 24, h - 24);
      doc.setLineWidth(0.5);
      doc.rect(16, 16, w - 32, h - 32);

      // Header
      doc.setTextColor(212, 168, 67);
      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.text("IDP FOUNDATION", w / 2, 35, { align: "center" });

      doc.setFontSize(28);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text("Certificate of Completion", w / 2, 55, { align: "center" });

      // Gold line
      doc.setDrawColor(212, 168, 67);
      doc.setLineWidth(1);
      doc.line(w / 2 - 50, 62, w / 2 + 50, 62);

      // Awarded to
      doc.setFontSize(12);
      doc.setTextColor(200, 200, 200);
      doc.setFont("helvetica", "normal");
      doc.text("This certificate is awarded to", w / 2, 78, { align: "center" });

      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(212, 168, 67);
      doc.text("Learner Name", w / 2, 92, { align: "center" });

      // Course
      doc.setFontSize(12);
      doc.setTextColor(200, 200, 200);
      doc.setFont("helvetica", "normal");
      doc.text("for successfully completing", w / 2, 108, { align: "center" });

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text("Foundations of School Leadership", w / 2, 120, { align: "center" });

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(200, 200, 200);
      doc.text("Vincent AI Training Program", w / 2, 130, { align: "center" });

      // Date
      const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      doc.setFontSize(10);
      doc.setTextColor(180, 180, 180);
      doc.text(`Completed on ${date}`, w / 2, 155, { align: "center" });

      // Signatures
      doc.setDrawColor(212, 168, 67);
      doc.setLineWidth(0.5);
      doc.line(55, 170, 125, 170);
      doc.line(w - 125, 170, w - 55, 170);
      doc.setFontSize(9);
      doc.setTextColor(200, 200, 200);
      doc.text("Program Director", 90, 177, { align: "center" });
      doc.text("IDPF Representative", w - 90, 177, { align: "center" });

      doc.save("IDPF_Certificate_of_Completion.pdf");
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
          Your Certificates
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Download your earned certificates of completion.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-2xl shadow-elevated overflow-hidden"
      >
        <div className="gradient-hero p-5 sm:p-8 text-center relative overflow-hidden">
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
            <Award className="w-12 h-12 sm:w-16 sm:h-16 text-accent mx-auto mb-3 sm:mb-4" />
            <p className="text-xs text-primary-foreground/60 uppercase tracking-widest mb-2">
              Certificate of Completion
            </p>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-primary-foreground mb-1">
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
              Completed on {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>

        <div className="p-6 flex items-center justify-center gap-4">
          <button
            onClick={handleDownloadCertificate}
            className="flex items-center gap-2 px-6 py-2.5 gradient-accent text-accent-foreground rounded-lg font-medium shadow-glow hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </motion.div>

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
