import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

type Testimonial = {
  _id: string;
  name: string;
  type: string;
  course?: string;
  rating?: number;
  review: string;
  isApproved: boolean;
};

export default function TeamPage() {
  const [studentReviews, setStudentReviews] = useState<Testimonial[]>([]);
  const [collegeFeedbacks, setCollegeFeedbacks] = useState<Testimonial[]>([]);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await apiFetch("/testimonials");
        if (data) {
          const approved = data.filter((t: Testimonial) => t.isApproved);
          setStudentReviews(approved.filter((t: Testimonial) => t.type === 'student' || t.type === 'general'));
          setCollegeFeedbacks(approved.filter((t: Testimonial) => t.type === 'college' || t.type === 'institution'));
        }
      } catch (e) {
        console.error("Failed to fetch testimonials");
      }
    };
    loadReviews();
  }, []);

  return (
    <Layout>
      <section className="pt-32 pb-16 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">Our Team</h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              Meet the dedicated professionals behind ACE IT UP.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Student Reviews */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-foreground text-center mb-12">Student Reviews</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {studentReviews.length === 0 ? (
              <p className="col-span-full text-center text-muted-foreground">No recent reviews yet.</p>
            ) : studentReviews.map((review, i) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
              >
                <Quote size={24} className="text-accent/30 mb-3" />
                <p className="text-foreground text-sm leading-relaxed mb-4">"{review.review}"</p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className={j < (review.rating || 5) ? "text-accent fill-accent" : "text-border"}
                    />
                  ))}
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">{review.name}</p>
                  <p className="text-muted-foreground text-xs">{review.course || review.type}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* College Feedback */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-foreground text-center mb-12">College Feedback</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {collegeFeedbacks.length === 0 ? (
              <p className="col-span-full text-center text-muted-foreground">No feedback from institutions yet.</p>
            ) : collegeFeedbacks.map((fb, i) => (
              <motion.div
                key={fb._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
              >
                <Quote size={24} className="text-primary/30 mb-3" />
                <p className="text-foreground text-sm leading-relaxed mb-4">"{fb.review}"</p>
                <p className="font-bold text-primary text-sm">{fb.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
