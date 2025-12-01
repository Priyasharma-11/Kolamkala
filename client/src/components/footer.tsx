import { Link } from "wouter";
import { Sparkles, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-bold">KolamKala</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Explore, analyze, and create beautiful Kolam art with AI-powered tools
              and comprehensive learning resources.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-sm font-semibold uppercase tracking-wider text-foreground">
              Tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/analyzer" className="text-muted-foreground transition-colors hover:text-gold">
                  Kolam Analyzer
                </Link>
              </li>
              <li>
                <Link href="/generator" className="text-muted-foreground transition-colors hover:text-gold">
                  Kolam Generator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-sm font-semibold uppercase tracking-wider text-foreground">
              Learn
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/learning" className="text-muted-foreground transition-colors hover:text-gold">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-muted-foreground transition-colors hover:text-gold">
                  Kolam History
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-sm font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-gold">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/contact#faq" className="text-muted-foreground transition-colors hover:text-gold">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 text-primary" /> for Kolam art lovers
          </p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} KolamKala. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
