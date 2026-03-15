"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Database } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-100 px-6 md:px-10 py-6 flex items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-xl">
      <Link
        href="/"
        className="flex items-center gap-3 active:scale-95 transition-transform group"
      >
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-primary group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          <Database className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight text-white">
          SchemaPulse
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/editor">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-bold px-6 md:px-8 rounded-xl h-11 md:h-12 text-sm transition-all flex gap-2 shadow-lg shadow-primary/20"
          >
            Go to Editor
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </nav>
  );
}
