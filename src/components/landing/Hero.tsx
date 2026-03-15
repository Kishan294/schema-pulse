"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Box, Sparkles, Cpu } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden bg-[#05050a]">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[url('/dot-pattern.svg')] opacity-[0.03]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center max-w-6xl">
        {/* Release Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2.5 bg-white/[0.03] border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-xl">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
              LPU-Accelerated Engine v1.0
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="text-center max-w-5xl mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8"
          >
            Database Architecture,{" "}
            <br />
            <span className="text-blue-400 italic">Reimagined.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-2xl mx-auto text-base md:text-lg text-white/50 leading-relaxed font-medium"
          >
            Translate raw SQL, Prisma, and Drizzle schemas into intelligent,
            human-readable ER diagrams. Powered by{" "}
            <span className="text-white/80">Groq LPU</span> for instantaneous
            semantic mapping.
          </motion.p>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-20"
        >
          <Link href="/editor">
            <Button
              size="xl"
              className="h-14 px-8 text-base font-semibold bg-blue-600 text-white hover:bg-blue-500 rounded-xl shadow-xl shadow-blue-500/25 border border-blue-400/30 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="#features">
            <Button
              size="xl"
              variant="outline"
              className="h-14 px-8 text-base font-semibold border-white/10 hover:bg-white/5 rounded-xl transition-all"
            >
              See Capabilities
            </Button>
          </Link>
        </motion.div>

        {/* Presentation Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="w-full max-w-6xl relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-[32px] blur opacity-20" />

          <div className="relative rounded-[32px] p-2 bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/5 overflow-hidden">
            <div className="rounded-[28px] border border-white/5 bg-[#09090b] aspect-video flex flex-col overflow-hidden">
              {/* Browser UI */}
              <div className="h-11 border-b border-white/5 flex items-center justify-between px-5 bg-white/[0.02]">
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full bg-white/5"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 rounded-lg bg-white/5 text-[9px] font-medium text-white/20 uppercase tracking-wider">
                    workspace
                  </div>
                </div>
                <div className="w-12" />
              </div>

              <div className="grow flex">
                {/* Left: Code */}
                <div className="w-[35%] border-r border-white/5 p-6 font-mono text-xs opacity-40 select-none bg-[#0a0a0f]">
                  <div className="flex flex-col gap-1.5">
                    <div className="text-blue-400">
                      model{" "}
                      <span className="text-white">Organization</span> &#123;
                    </div>
                    <div className="pl-6">
                      id <span className="text-purple-400">Int</span> @id
                    </div>
                    <div className="pl-6">
                      name <span className="text-purple-400">String</span>
                    </div>
                    <div className="pl-6">
                      members <span className="text-purple-400">User[]</span>
                    </div>
                    <div className="text-white">&#125;</div>
                  </div>
                </div>

                {/* Right: Diagram */}
                <div className="grow bg-[url('/dot-pattern.svg')] bg-[length:24px_24px] bg-[#05050a] flex items-center justify-center p-12">
                  <div className="relative flex items-center gap-16 text-white">
                    {/* Schema Node Simulation */}
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl w-40 shadow-2xl">
                      <div className="flex items-center gap-2.5 mb-3">
                        <Database className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-[9px] font-medium uppercase tracking-wider text-white/60">
                          Org
                        </span>
                      </div>
                      <div className="space-y-1.5 opacity-20">
                        <div className="h-1.5 w-full bg-white rounded-full" />
                        <div className="h-1.5 w-1/2 bg-white rounded-full" />
                      </div>
                    </div>

                    <div className="bg-white/5 border border-blue-500/40 p-4 rounded-xl w-40 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                      <div className="flex items-center gap-2.5 mb-3">
                        <Box className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-[9px] font-medium uppercase tracking-wider text-white/60">
                          User
                        </span>
                      </div>
                      <div className="space-y-1.5 opacity-20">
                        <div className="h-1.5 w-full bg-white rounded-full" />
                        <div className="h-1.5 w-3/4 bg-white rounded-full" />
                      </div>
                    </div>

                    {/* Connection Badge */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-lg">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* HUD Elements */}
                <div className="absolute bottom-5 right-5">
                  <div className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 backdrop-blur-xl flex items-center gap-2">
                    <Cpu className="w-3 h-3 text-blue-400" />
                    <span className="text-[9px] font-medium uppercase tracking-wider text-blue-400">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
