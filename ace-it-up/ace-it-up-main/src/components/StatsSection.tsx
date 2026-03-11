import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as Icons from "lucide-react";
import { apiFetch } from "@/lib/api";

interface StatItem {
  _id: string;
  icon: string;
  value: number;
  label: string;
  order: number;
}

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl lg:text-5xl font-extrabold text-primary-foreground">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export function StatsSection() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiFetch('/stats');
        if (Array.isArray(data) && data.length > 0) {
          setStats(data);
        } else {
          // Show default stats with 0 values if no data exists
          setStats([
            { _id: 'default-1', icon: 'GraduationCap', value: 0, label: 'Students Trained', order: 0 },
            { _id: 'default-2', icon: 'Briefcase', value: 0, label: 'Placements Achieved', order: 1 },
            { _id: 'default-3', icon: 'School', value: 0, label: 'Colleges Associated', order: 2 },
            { _id: 'default-4', icon: 'Presentation', value: 0, label: 'Workshops Conducted', order: 3 }
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Show default stats even on error
        setStats([
          { _id: 'default-1', icon: 'GraduationCap', value: 0, label: 'Students Trained', order: 0 },
          { _id: 'default-2', icon: 'Briefcase', value: 0, label: 'Placements Achieved', order: 1 },
          { _id: 'default-3', icon: 'School', value: 0, label: 'Colleges Associated', order: 2 },
          { _id: 'default-4', icon: 'Presentation', value: 0, label: 'Workshops Conducted', order: 3 }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon || Icons.TrendingUp;
  };

  if (loading) {
    return (
      <section className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-foreground"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-hero-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const IconComponent = getIcon(stat.icon);
            return (
              <motion.div
                key={stat._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <IconComponent size={32} className="text-accent mx-auto mb-3" />
                <AnimatedCounter target={stat.value} suffix="+" />
                <p className="text-primary-foreground/70 text-sm mt-2 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
