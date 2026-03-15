"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Database, Code2, Cpu, Box, Share2, Layers } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-40 pb-32 overflow-hidden bg-mesh">
      {/* Structural Background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20 -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge 
              variant="outline" 
              className="mb-10 px-6 py-2 border-primary/20 bg-primary/5 text-primary rounded-full font-black text-[10px] uppercase tracking-[0.4em] shadow-[0_0_20px_rgba(137,87,229,0.2)]"
            >
              The AI Architect Suite
            </Badge>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-[7rem] font-black tracking-tightest leading-[0.9] mb-10 font-heading"
          >
            Schemas <span className="text-white/20">to</span> <br />
            <span className="text-primary italic">Intelligence.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-xl md:text-2xl text-white/40 mb-14 leading-relaxed font-medium"
          >
            Paste your <span className="text-white font-bold">SQL</span>, <span className="text-white font-bold">Prisma</span>, or <span className="text-white font-bold">Drizzle</span> schema and let Groq AI explain, map, and optimize your database architecture instantly.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <Link href="/editor">
              <Button size="2xl" className="bg-white text-black hover:bg-white/90 font-black px-12 rounded-[32px] shadow-2xl transition-all hover:scale-105 active:scale-95 flex gap-4 font-heading group h-20 text-xl shine-effect">
                Enter Workspace
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="2xl" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white font-black px-12 rounded-[32px] transition-all h-20 text-xl font-heading">
                Explore Functions
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Dashboard Preview - Honest Representation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="relative max-w-6xl mx-auto group"
        >
          <div className="relative glass rounded-[48px] p-3 overflow-hidden shadow-[0_100px_200px_rgba(0,0,0,0.8)] border border-white/5 bg-black/40">
            <div className="bg-[#02040a] rounded-[40px] aspect-[16/10] flex flex-col overflow-hidden border border-white/5">
              
              {/* Toolbar */}
              <div className="h-16 border-b border-white/5 flex items-center justify-between px-10 bg-white/[0.02]">
                <div className="flex gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500/20 border border-red-500/10" />
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/20 border border-yellow-500/10" />
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500/20 border border-green-500/10" />
                </div>
                <div className="flex items-center gap-4">
                   <div className="px-4 py-1.5 rounded-xl border border-white/5 bg-white/2 text-[10px] font-black text-white/30 tracking-widest uppercase">
                     protocol://mainnet-v1
                   </div>
                </div>
                <div className="flex items-center gap-4 grayscale opacity-40">
                  <Share2 className="w-4 h-4" />
                  <Layers className="w-4 h-4" />
                </div>
              </div>

              <div className="grow flex">
                {/* Source View (Left) */}
                <div className="w-[38%] border-r border-white/5 flex flex-col bg-white/[0.01]">
                   <div className="h-12 border-b border-white/5 flex items-center px-8 gap-3">
                      <Code2 className="w-4 h-4 text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/30">schema.prisma</span>
                   </div>
                   <div className="p-8 font-mono text-sm space-y-3 opacity-40 leading-relaxed text-blue-300">
                      <div><span className="text-purple-400">model</span> <span className="text-white">User</span> &#123;</div>
                      <div className="pl-6">id <span className="text-purple-400">Int</span> @id @default(autoincrement())</div>
                      <div className="pl-6">email <span className="text-purple-400">String</span> @unique</div>
                      <div className="pl-6">posts <span className="text-purple-400">Post[]</span></div>
                      <div>&#125;</div>
                      <div className="pt-4"><span className="text-purple-400">model</span> <span className="text-white">Post</span> &#123;</div>
                      <div className="pl-6">id <span className="text-purple-400">Int</span> @id</div>
                      <div className="pl-6">authorId <span className="text-purple-400">Int</span></div>
                      <div>&#125;</div>
                   </div>
                   <div className="mt-auto p-8 border-t border-white/5 bg-primary/5">
                      <div className="flex items-center gap-4 mb-4">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <span className="text-xs font-black text-white uppercase tracking-widest">Groq Insights</span>
                      </div>
                      <div className="h-2 w-full bg-primary/20 rounded-full" />
                      <div className="h-2 w-2/3 bg-primary/20 rounded-full mt-2" />
                   </div>
                </div>

                {/* Graph View (Right) */}
                <div className="grow bg-dot-pattern opacity-60 relative flex items-center justify-center">
                   <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent" />
                   
                   <div className="relative flex items-center gap-12">
                      <div className="glass p-6 rounded-3xl border-primary/20 w-48 shadow-2xl relative">
                        <div className="flex items-center gap-3 mb-4">
                          <Database className="w-5 h-5 text-primary" />
                          <span className="text-[10px] font-black uppercase text-white tracking-widest">User</span>
                        </div>
                        <div className="space-y-2 opacity-30">
                           <div className="h-1.5 w-full bg-white/20 rounded-full" />
                           <div className="h-1.5 w-2/3 bg-white/20 rounded-full" />
                        </div>
                        <div className="absolute right-[-24px] top-1/2 -translate-y-1/2 w-12 h-px border-t border-dashed border-primary" />
                      </div>

                      <div className="glass p-6 rounded-3xl border-white/10 w-48 shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                          <Box className="w-5 h-5 text-blue-400" />
                          <span className="text-[10px] font-black uppercase text-white tracking-widest">Post</span>
                        </div>
                        <div className="space-y-2 opacity-30">
                           <div className="h-1.5 w-full bg-white/20 rounded-full" />
                           <div className="h-1.5 w-3/4 bg-white/20 rounded-full" />
                        </div>
                      </div>
                   </div>

                   {/* Float Label */}
                   <div className="absolute bottom-10 left-10 flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-xl">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Visualizer Active</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Specs - Truthful indicators */}
          <div className="absolute -top-12 -left-12 lg:-left-20 glass p-6 rounded-[32px] border-primary/20 shadow-2xl z-20 hidden lg:block">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                   <Cpu className="w-6 h-6 text-primary" />
                </div>
                <div>
                   <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Compute Base</div>
                   <div className="text-lg font-black text-white italic">Groq LPU Engine</div>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Brand Support */}
        <div className="mt-32 pt-20 border-t border-white/5 flex flex-col items-center gap-12">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10">Compatible with Industry Protocols</span>
           <div className="flex flex-wrap items-center justify-center gap-16 grayscale opacity-20 hover:opacity-50 transition-all duration-700">
              <div className="text-2xl font-black tracking-tightest">POSTGRESQL</div>
              <div className="text-2xl font-black tracking-tightest">MYSQL</div>
              <div className="text-2xl font-black tracking-tightest">PRISMA</div>
              <div className="text-2xl font-black tracking-tightest">DRIZZLE</div>
              <div className="text-2xl font-black tracking-tightest">ORACLE</div>
           </div>
        </div>
      </div>
    </section>
  );
}
