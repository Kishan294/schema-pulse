"use client";

import {
  Activity,
  Database,
  FileJson,
  GitBranch,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    title: "AI Semantic Engine",
    description:
      "Groq-powered logic that interprets your database structure and provides human-readable explanations.",
    icon: Sparkles,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Relationship Mapping",
    description:
      "Detects implicit connections between tables that aren't defined by explicit foreign keys using LLM inference.",
    icon: GitBranch,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    title: "Instant Visualization",
    description:
      "Automatic ER diagram generation with intelligent layout and relationship mapping for complex structures.",
    icon: LayoutGrid,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    title: "Universal Support",
    description:
      "Built-in support for SQL, Prisma, and Drizzle. Native comprehension of modern ORM protocols.",
    icon: FileJson,
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-40 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8"
          >
            <Activity className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
              Core Intelligence
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            Architectural Clarity, <br /> At the speed of thought.
          </h2>
          <p className="text-white/40 text-lg font-medium leading-relaxed">
            We removed the friction from database design. Focus on your business
            logic, not the drawing board.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-3xl border border-white/5 bg-white/1 hover:bg-white/3 transition-all hover:border-primary/20 flex flex-col items-start gap-8"
            >
              <div
                className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center`}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4 text-white group-hover:text-primary transition-colors">
                  {feature.title}
                </h4>
                <p className="text-sm text-white/40 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Detail Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 p-12 rounded-[40px] border border-white/5 bg-linear-to-br from-white/2 to-transparent flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative"
        >
          <div className="max-w-xl relative z-10">
            <h3 className="text-3xl font-bold mb-6">
              Designed for real-world complexity
            </h3>
            <p className="text-white/40 font-medium leading-relaxed mb-8 text-lg">
              Whether you&apos;re managing 10 tables or 1,000, our engine uses
              advanced graph partitioning to keep your diagrams legible and
              interactive.
            </p>
            <div className="flex flex-wrap gap-4">
              {["PostgreSQL", "MySQL", "SQLite", "Prisma", "Drizzle"].map(
                (tag) => (
                  <div
                    key={tag}
                    className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/40"
                  >
                    {tag}
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="relative group lg:pr-20">
            <div className="absolute -inset-20 bg-primary/20 blur-[100px] rounded-full opacity-50 -z-10 group-hover:opacity-80 transition-opacity" />
            <div className="grid grid-cols-2 gap-4 scale-90 md:scale-100">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-32 h-32 rounded-2xl border border-white/10 glass-card flex items-center justify-center ${i % 2 === 0 ? "mt-8" : ""}`}
                >
                  <Database className="w-8 h-8 text-white/20 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
