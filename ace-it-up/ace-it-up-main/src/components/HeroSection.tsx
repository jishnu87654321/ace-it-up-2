import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <img
        src={heroBg}
        alt="Students learning in a modern classroom"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-semibold text-sm mb-6 backdrop-blur-sm"
          >
            <Sparkles size={16} />
            <span>Weekly courses & Placement preparation bootcamps</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-primary-foreground leading-tight mb-4">
            ACE IT UP
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-accent mb-6">
            TRAIN TODAY, ACE TOMORROW
          </p>
          <p className="text-lg text-primary-foreground/70 max-w-xl mb-10 leading-relaxed">
            Empowering students and institutions with industry-ready skills through comprehensive training, assessments, and placement support.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/services">
              <Button size="lg" className="bg-accent-gradient font-semibold text-base px-8 h-12 rounded-xl shadow-lg">
                Explore Services
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="font-semibold text-base px-8 h-12 rounded-xl border-2 border-primary-foreground text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 hover:text-primary-foreground"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-primary-foreground/60 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
