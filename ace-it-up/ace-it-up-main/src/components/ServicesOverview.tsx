import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Monitor, ClipboardCheck, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: BookOpen,
    title: "Classroom Training",
    description: "Hands-on, instructor-led sessions focused on practical industry skills and real-world applications.",
    color: "primary",
  },
  {
    icon: Monitor,
    title: "E-learning",
    description: "Flexible online courses with recorded sessions, live classes, and self-paced learning modules.",
    color: "accent",
  },
  {
    icon: ClipboardCheck,
    title: "Assessments",
    description: "Comprehensive skill evaluations, mock interviews, and certification exams to measure progress.",
    color: "primary",
  },
  {
    icon: FileText,
    title: "Study Materials",
    description: "Curated notes, practice questions, and downloadable resources to support your learning journey.",
    color: "accent",
  },
];

export function ServicesOverview() {
  return (
    <section className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">What We Offer</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mt-3 mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive training solutions designed to accelerate your career growth.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                  service.color === "primary" ? "bg-primary/10" : "bg-accent/10"
                }`}
              >
                <service.icon
                  size={28}
                  className={service.color === "primary" ? "text-primary" : "text-accent"}
                />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
              <Link to="/services">
                <Button variant="ghost" size="sm" className="text-primary font-semibold p-0 h-auto hover:bg-transparent hover:text-accent">
                  Learn More <ArrowRight size={14} className="ml-1" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
