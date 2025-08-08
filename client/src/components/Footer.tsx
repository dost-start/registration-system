import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-summit-navy text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-xl font-semibold mb-6 text-summit-white">
          For More Information, Contact Us
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* LinkedIn */}
          <a
            href="https://linkedin.com/company/startdost"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 group"
          >
            <Linkedin className="w-5 h-5 text-summit-teal group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>

          {/* Email */}
          <a
            href="mailto:dost.start@gmail.com"
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 group"
          >
            <Mail className="w-5 h-5 text-summit-orange group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Email</span>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com/STARTDOST"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 group"
          >
            <Facebook className="w-5 h-5 text-summit-blue group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Facebook</span>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/start_dost"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 group"
          >
            <Instagram className="w-5 h-5 text-summit-pink group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Instagram</span>
          </a>
        </div>

        <div className="border-t border-white/20 pt-6">
          <p className="text-sm text-white/70">
            © 2025 DOST START. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
