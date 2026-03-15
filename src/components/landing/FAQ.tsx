import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Which database types are supported?",
    answer: "SchemaPulse supports SQL dialects like PostgreSQL, MySQL, and SQLite. We also specialize in ORM schemas for Prisma and Drizzle, and support NoSQL structures via JSON schema.",
  },
  {
    question: "Is my database schema safe?",
    answer: "Yes. We do not store your raw schema data. Analysis is performed in-memory to generate the diagram and insights, then discarded.",
  },
  {
    question: "Can I export my diagrams?",
    answer: "Absolutely. You can export your ER diagrams as SVG, PNG, or even high-fidelity PDFs for your technical documentation.",
  },
  {
    question: "Does it work with large databases?",
    answer: "Our engine is optimized for performance. We can visualize schemas with hundreds of tables, though we recommend using the grouping feature for projects over 50 tables.",
  },
];

export function FAQ() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold mb-12 text-center tracking-tight">
          Frequently Asked Questions
        </h2>
        <Accordion className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
