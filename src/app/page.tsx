import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { FAQ } from "@/components/landing/FAQ";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col font-sans antialiased overflow-x-hidden">
      <Navbar />

      <main className="grow">
        <Hero />
        <Features />

        {/* Simple CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-4xl font-bold mb-6 tracking-tight">
              Ready to master your schema?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Join thousands of developers using SchemaPulse to build better,
              faster, and more robust database architectures.
            </p>
            <Link href="/editor">
              <Button
                size="lg"
                className="h-14 px-10 text-lg font-bold rounded-full shadow-2xl shadow-primary/30"
              >
                Get Started for Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>

        <FAQ />
      </main>

      <footer className="border-t border-border/40 py-12 bg-muted/20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-lg">
            <span className="text-primary italic">S</span>
            <span>SchemaPulse</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              GitHub
            </a>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2024 SchemaPulse. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
