"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Features", href: "/#features" },
  { name: "How it Works", href: "/#how-it-works" },
  { name: "Premium", href: "/#premium" },
  { name: "Privacy", href: "/politica-de-privacidade" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-rose-100 shadow-sm shadow-rose-100/50"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-6 w-6 text-rose-500" />
          <span className="font-bold text-lg pink-gradient-text" style={{ fontFamily: 'var(--font-playfair)' }}>
            Exact Calories
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground/70 hover:text-rose-500 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            asChild
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0 rounded-full px-6 shadow-md shadow-rose-200"
          >
            <Link href="https://apps.apple.com/us/app/exact-calories/id6753726987" target="_blank">
              Download Free
            </Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-rose-500 hover:bg-rose-50">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-rose-100">
          <nav className="container flex flex-col gap-4 py-5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-foreground/80 hover:text-rose-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button
              asChild
              className="mt-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0 rounded-full w-full"
            >
              <Link href="https://apps.apple.com/us/app/exact-calories/id6753726987" target="_blank">
                Download Free
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
