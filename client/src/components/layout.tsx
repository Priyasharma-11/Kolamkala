import { Link, useLocation } from "wouter";
import { Menu, X, Home, Upload, PenTool, GraduationCap, History, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Analyzer", path: "/analyzer", icon: Upload },
  { label: "Generator", path: "/generator", icon: PenTool },
  { label: "Learn", path: "/learn", icon: GraduationCap },
  { label: "History", path: "/history", icon: History },
  { label: "Contact", path: "/contact", icon: Mail },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-secondary selection:text-secondary-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold text-xl group-hover:scale-110 transition-transform">
                K
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-primary group-hover:text-primary/80 transition-colors">
                KolamKala
              </span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <a
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2 py-2 border-b-2 border-transparent",
                    location === item.path
                      ? "text-primary border-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <Button size="sm" className="ml-4 font-serif bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </nav>

          {/* Mobile Nav */}
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex items-center gap-2 px-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold">
                    K
                  </div>
                  <span className="font-serif text-xl font-bold text-primary">
                    KolamKala
                  </span>
                </div>
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link key={item.path} href={item.path}>
                      <a
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                          location === item.path
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted text-muted-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-sidebar border-t py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold">
                  K
                </div>
                <span className="font-serif text-xl font-bold text-primary">
                  KolamKala
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Preserving the ancient art of Kolam through modern technology. 
                Analyze, generate, and learn traditional patterns with AI.
              </p>
            </div>
            
            <div>
              <h4 className="font-serif font-bold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/analyzer"><a className="hover:text-primary">Kolam Analyzer</a></Link></li>
                <li><Link href="/generator"><a className="hover:text-primary">Pattern Generator</a></Link></li>
                <li><Link href="/learn"><a className="hover:text-primary">Learning Modules</a></Link></li>
                <li><Link href="/gallery"><a className="hover:text-primary">Pattern Gallery</a></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/history"><a className="hover:text-primary">History & Culture</a></Link></li>
                <li><Link href="/faq"><a className="hover:text-primary">Documentation</a></Link></li>
                <li><Link href="/dataset"><a className="hover:text-primary">Datasets</a></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold mb-4">Connect</h4>
              <div className="flex gap-4 text-muted-foreground">
                <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                <a href="#" className="hover:text-primary transition-colors">GitHub</a>
              </div>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} KolamKala. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
