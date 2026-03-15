"use client";

import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { FAQ } from "@/components/landing/FAQ";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowUpRight,
  Database,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col font-sans antialiased overflow-x-hidden bg-background">
      <main className="grow">
        <Hero />

        {/* Trusted By / Interstitial */}
        <div className="py-20 border-y border-white/5 bg-black/40">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-16 md:gap-24 grayscale opacity-20 hover:opacity-100 transition-all duration-1000">
              {[
                "POSTGRES",
                "MY SQL",
                "PRISMA",
                "DRIZZLE",
                "SUPABASE",
                "MONGO DB",
              ].map((brand) => (
                <span
                  key={brand}
                  className="text-xl font-bold tracking-tighter whitespace-nowrap"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Features />

        {/* Final CTA Section */}
        <section className="py-24 relative overflow-hidden group">
          <div className="container mx-auto px-6">
            <div className="relative rounded-[48px] border border-white/10 bg-linear-to-b from-primary/10 to-transparent p-16 md:p-32 overflow-hidden text-center shadow-3xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 blur-[130px] -z-10 rounded-full animate-pulse" />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-7xl font-bold mb-10 tracking-tightest leading-tight">
                  Ready to map your <br />
                  <span className="text-primary italic">Infastructure?</span>
                </h2>
                <p className="text-xl text-white/40 mb-14 max-w-2xl mx-auto leading-relaxed font-medium">
                  Join hundreds of architects who have optimized their database
                  logic with SchemaPulse. Get started in seconds—no credit card
                  required.
                </p>

                <Link href="/editor">
                  <Button
                    size="xl"
                    className="h-16 px-12 text-lg font-bold rounded-2xl shadow-3xl transition-all hover:scale-105 active:scale-95 bg-white text-black hover:bg-white/90"
                  >
                    Open Workspace
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </Button>
                </Link>

                <div className="mt-20 flex flex-wrap items-center justify-center gap-12 text-white/10 font-bold text-xs uppercase tracking-[0.3em]">
                  <span className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4" /> No Credit Card
                  </span>
                  <span className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4" /> Instant Setup
                  </span>
                  <span className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4" /> Secure Logic
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <FAQ />
      </main>

      {/* Go To Editor Button - Bottom Right */}
      <Link
        href="/editor"
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          size="lg"
          className="h-14 w-14 rounded-2xl bg-primary hover:bg-primary/90 shadow-2xl transition-all hover:scale-110 active:scale-95 group"
        >
          <ArrowUpRight className="w-6 h-6 text-white" />
        </Button>
      </Link>

      <footer className="border-t border-white/5 py-12 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <Link
              href="/"
              className="flex items-center gap-3 font-bold text-xl active:scale-95 transition-transform shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Database className="w-4 h-4 text-white" />
              </div>
              <span>SchemaPulse</span>
            </Link>
            
            <div className="grow flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">
                © {new Date().getFullYear()} SchemaPulse Protocol.
              </div>
              
              <div className="flex gap-8 text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Operational
                </span>
                <span>Inference: Stable</span>
              </div>
            </div>
            
            <div className="shrink-0 hidden lg:block text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">
              v1.0.4-beta
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
