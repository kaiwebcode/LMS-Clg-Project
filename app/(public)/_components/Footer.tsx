import {
  GraduationCap,
  Twitter,
  Github,
  Linkedin,
  Youtube,
} from "lucide-react";

const groups = [
  {
    title: "Platform",
    links: ["Courses", "Live Classes", "Certificates", "For Teams"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Press"],
  },
  {
    title: "Support",
    links: ["Help Center", "Community", "Contact", "Status"],
  },
];

export function Footer() {
  return (
    <footer id="footer" className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* BRAND */}
          <div className="sm:col-span-2 lg:col-span-2">
            <a href="#home" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero shadow-card">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight">
                Alpha-Lms
              </span>
            </a>

            <p className="mt-4 text-sm sm:text-base max-w-md leading-relaxed text-muted-foreground">
              The modern learning management system empowering learners and
              educators worldwide to unlock their full potential.
            </p>

            {/* SOCIAL */}
            <div className="mt-6 flex gap-3">
              {[Twitter, Github, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary hover:scale-105"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* LINKS */}
          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="text-base sm:text-lg font-semibold text-foreground">
                {g.title}
              </h4>

              <ul className="mt-3 space-y-2">
                {g.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Alpha-Lms. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}