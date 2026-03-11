import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { BookOpen, Monitor, ClipboardCheck, FileText, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Course {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  skillLevel: string;
}

const iconMap: Record<string, any> = {
  "classroom": BookOpen,
  "elearning": Monitor,
  "assessments": ClipboardCheck,
  "materials": FileText,
};

export default function ServicesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        console.log('Fetching courses...');
        const data = await apiFetch('/courses');
        console.log('Courses received:', data);
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.error('Data is not an array:', data);
          setError('Invalid data format received');
        }
      } catch (error: any) {
        console.error("Failed to load courses", error);
        setError(error.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-primary" size={40} />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Unable to Load Services</h2>
            <p className="text-destructive mb-2">{error}</p>
            <p className="text-muted-foreground text-sm mb-6">
              Make sure the backend server is running:
              <code className="block mt-2 bg-muted p-2 rounded text-xs">
                cd backend && npm run dev
              </code>
            </p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="pt-32 pb-16 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">Our Programs</h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              Professional certification programs tailored to help you succeed in your career journey. 
              We provide courses weekly once or intensive 1-month programs before placements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4 space-y-24">
          {courses.length > 0 ? (
            courses.map((course, i) => {
              const Icon = i % 2 === 0 ? BookOpen : Monitor;
              return (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col lg:flex-row gap-10 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className="flex-1">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-primary/10">
                      <Icon size={32} className="text-primary" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-foreground mb-4">{course.title}</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">{course.description}</p>
                    <div className="flex flex-wrap gap-4 mb-8">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                        {course.skillLevel}
                      </span>
                    </div>
                    <Link to="/contact">
                      <Button className="bg-accent-gradient font-semibold rounded-xl px-6">
                        Enquire Now <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                  <div className="flex-1 w-full">
                    <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-700">
                      {course.imageUrl ? (
                        <img 
                          src={course.imageUrl} 
                          alt={course.title} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                          <Icon size={80} className="text-primary/10" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No programs found. Check back later!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-hero-gradient text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-primary-foreground mb-4">Ready to Start Learning?</h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
            Reach out to us to discuss your training needs and find the perfect program for you.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-accent-gradient font-semibold rounded-xl px-8 h-12">
              Contact Us <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

