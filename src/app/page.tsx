"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { FAQ } from "@/components/landing/FAQ";
import { Button } from "@/components/ui/button";
import { ArrowRight, Twitter, Github, Linkedin, Database } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col font-sans antialiased overflow-x-hidden bg-background">
      <Navbar />

      <main className="grow">
        <Hero />
        <Features />

        {/* Cinematic CTA Section */}
        <section className="py-24 relative overflow-hidden group">
          <div className="container mx-auto px-6">
            <div className="relative rounded-[60px] border border-white/5 bg-gradient-to-b from-primary/10 via-background to-background p-16 md:p-32 overflow-hidden text-center shadow-3xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/30 blur-[130px] -z-10 rounded-full animate-pulse" />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tightest leading-[0.85] font-heading">
                  <span className="text-white/30 italic">Stop Drawing.</span><br />
                  <span className="text-gradient hover:scale-105 transition-transform inline-block">Start Building.</span>
                </h2>
                <p className="text-2xl text-white/40 mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
                  Bridge the gap between raw code and architectural clarity. Experience the next generation of database visualization powered by Groq AI.
                </p>
                
                <Link href="/editor">
                  <Button
                    size="xl"
                    className="h-20 px-16 text-2xl font-black rounded-3xl shadow-[0_20px_50px_rgba(137,87,229,0.4)] transition-all hover:scale-105 active:scale-95 bg-primary text-white hover:bg-primary/90 font-heading"
                  >
                    Launch Workspace
                    <ArrowRight className="ml-4 w-8 h-8" />
                  </Button>
                </Link>
                
                <div className="mt-20 flex flex-wrap items-center justify-center gap-12 text-white/10 font-black text-xl tracking-widest uppercase italic">
                  <span>Scalable</span>
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <span>Interactive</span>
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <span>AI-Driven</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <FAQ />
      </main>

      <footer className="border-t border-white/5 py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center gap-4 font-black text-3xl tracking-tighter mb-10 group">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(137,87,229,0.4)] group-hover:rotate-12 transition-all">
                  <Database className="w-7 h-7 text-white" />
                </div>
                <span className="text-gradient font-heading">SchemaPulse</span>
              </Link>
              <p className="text-white/40 text-lg max-w-md leading-relaxed mb-12 font-medium italic">
                "Empowering developers to visualize and optimize database architectures through Groq AI-powered intelligence."
              </p>
              <div className="flex gap-6">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-14 h-14 rounded-2xl border border-white/5 bg-white/2 flex items-center justify-center hover:bg-primary/10 hover:border-primary/20 hover:text-primary transition-all hover:-translate-y-2 shadow-lg">
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="space-y-10">
              <div>
                <h5 className="font-black text-white mb-8 uppercase tracking-[0.2em] text-xs font-heading">Product</h5>
                <ul className="space-y-6 text-white/30 text-sm font-bold">
                  <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
                  <li><Link href="/editor" className="hover:text-primary transition-colors">Editor Workspace</Link></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                </ul>
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <h5 className="font-black text-white mb-8 uppercase tracking-[0.2em] text-xs font-heading">Resource</h5>
                <ul className="space-y-6 text-white/30 text-sm font-bold">
                  <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-sm font-bold text-white/10 uppercase tracking-[0.3em]">
              © 2024 SchemaPulse. High-fidelity architecture suite.
            </div>
            <div className="flex gap-12 text-sm font-bold text-white/10 uppercase tracking-[0.3em]">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                System Active
              </span>
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
        
        {/* Footer Glow */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-primary/10 blur-[150px] -z-10 rounded-full" />
      </footer>
    </div>
  );
}
