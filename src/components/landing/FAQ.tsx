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
    <section id="docs" className="py-40 relative overflow-hidden bg-muted/30">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-24">
          <h2 className="text-sm font-bold tracking-[0.4em] text-primary uppercase mb-6">
            Support Knowledge
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            Common Questions
          </h3>
          <p className="text-white/40 text-lg font-medium">
            Everything you need to know about the platform architecture.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <Accordion className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-white/5 bg-black/20 hover:bg-white/2 px-8 rounded-3xl transition-all duration-300 group overflow-hidden"
              >
                <AccordionTrigger className="text-left text-lg font-bold py-8 hover:no-underline group-hover:text-primary transition-colors tracking-tight">
                  <div className="flex items-center gap-6">
                    <span className="text-white/30 group-hover:text-primary transition-colors font-mono text-sm leading-none">
                      0{index + 1}
                    </span>
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/40 text-base leading-relaxed pb-8 pl-12 border-t border-white/5 pt-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <div className="mt-20 flex justify-center">
          <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] flex flex-col md:flex-row items-center gap-8 backdrop-blur-xl">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-center md:text-left">
              <h4 className="font-bold text-white mb-2">
                Still have questions?
              </h4>
              <p className="text-sm text-white/40 font-medium">
                Get in touch with our team for technical audits or enterprise
                support.
              </p>
            </div>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-black hover:bg-white/90 font-bold px-8 rounded-xl h-12 flex gap-2"
            >
              Contact Sales
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
