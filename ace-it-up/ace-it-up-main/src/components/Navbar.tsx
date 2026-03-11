import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Team", to: "/team" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-card/95 backdrop-blur-md shadow-card border-b border-border"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-hero-gradient flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-extrabold text-lg">A</span>
          </div>
          <span className={`font-heading font-extrabold text-xl tracking-tight ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
            ACE IT UP
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.to
                ? "bg-primary/10 text-primary"
                : scrolled
                  ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                  : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-2 ml-2">
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="ghost" size="sm" className={`gap-2 ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
                    <Settings size={18} /> Admin
                  </Button>
                </Link>
              )}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
                <User size={16} />
                <span className="text-sm font-semibold">{user.fullName.split(' ')[0]}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                className={scrolled ? "text-muted-foreground" : "text-primary-foreground/70"}
              >
                <LogOut size={18} />
              </Button>
            </div>
          ) : null}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-lg ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold bg-primary/10 text-primary">
                    <User size={18} />
                    {user.fullName}
                  </div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                      <Settings size={18} />
                      Admin Panel
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 px-4 py-3 text-muted-foreground"
                    onClick={signOut}
                  >
                    <LogOut size={18} />
                    Logout
                  </Button>
                </>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
