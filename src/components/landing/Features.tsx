"use client";

import { motion } from "motion/react";
import { Sparkles, LayoutGrid, Shield, GitBranch, FileJson, Terminal, MousePointer2 } from "lucide-react";

const features = [
  {
    title: "AI Semantic Engine",
    description: "Groq-powered logic that interprets your database structure and provides human-readable explanations.",
    icon: Sparkles,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    size: "lg"
  },
  {
    title: "Instant Visualization",
    description: "Automatic ER diagram generation with intelligent layout and relationship mapping.",
    icon: LayoutGrid,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    size: "sm"
  },
  {
    title: "Relationship Detection",
    description: "Detects implicit connections between tables that aren't defined by explicit foreign keys.",
    icon: GitBranch,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    size: "sm"
  },
  {
    title: "Optimization Insights",
    description: "AI-driven suggestions for improving database performance and query efficiency.",
    icon: Shield,
    color: "text-red-400",
    bg: "bg-red-500/10",
    size: "lg"
  },
  {
    title: "Universal Schema Support",
    description: "Support for SQL, Prisma, and Drizzle ORMs. Ready for production architecture.",
    icon: FileJson,
    color: "text-green-400",
    bg: "bg-green-500/10",
    size: "sm"
  },
  {
    title: "Schema REPL",
    description: "Interact with your database design using natural language queries via Groq AI.",
    icon: Terminal,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    size: "sm"
  }
];

export function Features() {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-10">
          <div className="max-w-3xl">
            <h2 className="text-sm font-black tracking-[0.4em] text-primary uppercase mb-8 flex items-center gap-4 font-heading">
              <div className="w-12 h-px bg-primary" />
              Core capabilities
            </h2>
            <h3 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tightest font-heading">
              Built for <span className="text-primary italic">Architects.</span> <br />
              Driven by <span className="text-white/30">Logic.</span>
            </h3>
          </div>
          <div className="max-w-xs md:pb-4">
            <p className="text-white/30 font-medium leading-relaxed italic text-lg font-heading">
              "We removed the friction from database design. Focus on your logic, not the drawing board."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group flex flex-col p-12 rounded-[48px] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 hover:border-primary/30 shadow-2xl ${
                feature.size === 'lg' ? 'md:col-span-2' : 'md:col-span-1'
              }`}
            >
              <div className={`w-16 h-16 rounded-3xl ${feature.bg} flex items-center justify-center mb-12 shadow-inner group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_30px_rgba(137,87,229,0.2)]`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <div className="mt-auto">
                <h4 className="text-3xl font-black mb-6 text-white group-hover:text-primary transition-colors duration-500 tracking-tighter font-heading">
                  {feature.title}
                </h4>
                <p className="text-white/40 leading-relaxed font-medium text-lg">
                  {feature.description}
                </p>
              </div>
              <div className="mt-12 pt-10 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary font-heading">Protocol Details</span>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-500">
                   <MousePointer2 className="w-5 h-5 text-primary group-hover:text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
