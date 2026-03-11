import { motion } from "framer-motion";
import { Target, Users, Sparkles } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-20 lg:py-28 bg-background" id="about">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">About Us</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mt-3 mb-6">
            Building Careers, One Skill at a Time
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            ACE IT UP is dedicated to bridging the gap between education and industry. We empower students with practical skills, placement preparation, and industry-focused training programs that transform careers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-8 shadow-card border border-border"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Target className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To deliver high-quality, industry-aligned training that equips students with the skills, confidence, and mindset needed to thrive in today's competitive job market.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card rounded-2xl p-8 shadow-card border border-accent/20 bg-accent/5"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
              <Sparkles className="text-accent" size={24} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Flexible Learning</h3>
            <p className="text-muted-foreground leading-relaxed">
              We provide courses for students weekly once or 1 month before placement, ensuring flexible and intensive preparation options.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 shadow-card border border-border"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Users className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To become the most trusted training partner for students and institutions, creating a future where every learner is industry-ready and career-confident.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
