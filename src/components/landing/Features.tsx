"use client";

import { Activity, Database, GitBranch, LayoutGrid, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    title: "AI-Powered Analysis",
    description:
      "Optional Groq-powered AI that analyzes your schema and provides architectural insights, optimization suggestions, and detects potential issues.",
    icon: Sparkles,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Relationship Mapping",
    description:
      "Automatically detects and visualizes relationships between tables including 1:1, 1:N, and N:M connections with intelligent edge rendering.",
    icon: GitBranch,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    title: "Instant Visualization",
    description:
      "Real-time ER diagram generation with interactive nodes, draggable tables, zoom/pan controls, and export to PNG or SVG formats.",
    icon: LayoutGrid,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-32 relative overflow-hidden bg-[#05050a]">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8"
          >
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
              Core Intelligence
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Architectural Clarity,{" "}
            <br />
            At the speed of thought.
          </h2>
          <p className="text-white/50 text-lg font-medium leading-relaxed">
            We removed the friction from database design. Focus on your business
            logic, not the drawing board.
          </p>
        </div>

        {/* Features Grid - Centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
            >
              <div
                className={`w-11 h-11 rounded-lg ${feature.bg} flex items-center justify-center mb-6`}
              >
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Technical Detail Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-10 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden relative max-w-5xl mx-auto"
        >
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold mb-4">
              Designed for real-world complexity
            </h3>
            <p className="text-white/50 font-medium leading-relaxed mb-6">
              Whether you&apos;re managing 10 tables or 1,000, our engine uses
              advanced graph partitioning to keep your diagrams legible and
              interactive.
            </p>
            <div className="flex flex-wrap gap-3">
              {["PostgreSQL", "MySQL", "SQLite", "Prisma", "Drizzle"].map(
                (tag) => (
                  <div
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-medium uppercase tracking-wide text-white/40"
                  >
                    {tag}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-16 bg-blue-500/10 blur-[80px] rounded-full opacity-40" />
            <div className="grid grid-cols-2 gap-3 relative">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-20 h-20 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center ${
                    i % 2 === 0 ? "mt-6" : ""
                  }`}
                >
                  <Database className="w-6 h-6 text-white/20 group-hover:text-blue-400 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
