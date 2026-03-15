"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { FAQ } from "@/components/landing/FAQ";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Twitter,
  Github,
  Linkedin,
  Database,
  Sparkles,
  Globe,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col font-sans antialiased overflow-x-hidden bg-background">
      <Navbar />

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

        {/* Global Scalability Section */}
        <section className="py-40 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="relative">
                <div className="absolute -inset-20 bg-primary/20 blur-[120px] rounded-full opacity-30 -z-10" />
                <div className="glass-card p-1 rounded-3xl overflow-hidden border border-white/10">
                  <div className="bg-background rounded-[22px] p-8 aspect-4/3 relative flex flex-col justify-between overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Globe className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                          Global Edge Inference
                        </span>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[9px] font-bold text-green-500 uppercase tracking-widest">
                        Live Now
                      </div>
                    </div>

                    <div className="grow flex items-center justify-center">
                      <div className="relative w-full aspect-square max-w-[200px] flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 20,
                            ease: "linear",
                          }}
                          className="absolute inset-0 border border-dashed border-white/10 rounded-full"
                        />
                        <div className="absolute inset-4 border border-dashed border-primary/20 rounded-full animate-pulse" />
                        <Database className="w-12 h-12 text-primary" />
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between items-end">
                      <div className="space-y-4">
                        <div className="h-2 w-32 bg-white/10 rounded-full" />
                        <div className="h-2 w-20 bg-white/5 rounded-full" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white mb-1 tracking-tighter">
                          0.1s
                        </div>
                        <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                          Global Latency
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-w-xl">
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-8 px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest">
                  Enterprise Performance
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                  Deploy production schemas with total confidence.
                </h2>
                <p className="text-white/40 font-medium leading-relaxed mb-12 text-lg">
                  Our LPU-accelerated engine doesn&apos;t just draw diagrams; it
                  validates architectural integrity, detects data leaks, and
                  suggests indexing strategies for your specific database
                  engine.
                </p>
                <ul className="space-y-6">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Zero-Trust Privacy",
                      desc: "No schema data is ever persisted.",
                    },
                    {
                      icon: Zap,
                      title: "Instant Refresh",
                      desc: "Sync changes in 200ms or less.",
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-6 items-start group">
                      <div className="w-12 h-12 rounded-xl bg-white/2 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/20 transition-all">
                        <item.icon className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-white/40 font-medium">
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

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

      <footer className="border-t border-white/5 py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
            <div className="col-span-1 md:col-span-2">
              <Link
                href="/"
                className="flex items-center gap-3 font-bold text-2xl mb-8 active:scale-95 transition-transform w-fit"
              >
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <span>SchemaPulse</span>
              </Link>
              <p className="text-white/40 text-base max-w-xs leading-relaxed mb-10 font-medium italic">
                Empowering engineering teams to visualize and optimize critical
                database architectures.
              </p>
              <div className="flex gap-4">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-12 h-12 rounded-xl border border-white/5 bg-white/2 flex items-center justify-center hover:bg-white/5 transition-all hover:-translate-y-1"
                  >
                    <Icon className="w-5 h-5 text-white/40 hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h5 className="font-bold text-white text-xs uppercase tracking-widest">
                Platform
              </h5>
              <ul className="space-y-4 text-white/40 text-sm font-semibold">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Capabilities
                  </Link>
                </li>
                <li>
                  <Link
                    href="/editor"
                    className="hover:text-white transition-colors"
                  >
                    Workspace
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-8">
              <h5 className="font-bold text-white text-xs uppercase tracking-widest">
                Legal
              </h5>
              <ul className="space-y-4 text-white/40 text-sm font-semibold">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security Audit
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-[10px] font-bold text-white/10 uppercase tracking-[0.4em]">
              © 2024 SchemaPulse Protocol. All rights reserved.
            </div>
            <div className="flex gap-8 text-[10px] font-bold text-white/10 uppercase tracking-[0.4em]">
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse" />
                Operational
              </span>
              <span>Inference: Stable</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
