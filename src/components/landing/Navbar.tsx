"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Database className="w-6 h-6 text-primary" />
          <span>SchemaPulse</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#solutions" className="hover:text-primary transition-colors">Solutions</Link>
          <Link href="#docs" className="hover:text-primary transition-colors">Docs</Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">Log in</Button>
          <Link href="/editor">
            <Button size="sm" className="bg-primary text-primary-foreground font-semibold">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
