"use client";

import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
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
    <div className="relative min-h-screen flex flex-col font-sans antialiased overflow-x-hidden bg-[#05050a]">
      <Navbar />
      <main className="grow">
        <Hero />

        {/* Trusted By / Interstitial */}
        <div className="py-16 border-y border-white/5 bg-[#0a0a0f]">
          <div className="container mx-auto px-6 max-w-6xl">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-8">
              Trusted by developers using
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
              {[
                "PostgreSQL",
                "MySQL",
                "Prisma",
                "Drizzle",
                "Supabase",
                "MongoDB",
              ].map((brand) => (
                <span
                  key={brand}
                  className="text-sm font-semibold tracking-tight text-white/20 hover:text-white/60 transition-colors duration-300"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Features />

        {/* Final CTA Section */}
        <section className="py-32 relative overflow-hidden bg-[#05050a]">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="relative rounded-[32px] border border-white/10 bg-linear-to-b from-blue-500/10 to-transparent p-12 md:p-20 overflow-hidden text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-blue-500/20 blur-[120px] -z-10 rounded-full" />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                  Ready to map your{" "}
                  <span className="text-blue-400 italic">infrastructure?</span>
                </h2>
                <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto leading-relaxed">
                  Get started in seconds. No credit card required.
                </p>

                <Link href="/editor">
                  <Button
                    size="xl"
                    className="h-14 px-10 text-base font-semibold rounded-xl shadow-xl shadow-blue-500/25 transition-all hover:scale-105 active:scale-95 bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/30"
                  >
                    Open Workspace
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>

                <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-xs text-white/30">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Free tier available
                  </span>
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> No setup required
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <FAQ />
      </main>

      {/* Go To Editor Button - Bottom Right */}
      <Link href="/editor" className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="h-12 w-12 rounded-xl bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-500/30 transition-all hover:scale-110 active:scale-95"
        >
          <ArrowUpRight className="w-5 h-5 text-white" />
        </Button>
      </Link>

      <footer className="border-t border-white/5 py-10 bg-[#09090b]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-semibold text-sm text-white/60 hover:text-white/90 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <Database className="w-4 h-4 text-white" />
              </div>
              <span>SchemaPulse</span>
            </Link>

            <div className="h-4 w-px bg-white/10" />

            <div className="text-[10px] font-medium text-white/40">
              © {new Date().getFullYear()} SchemaPulse
            </div>

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-2 text-[10px] font-medium text-emerald-400/70">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
