import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, MessageSquare, Image, Mail, ArrowRight, ExternalLink } from "lucide-react";

type Stats = {
  courses: number;
  testimonials: number;
  enquiries: number;
  gallery: number;
};

type RecentEnquiry = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  type: string;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ courses: 0, testimonials: 0, enquiries: 0, gallery: 0 });
  const [recentEnquiries, setRecentEnquiries] = useState<RecentEnquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [courses, testimonials, enquiries, gallery] = await Promise.all([
        apiFetch("/courses"),
        apiFetch("/testimonials"),
        apiFetch("/enquiries"),
        apiFetch("/gallery"),
      ]);

      setStats({
        courses: Array.isArray(courses) ? courses.length : 0,
        testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
        enquiries: Array.isArray(enquiries) ? enquiries.length : 0,
        gallery: Array.isArray(gallery) ? gallery.length : 0,
      });

      if (Array.isArray(enquiries)) {
        setRecentEnquiries(enquiries.slice(0, 5));
      }
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cards = [
    { label: "Total Services", value: stats.courses, icon: BookOpen, color: "text-primary", bg: "bg-primary/10", link: "/admin/services" },
    { label: "Team Feedback", value: stats.testimonials, icon: MessageSquare, color: "text-accent", bg: "bg-accent/10", link: "/admin/team" },
    { label: "Total Enquiries", value: stats.enquiries, icon: Mail, color: "text-blue-500", bg: "bg-blue-500/10", link: "/admin/enquiries" },
    { label: "Gallery Images", value: stats.gallery, icon: Image, color: "text-orange-500", bg: "bg-orange-500/10", link: "/admin/gallery" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">System Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm">Welcome back! Here's what's happening today.</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh Stats"}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c) => (
          <Link key={c.label} to={c.link}>
            <Card className="hover:shadow-card-hover transition-all group overflow-hidden border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">{c.label}</CardTitle>
                <div className={`p-2 rounded-xl ${c.bg} ${c.color} group-hover:scale-110 transition-transform`}>
                  <c.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <p className="text-3xl font-black text-foreground">{c.value}</p>
                  <ArrowRight size={16} className="text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Recent Enquiries</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Latest messages from users and potential students.</p>
            </div>
            <Link to="/admin/enquiries">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                View All <ExternalLink size={14} className="ml-2" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead>User</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentEnquiries.length > 0 ? (
                  recentEnquiries.map((e) => (
                    <TableRow key={e._id} className="border-border/40 hover:bg-muted/30">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-foreground">{e.name}</span>
                          <span className="text-xs text-muted-foreground">{e.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                        {e.message}
                      </TableCell>
                      <TableCell className="text-right text-xs font-medium text-muted-foreground whitespace-nowrap">
                        {new Date(e.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10 text-muted-foreground grayscale opacity-50">
                      <Mail size={40} className="mx-auto mb-2" />
                      No recent enquiries
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Manage your platform content.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/admin/services">
              <Button className="w-full justify-start h-12 bg-primary/5 hover:bg-primary/10 border border-primary/20 text-foreground font-semibold" variant="outline">
                <BookOpen size={18} className="mr-3 text-primary" />
                Add New Service
              </Button>
            </Link>
            <Link to="/admin/gallery">
              <Button className="w-full justify-start h-12 bg-orange-500/5 hover:bg-orange-500/10 border border-orange-500/20 text-foreground font-semibold" variant="outline">
                <Image size={18} className="mr-3 text-orange-500" />
                Upload Gallery Photo
              </Button>
            </Link>
            <Link to="/admin/team">
              <Button className="w-full justify-start h-12 bg-accent/5 hover:bg-accent/10 border border-accent/20 text-foreground font-semibold" variant="outline">
                <MessageSquare size={18} className="mr-3 text-accent" />
                Manage Feedback
              </Button>
            </Link>
            <div className="pt-4 border-t border-border mt-4">
              <div className="rounded-2xl bg-hero-gradient p-5 text-primary-foreground">
                <h4 className="font-bold text-sm mb-1 italic opacity-80">Pro Tip</h4>
                <p className="text-xs leading-relaxed">Regularly approving and unapproving testimonials keeps the "Team" page fresh for new visitors.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
