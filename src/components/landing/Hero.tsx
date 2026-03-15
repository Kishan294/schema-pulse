"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Box, Sparkles, Cpu } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-32 overflow-hidden bg-mesh">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10 -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Release Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-3 backdrop-blur-xl">
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">LPU-Accelerated Engine v1.0</span>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="text-center max-w-4xl mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold tracking-tightest leading-[1.05] mb-8 font-heading"
          >
            Database Architecture, <br />
            <span className="text-primary italic">Reimagined.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/40 leading-relaxed font-medium"
          >
            Translate raw SQL, Prisma, and Drizzle schemas into intelligent, human-readable ER diagrams. Powered by <span className="text-white">Groq LPU</span> for instantaneous semantic mapping.
          </motion.p>
        </div>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-24"
        >
          <Link href="/editor">
            <Button size="xl" className="h-16 px-12 text-lg font-bold bg-white text-black hover:bg-white/90 rounded-2xl shadow-2xl flex gap-3 transition-all hover:scale-105 active:scale-95 group">
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="xl" variant="outline" className="h-16 px-10 text-lg font-bold border-white/10 hover:bg-white/5 rounded-2xl transition-all">
              See Capabilities
            </Button>
          </Link>
        </motion.div>

        {/* Presentation Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="w-full max-w-6xl relative group"
        >
          <div className="absolute -inset-1 bg-linear-to-r from-primary/30 to-accent/30 rounded-[40px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative glass-card rounded-[36px] p-2 bg-black/40 overflow-hidden">
            <div className="rounded-[30px] border border-white/5 bg-card aspect-video flex flex-col overflow-hidden">
               {/* Browser UI */}
               <div className="h-12 border-b border-white/5 flex items-center justify-between px-6 bg-white/2">
                  <div className="flex gap-2">
                     {[1,2,3].map(i => <div key={i} className="w-3 h-3 rounded-full bg-white/5" />)}
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="px-4 py-1 rounded-lg bg-white/5 text-[9px] font-bold text-white/20 tracking-widest uppercase">
                       workspace_production_v2
                     </div>
                  </div>
                  <div className="w-16" />
               </div>

               <div className="grow flex relative">
                  {/* Left: Code */}
                  <div className="w-[35%] border-r border-white/5 p-8 font-mono text-xs opacity-40 select-none">
                     <div className="flex flex-col gap-1.5">
                        <div className="text-blue-400">model <span className="text-white">Organization</span> &#123;</div>
                        <div className="pl-6">id <span className="text-purple-400">Int</span> @id</div>
                        <div className="pl-6">name <span className="text-purple-400">String</span></div>
                        <div className="pl-6">members <span className="text-purple-400">User[]</span></div>
                        <div className="text-white">&#125;</div>
                     </div>
                  </div>

                  {/* Right: Diagram */}
                  <div className="grow bg-dot-pattern flex items-center justify-center p-12">
                     <div className="relative flex items-center gap-20 text-white">
                        {/* Schema Node Simulation */}
                        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl w-44 shadow-2xl relative">
                           <div className="flex items-center gap-3 mb-4">
                              <Database className="w-4 h-4 text-primary" />
                              <span className="text-[10px] font-bold uppercase tracking-widest">Org</span>
                           </div>
                           <div className="space-y-2 opacity-20">
                              <div className="h-1.5 w-full bg-white rounded-full" />
                              <div className="h-1.5 w-1/2 bg-white rounded-full" />
                           </div>
                        </div>

                        <div className="bg-white/5 border border-primary/40 p-5 rounded-2xl w-44 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                           <div className="flex items-center gap-4 mb-4">
                              <Box className="w-4 h-4 text-primary" />
                              <span className="text-[10px] font-bold uppercase tracking-widest">User</span>
                           </div>
                           <div className="space-y-2 opacity-20">
                              <div className="h-1.5 w-full bg-white rounded-full" />
                              <div className="h-1.5 w-3/4 bg-white rounded-full" />
                           </div>
                        </div>

                        {/* Connection Badge */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                           <div className="bg-primary text-white p-2 rounded-lg shadow-2xl animate-pulse">
                              <Sparkles className="w-4 h-4" />
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* HUD Elements */}
                  <div className="absolute bottom-6 right-6 flex items-center gap-4">
                     <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 backdrop-blur-xl flex items-center gap-3">
                        <Cpu className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Inference Active</span>
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
