"use client";

import { motion } from "motion/react";
import { 
  Zap, 
  Search, 
  MousePointer2, 
  FileJson, 
  MessageSquare, 
  History 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Instant ER Diagrams",
    description: "Convert raw SQL, Prisma, or Drizzle schemas into interactive graph visualizations.",
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    title: "AI Relationship Detection",
    description: "Groq AI analyzes column naming to detect implicit relationships where foreign keys are missing.",
    icon: Search,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Performance Audit",
    description: "Get real-time suggestions for missing indexes, normalization, and potential bottlenecks.",
    icon: MousePointer2,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Multi-Format Support",
    description: "Seamlessly handles PostgreSQL, MySQL, Prisma, Drizzle, and NoSQL JSON schemas.",
    icon: FileJson,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Schema Chat",
    description: "Ask natural language questions about your architecture and get sub-second AI answers.",
    icon: MessageSquare,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Migration Helper",
    description: "Track changes between schema versions and automatically generate migration scripts.",
    icon: History,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Built for Modern Data Architects
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Stop guessing. Start visualizing. SchemaPulse gives you the tools to understand and optimize your data layer with AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50 bg-card hover:bg-muted/50 transition-colors group">
                <CardContent className="p-8">
                  <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-6 border ${feature.color.replace('text', 'border')}/20 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
