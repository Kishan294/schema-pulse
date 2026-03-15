"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Database } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";

export function Navbar() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 50], [0, 1]);
  const y = useTransform(scrollY, [0, 50], [-20, 0]);

  return (
    <>
      {/* Floating Scrolled Navbar */}
      <motion.nav
        style={{ opacity, y }}
        className="fixed top-6 inset-x-0 mx-auto w-fit z-100 px-6 hidden md:block"
      >
        <div className="bg-black/40 backdrop-blur-2xl px-8 py-3 rounded-full border border-white/10 flex items-center gap-12 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          <Link
            href="/"
            className="flex items-center gap-3 active:scale-95 transition-transform"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Database className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-base tracking-tight">
              SchemaPulse
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="#features"
              className="text-xs font-semibold text-white/40 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#docs"
              className="text-xs font-semibold text-white/40 hover:text-white transition-colors"
            >
              Developers
            </Link>
          </div>

          <div className="h-4 w-px bg-white/10" />

          <Link href="/editor">
            <Button
              size="sm"
              className="bg-white text-black hover:bg-white/90 font-bold px-6 rounded-full h-9 text-[11px] uppercase tracking-wider"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Navbar (Initial State) */}
      <nav className="absolute top-0 w-full z-90 px-10 py-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-primary group-hover:border-primary">
            <Database className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            SchemaPulse
          </span>
        </div>

        <div className="flex items-center gap-6 pointer-events-auto">
          <Link href="/editor">
            <Button
              variant="ghost"
              className="text-white/40 hover:text-white font-semibold text-sm h-12 px-6"
            >
              Docs
            </Button>
          </Link>
          <Link href="/editor">
            <Button
              size="lg"
              className="bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white font-bold px-8 rounded-xl h-12 text-sm transition-all flex gap-2"
            >
              Launch App
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </nav>
    </>
  );
}
