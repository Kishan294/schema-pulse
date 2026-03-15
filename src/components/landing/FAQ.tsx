"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";

const faqs = [
  {
    question: "Which schema formats are supported?",
    answer:
      "SchemaPulse currently supports SQL (PostgreSQL, MySQL, SQLite), Prisma schemas, and Drizzle ORM. We utilize Groq-powered AI to parse and visualize these structures accurately.",
  },
  {
    question: "How does the AI analysis work?",
    answer:
      "Our backend leverages Groq LPU inference to process your schema semantically. It doesn't just look for foreign keys; it interprets variable names and data patterns to detect relationships and provide architectural advice.",
  },
  {
    question: "Is my schema data saved?",
    answer:
      "Privacy is built-in. Your schemas are processed in-memory for visualization and analysis. We do not store your data structures on our servers unless you explicitly choose to save a project to your local workspace.",
  },
  {
    question: "Can I export my diagrams?",
    answer:
      "Yes. You can export high-fidelity SVG or PNG versions of your architecture diagrams for use in documentation, GitHub READMEs, or presentation slides.",
  },
];

export function FAQ() {
  return (
    <section id="docs" className="py-32 relative overflow-hidden bg-[#0a0a0f]">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400 mb-4">
            Support Knowledge
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Common Questions
          </h3>
          <p className="text-white/50 text-lg font-medium">
            Everything you need to know about the platform architecture.
          </p>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3 mb-16 max-w-3xl mx-auto"
        >
          <Accordion className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-white/5 bg-white/2 hover:bg-white/4 px-6 rounded-xl transition-all duration-300 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-base font-semibold py-5 hover:no-underline group-hover:text-blue-400 transition-colors tracking-tight">
                  <div className="flex items-center gap-4">
                    <span className="text-white/30 group-hover:text-blue-400 transition-colors font-mono text-xs">
                      {index + 1}
                    </span>
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/50 text-sm leading-relaxed pb-5 pl-9 border-t border-white/5 pt-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

      </div>
    </section>
  );
}
