import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/executive-summary", label: "Executive Summary" },
    { path: "/introduction", label: "Introduction" },
    { path: "/solution", label: "Solution" },
    { path: "/x402-sol", label: "x402 Sol" },
    { path: "/device-identity", label: "Device Identity" },
    { path: "/sdk", label: "SDK" },
    { path: "/tokenomics", label: "Tokenomics" },
    { path: "/roadmap", label: "Roadmap" },
    { path: "/chat", label: "Demo Chat" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" data-testid="link-brand" className="font-bold text-lg bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent cursor-pointer">
            x402Pay
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 flex-wrap items-center gap-1 text-sm">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path} 
              data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover-elevate min-h-8 px-3 py-2 ${location === item.path ? "bg-muted" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <nav className="container py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path} 
                data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, "-")}`} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`inline-flex items-center justify-start rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover-elevate min-h-8 px-3 py-2 w-full ${location === item.path ? "bg-muted" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
