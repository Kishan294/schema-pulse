"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Database, Zap, Menu } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

export function Navbar() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const y = useTransform(scrollY, [0, 100], [20, 0]);
  const scale = useTransform(scrollY, [0, 100], [0.95, 1]);

  return (
    <>
      {/* Dynamic Floating Navbar */}
      <motion.nav 
        style={{ opacity, y, scale }}
        className="fixed top-6 inset-x-0 mx-auto w-full max-w-5xl z-100 px-6 hidden md:block"
      >
        <div className="glass rounded-[32px] h-20 px-10 flex items-center justify-between border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_25px_rgba(137,87,229,0.5)] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <Database className="w-7 h-7 text-white" />
            </div>
            <span className="font-heading font-black text-2xl tracking-tighter text-white">
              Schema<span className="text-primary italic">Pulse</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-12">
            {["Features", "Pricing", "Docs"].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-[13px] uppercase font-black tracking-[0.2em] text-white/40 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-primary rounded-full transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/editor">
              <Button size="xl" className="bg-white text-black hover:bg-white/90 font-black px-8 rounded-2xl shadow-xl transition-all active:scale-95 flex gap-3 font-heading text-sm uppercase tracking-widest shine-effect">
                <Zap className="w-4 h-4 fill-black" />
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Static/Initial Navbar state for top of page */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 w-full z-90 px-10 py-10 flex items-center justify-between"
      >
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center group-hover:bg-primary transition-all duration-500">
            <Database className="w-8 h-8 text-white" />
          </div>
          <span className="font-heading font-black text-3xl tracking-tighter text-white">
            Schema<span className="text-primary italic">Pulse</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
           <Link href="/editor">
            <Button variant="ghost" className="text-white/60 hover:text-white font-black uppercase tracking-widest text-xs h-12 px-6 rounded-2xl">
              Docs
            </Button>
          </Link>
          <Link href="/editor">
            <Button size="xl" className="bg-primary text-white hover:bg-primary/90 font-black px-10 rounded-2xl shadow-[0_0_40px_rgba(137,87,229,0.3)] transition-all active:scale-95 flex gap-3 font-heading uppercase tracking-widest text-sm shine-effect">
              <Zap className="w-5 h-5 fill-white" />
              Build Schema
            </Button>
          </Link>
        </div>
      </motion.nav>
    </>
  );
}
