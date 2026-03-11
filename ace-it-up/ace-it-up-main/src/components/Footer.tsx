import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Team", to: "/team" },
  { label: "Contact", to: "/contact" },
];

const services = [
  { label: "Classroom Training", to: "/services#classroom" },
  { label: "E-learning", to: "/services#elearning" },
  { label: "Assessments", to: "/services#assessments" },
  { label: "Study Materials", to: "/services#materials" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent-gradient flex items-center justify-center">
                <span className="font-heading font-extrabold text-lg text-accent-foreground">A</span>
              </div>
              <span className="font-heading font-extrabold text-xl">ACE IT UP</span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              Empowering students and institutions with industry-ready skills through comprehensive training programs.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-background/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-background/60 hover:text-accent text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-background/60 hover:text-accent text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-background/60">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                BHIVE Platinum, Church Street, Bengaluru, Karnataka, India
              </li>
              <li className="flex items-center gap-3 text-sm text-background/60">
                <Phone size={16} className="shrink-0 text-accent" />
                8431119696
              </li>
              <li className="flex items-center gap-3 text-sm text-background/60">
                <Mail size={16} className="shrink-0 text-accent" />
                {/* Email to be added */}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/40">
          © {new Date().getFullYear()} ACE IT UP. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
