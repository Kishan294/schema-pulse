"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

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
                className="border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] px-6 rounded-xl transition-all duration-300 overflow-hidden"
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

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 backdrop-blur-xl max-w-2xl">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <HelpCircle className="w-5 h-5 text-white" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h4 className="font-semibold text-white mb-1">
                Still have questions?
              </h4>
              <p className="text-xs text-white/50 font-medium">
                Get in touch with our team for technical audits or enterprise
                support.
              </p>
            </div>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-black hover:bg-white/90 font-semibold px-6 rounded-lg h-10 flex gap-2"
            >
              Contact Sales
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
