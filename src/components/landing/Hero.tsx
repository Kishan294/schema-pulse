"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="outline"
            className="mb-6 px-4 py-1.5 gap-2 border-primary/20 bg-primary/5 text-primary"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Database Architect</span>
          </Badge>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/60">
            Your Database, <br />
            Visualized in Seconds.
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
            Paste your SQL, Prisma, or Drizzle schema and let Groq AI generate
            interactive ER diagrams, detect implicit relationships, and suggest
            architectural improvements.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/editor">
              <Button
                size="lg"
                className="h-14 px-8 text-lg font-semibold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 group"
              >
                Start Building Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg font-semibold hover:bg-muted/50 transition-all"
            >
              Watch Demo
            </Button>
          </div>
        </motion.div>

        {/* Dashboard Preview Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 relative mx-auto max-w-5xl rounded-2xl border border-border/10 bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden aspect-video"
        >
          <div className="absolute inset-x-0 top-0 h-10 border-b border-border/10 bg-background/50 flex items-center px-4 gap-2">
            <div className="flex gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
            </div>
          </div>
          <div className="w-full h-full pt-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-size-[24px_24px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]" />
            <div className="z-10 text-muted-foreground font-mono text-sm flex flex-col items-center gap-4">
              <div className="p-4 rounded-lg bg-card border border-border/50 shadow-sm animate-pulse">
                Rendering Graph Architecture...
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
