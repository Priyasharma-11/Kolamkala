import { Link } from "wouter";
import { ArrowRight, Search, Sparkles, BookOpen, History, Palette, Shapes, CircleDot, Grid3X3, PenTool, Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KolamPatternBg } from "@/components/kolam-pattern-bg";

import heroImage from "@assets/generated_images/kolam_drawing_hero_image.png";
import sikkuImage from "@assets/generated_images/sikku_kolam_pattern.png";
import neliImage from "@assets/generated_images/neli_kolam_pattern.png";
import pulliImage from "@assets/generated_images/pulli_kolam_pattern.png";
import geometricImage from "@assets/generated_images/geometric_kolam_pattern.png";
import freehandImage from "@assets/generated_images/freehand_kolam_pattern.png";
import coloredImage from "@assets/generated_images/colored_kolam_pattern.png";

const kolamTypes = [
  {
    id: "sikku",
    name: "Sikku Kolam",
    description: "Continuous curved lines weaving around dots in intricate interlocking patterns",
    image: sikkuImage,
    icon: Shapes,
  },
  {
    id: "neli",
    name: "Neli Kolam",
    description: "Elegant floral designs with straight lines connecting dots to form petals",
    image: neliImage,
    icon: Sparkles,
  },
  {
    id: "pulli",
    name: "Pulli Kolam",
    description: "Grid-based dot patterns with decorative connecting lines",
    image: pulliImage,
    icon: CircleDot,
  },
  {
    id: "geometric",
    name: "Geometric Kolam",
    description: "Mathematical precision with circles, triangles, and symmetrical shapes",
    image: geometricImage,
    icon: Grid3X3,
  },
  {
    id: "freehand",
    name: "Freehand Kolam",
    description: "Artistic flowing curves with creative flourishes and organic designs",
    image: freehandImage,
    icon: PenTool,
  },
  {
    id: "colored",
    name: "Colored Kolam",
    description: "Vibrant festival designs using multiple colored powders",
    image: coloredImage,
    icon: Paintbrush,
  },
];

const features = [
  {
    icon: Search,
    title: "AI-Powered Analysis",
    description:
      "Upload any Kolam image and get detailed analysis including symmetry detection, pattern classification, and color extraction.",
  },
  {
    icon: Palette,
    title: "Interactive Generator",
    description:
      "Create beautiful Kolam designs with our intuitive generator. Choose styles, complexity, and export as SVG or PNG.",
  },
  {
    icon: BookOpen,
    title: "Step-by-Step Learning",
    description:
      "Master Kolam art from beginner to advanced with structured lessons, video tutorials, and practice exercises.",
  },
  {
    icon: History,
    title: "Rich Heritage",
    description:
      "Explore the fascinating history and cultural significance of this ancient South Indian art form.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative min-h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Traditional Kolam art being created"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 flex min-h-[85vh] items-center">
          <div className="container mx-auto max-w-7xl px-4 py-24 md:px-6">
            <div className="max-w-3xl space-y-6">
              <Badge variant="secondary" className="border-gold/30 bg-gold/20 text-white">
                AI-Powered Kolam Art Platform
              </Badge>
              <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Explore, Analyze &{" "}
                <span className="text-gold">Create Kolam Art</span>
              </h1>
              <p className="text-lg text-white/90 md:text-xl">
                Discover the beauty of traditional South Indian floor art. Analyze patterns
                with AI, generate stunning designs, and learn from expert tutorials.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/analyzer">
                  <Button size="lg" className="gap-2" data-testid="button-hero-analyze">
                    <Search className="h-5 w-5" />
                    Analyze Kolam
                  </Button>
                </Link>
                <Link href="/generator">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-white/30 bg-white/10 text-white backdrop-blur-sm"
                    data-testid="button-hero-create"
                  >
                    <Sparkles className="h-5 w-5" />
                    Create Design
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 pt-8">
                <div className="rounded-md bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <p className="text-2xl font-bold text-white">10K+</p>
                  <p className="text-sm text-white/80">Patterns Analyzed</p>
                </div>
                <div className="rounded-md bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <p className="text-2xl font-bold text-white">6</p>
                  <p className="text-sm text-white/80">Kolam Styles</p>
                </div>
                <div className="rounded-md bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <p className="text-2xl font-bold text-white">15+</p>
                  <p className="text-sm text-white/80">Video Tutorials</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <KolamPatternBg opacity={0.03} />
        <div className="container relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4 border-primary/30">
              Variety of Kolam
            </Badge>
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Explore Different Kolam Styles
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              From intricate continuous lines to vibrant festival designs, discover the
              diverse world of Kolam art and its unique characteristics.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {kolamTypes.map((kolam) => (
              <Card
                key={kolam.id}
                className="group overflow-visible hover-elevate"
                data-testid={`card-kolam-${kolam.id}`}
              >
                <div className="relative aspect-square overflow-hidden rounded-t-md">
                  <img
                    src={kolam.image}
                    alt={kolam.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/90">
                        <kolam.icon className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-white">
                        {kolam.name}
                      </h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{kolam.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent/30 py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4 border-gold/30">
              Features
            </Badge>
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Everything You Need for Kolam Art
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Our comprehensive platform provides all the tools to analyze, create,
              and master the art of Kolam.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="overflow-visible hover-elevate"
                data-testid={`card-feature-${index}`}
              >
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <KolamPatternBg opacity={0.02} />
        <div className="container relative mx-auto max-w-7xl px-4 text-center md:px-6">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Ready to Start Your Kolam Journey?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Whether you want to analyze existing patterns, create new designs, or
            learn the traditional art form, we have everything you need.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/analyzer">
              <Button size="lg" className="gap-2" data-testid="button-cta-analyze">
                Start Analyzing
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/learning">
              <Button size="lg" variant="outline" className="gap-2" data-testid="button-cta-learn">
                <BookOpen className="h-4 w-4" />
                Start Learning
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
