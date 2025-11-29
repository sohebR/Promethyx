import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ZKShield } from "@/components/icons/ZKShield";
import { cn } from "@/lib/utils";
import { Vote, Shield, LayoutDashboard, BarChart3, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { path: "/", label: "Home", icon: Shield },
  { path: "/admin", label: "Admin", icon: LayoutDashboard },
  { path: "/vote", label: "Vote", icon: Vote },
  { path: "/results", label: "Results", icon: BarChart3 },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <ZKShield className="w-8 h-10 transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight text-foreground">
                Invisible Booth
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight">
                ZK-Powered Voting system 
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "gap-2",
                      isActive && "shadow-[0_0_20px_hsl(185_100%_50%/0.3)]"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Connect Wallet Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="glow" size="sm">
              Connect Wallet
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start gap-3"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
              <Button variant="glow" className="mt-2">
                Connect Wallet
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
