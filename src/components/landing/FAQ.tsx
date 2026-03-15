"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
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
      "When you submit a schema, our Groq AI engine analyzes the table structures, detects implicit relationships not defined by foreign keys, and provides natural language explanations and optimization suggestions.",
  },
  {
    question: "What export formats are available?",
    answer:
      "You can export your generated ER diagrams as high-resolution SVGs or PNGs, making them perfect for technical documentation, GitHub READMEs, or architectural reviews.",
  },
  {
    question: "Is my schema data saved?",
    answer:
      "Your privacy is a priority. Schemas are processed for visualization and explanation in real-time. We do not store your database structures on our servers unless you explicitly choose to save a project workspace.",
  },
];

export function FAQ() {
  return (
    <section id="docs" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid lg:grid-cols-5 gap-20">
          <div className="lg:col-span-2">
            <h2 className="text-sm font-black tracking-[0.4em] text-primary uppercase mb-8 flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Product Intelligence
            </h2>
            <h3 className="text-5xl font-black text-white leading-[1.1] mb-10 tracking-tighter font-heading">
              Frequently <br />
              <span className="text-white/30 italic">Asked.</span>
            </h3>
            <p className="text-lg text-white/40 font-medium leading-relaxed mb-12">
              Everything you need to know about transforming raw schemas into intelligent architecture maps.
            </p>
            <div className="p-8 rounded-[32px] border border-white/5 bg-white/2 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-4">
                <HelpCircle className="w-6 h-6 text-primary" />
                <span className="text-sm font-black text-white uppercase tracking-widest font-heading">
                  Technical Support
                </span>
              </div>
              <p className="text-white/30 text-sm font-medium leading-relaxed">
                Need help with a complex schema or custom integration? Our documentation and community are here to help.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Accordion className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-white/5 bg-white/2 hover:bg-white/4 px-8 rounded-[32px] transition-all duration-300 group overflow-hidden"
                  >
                    <AccordionTrigger className="text-left text-xl font-black py-8 hover:no-underline group-hover:text-primary transition-colors tracking-tight font-heading">
                      <div className="flex items-center gap-6">
                        <span className="text-white/10 group-hover:text-primary/30 transition-colors">
                          0{index + 1}
                        </span>
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-white/40 text-lg leading-relaxed pb-10 font-medium border-t border-white/5 pt-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
