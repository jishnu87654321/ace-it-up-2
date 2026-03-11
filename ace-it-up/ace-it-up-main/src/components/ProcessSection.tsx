import { motion } from "framer-motion";
import { UserPlus, BookOpen, PenTool, Award, Briefcase } from "lucide-react";

const steps = [
  { icon: UserPlus, label: "Enroll", desc: "Sign up for your desired program" },
  { icon: BookOpen, label: "Learn", desc: "Attend expert-led training sessions" },
  { icon: PenTool, label: "Practice", desc: "Apply skills with hands-on projects" },
  { icon: Award, label: "Get Certified", desc: "Earn industry-recognized certificates" },
  { icon: Briefcase, label: "Placement", desc: "Get matched with top employers" },
];

export function ProcessSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">How It Works</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mt-3 mb-4">
            Your Journey With Us
          </h2>
          <p className="text-muted-foreground text-lg">
            A simple, structured path from enrollment to career success.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex items-center"
            >
              <div className="flex flex-col items-center text-center w-40">
                <div className="w-16 h-16 rounded-2xl bg-hero-gradient flex items-center justify-center mb-3 shadow-lg">
                  <step.icon size={28} className="text-primary-foreground" />
                </div>
                <span className="text-xs font-bold text-accent mb-1">Step {i + 1}</span>
                <h4 className="font-bold text-foreground text-sm">{step.label}</h4>
                <p className="text-muted-foreground text-xs mt-1">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block w-12 h-0.5 bg-border mx-2" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
