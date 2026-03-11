import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import { GraduationCap, Building2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

type LoginType = "student" | "institution";

export default function LoginPage() {
  const { toast } = useToast();
  const { signIn, signUp, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<LoginType>("student");
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setLoading(true);

    try {
      const { error } = await signIn(email.trim(), password);
      if (error) {
        console.error('Login error:', error);
        toast({ 
          title: "Login failed", 
          description: error.message || "Invalid credentials. Please check your email and password.", 
          variant: "destructive" 
        });
      } else {
        toast({ title: "Welcome back!" });
        setTimeout(() => navigate("/admin"), 500);
      }
    } catch (err: any) {
      console.error('Unexpected error:', err);
      toast({ 
        title: "Login failed", 
        description: "An unexpected error occurred. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 min-h-screen flex items-center bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-hero-gradient flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-heading font-extrabold text-2xl">A</span>
              </div>
              <h1 className="text-3xl font-extrabold text-foreground mb-2">
                Admin Portal
              </h1>
              <p className="text-muted-foreground">
                Sign in to manage ACE IT UP
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 shadow-card border border-border space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Admin Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aceitup.com"
                  className="rounded-xl h-12"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="rounded-xl h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-accent-gradient font-semibold rounded-xl h-12" disabled={loading}>
                {loading ? "Verifying..." : "Sign In to Dashboard"}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
