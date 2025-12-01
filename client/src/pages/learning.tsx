import { useState } from "react";
import { Link } from "wouter";
import {
  PlayCircle,
  Clock,
  ChevronRight,
  BookOpen,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { KolamPatternBg } from "@/components/kolam-pattern-bg";
import type { Lesson, LessonStep } from "@shared/schema";

const lessons: Lesson[] = [
  {
    id: "beginner-1",
    level: 1,
    title: "Introduction to Kolam Art",
    description:
      "Learn the basics of Kolam, its cultural significance, and the tools you'll need to get started.",
    duration: "15 min",
    videoId: "dQw4w9WgXcQ",
    steps: [
      {
        order: 1,
        title: "Understanding Kolam",
        description:
          "Kolam is a traditional South Indian art form drawn using rice flour, chalk, or colored powders at the entrance of homes.",
      },
      {
        order: 2,
        title: "Materials Needed",
        description:
          "You'll need rice flour (or chalk powder), a flat surface, and optionally a template or guide dots.",
      },
      {
        order: 3,
        title: "Basic Techniques",
        description:
          "Learn to hold and release powder consistently to create smooth, continuous lines.",
      },
    ],
    practicePreset: {
      style: "pulli",
      complexity: 1,
      symmetryType: "vertical",
      rows: 3,
      cols: 3,
    },
  },
  {
    id: "beginner-2",
    level: 1,
    title: "Drawing Your First Dot Grid",
    description:
      "Master the foundation of most Kolam designs - the dot grid or pulli pattern.",
    duration: "20 min",
    videoId: "dQw4w9WgXcQ",
    steps: [
      {
        order: 1,
        title: "Planning Your Grid",
        description: "Start with a simple 3x3 dot grid. Mark evenly spaced dots in rows and columns.",
      },
      {
        order: 2,
        title: "Connecting Dots",
        description:
          "Practice connecting adjacent dots with straight lines to form basic shapes.",
      },
      {
        order: 3,
        title: "Creating Symmetry",
        description:
          "Ensure your design is symmetrical by working from the center outward.",
      },
    ],
    practicePreset: {
      style: "pulli",
      complexity: 2,
      symmetryType: "vertical",
      rows: 5,
      cols: 5,
    },
  },
  {
    id: "beginner-3",
    level: 1,
    title: "Simple Floral Patterns",
    description: "Create beautiful flower-like designs using basic Kolam techniques.",
    duration: "25 min",
    videoId: "dQw4w9WgXcQ",
    steps: [
      {
        order: 1,
        title: "Petal Formation",
        description: "Learn to draw curved lines that form petals around a central dot.",
      },
      {
        order: 2,
        title: "Adding Details",
        description: "Enhance your flower with additional curves and decorative elements.",
      },
      {
        order: 3,
        title: "Completing the Design",
        description: "Connect multiple flowers to create a cohesive pattern.",
      },
    ],
    practicePreset: {
      style: "neli",
      complexity: 2,
      symmetryType: "radial",
      rows: 5,
      cols: 5,
    },
  },
  {
    id: "intermediate-1",
    level: 2,
    title: "Sikku Kolam Fundamentals",
    description:
      "Learn the art of drawing continuous curved lines that weave around dots.",
    duration: "30 min",
    videoId: "dQw4w9WgXcQ",
    steps: [
      {
        order: 1,
        title: "Understanding Sikku",
        description:
          "Sikku means 'interlocking' - these designs feature continuous lines that never cross themselves.",
      },
      {
        order: 2,
        title: "The Weaving Technique",
        description:
          "Practice weaving your line around dots, going over and under in a consistent pattern.",
      },
      {
        order: 3,
        title: "Closing the Loop",
        description:
          "Learn to end your line exactly where it started, creating a seamless design.",
      },
      {
        order: 4,
        title: "Adding Complexity",
        description:
          "Gradually add more dots and intricate weaving patterns to your Sikku designs.",
      },
    ],
    practicePreset: {
      style: "sikku",
      complexity: 3,
      symmetryType: "vertical",
      rows: 5,
      cols: 5,
    },
  },
  {
    id: "intermediate-2",
    level: 2,
    title: "Geometric Symmetry",
    description:
      "Create stunning geometric Kolam designs with perfect radial symmetry.",
    duration: "35 min",
    videoId: "dQw4w9WgXcQ",
    steps: [
      {
        order: 1,
        title: "Center Point",
        description: "Every geometric Kolam starts with establishing a clear center point.",
      },
      {
        order: 2,
        title: "Dividing the Space",
        description:
          "Learn to divide your design space into equal sectors for radial symmetry.",
      },
      {
        order: 3,
        title: "Drawing One Sector",
        description:
          "Create your design in one sector, then replicate it around the center.",
      },
      {
        order: 4,
        title: "Connecting Sectors",
        description: "Add elements that bridge sectors to create unity in your design.",
      },
    ],
    practicePreset: {
      style: "geometric",
      complexity: 3,
      symmetryType: "radial",
      rows: 7,
      cols: 7,
    },
  },
  {
    id: "intermediate-3",
    level: 2,
    title: "Color Theory in Kolam",
    description: "Explore the use of colored powders to create vibrant festival Kolams.",
    duration: "30 min",
    videoId: "dQw4w9WgXcQ",
    steps: [
      {
        order: 1,
        title: "Traditional Colors",
        description:
          "Understand the significance of red, yellow, green, and other traditional colors.",
      },
      {
        order: 2,
        title: "Color Placement",
        description: "Learn where to place colors for maximum visual impact.",
      },
      {
        order: 3,
        title: "Blending Techniques",
        description: "Practice creating smooth transitions between colors.",
      },
    ],
    practicePreset: {
      style: "neli",
      complexity: 3,
      symmetryType: "radial",
      rows: 7,
      cols: 7,
    },
  },
  {
    id: "advanced-1",
    level: 3,
    title: "Complex Sikku Patterns",
    description:
      "Master advanced Sikku designs with multiple interlocking loops and intricate paths.",
    duration: "45 min",
    videoId: "dQw4w9WgXcQ",
    steps: [
      {
        order: 1,
        title: "Multi-Loop Planning",
        description:
          "Plan designs with multiple independent loops that interact harmoniously.",
      },
      {
        order: 2,
        title: "Nested Patterns",
        description: "Create patterns within patterns for added depth and complexity.",
      },
      {
        order: 3,
        title: "Asymmetric Balance",
        description:
          "Learn to create visually balanced designs that aren't strictly symmetrical.",
      },
      {
        order: 4,
        title: "Troubleshooting",
        description: "Common mistakes and how to fix or work around them.",
      },
    ],
    practicePreset: {
      style: "sikku",
      complexity: 5,
      symmetryType: "radial",
      rows: 9,
      cols: 9,
    },
  },
  {
    id: "advanced-2",
    level: 3,
    title: "Festival Special Kolams",
    description:
      "Learn to create elaborate festival Kolams for Pongal, Diwali, and other celebrations.",
    duration: "60 min",
    videoId: "dQw4w9WgXcQ",
    steps: [
      {
        order: 1,
        title: "Festival Traditions",
        description: "Understand the specific Kolam traditions for different festivals.",
      },
      {
        order: 2,
        title: "Large-Scale Design",
        description: "Techniques for creating Kolams that span large areas.",
      },
      {
        order: 3,
        title: "Incorporating Symbols",
        description:
          "Add traditional symbols like lamps, peacocks, and lotus flowers.",
      },
      {
        order: 4,
        title: "Group Kolam Drawing",
        description: "Coordinate with others to create community Kolams.",
      },
    ],
    practicePreset: {
      style: "geometric",
      complexity: 5,
      symmetryType: "radial",
      rows: 9,
      cols: 9,
    },
  },
  {
    id: "advanced-3",
    level: 3,
    title: "Contemporary Fusion Designs",
    description: "Blend traditional Kolam with modern artistic elements.",
    duration: "50 min",
    videoId: "dQw4w9WgXcQ",
    steps: [
      {
        order: 1,
        title: "Traditional Meets Modern",
        description: "Identify elements from both styles that can work together.",
      },
      {
        order: 2,
        title: "Experimental Techniques",
        description: "Try non-traditional tools and materials.",
      },
      {
        order: 3,
        title: "Personal Style",
        description: "Develop your unique artistic voice within the Kolam tradition.",
      },
    ],
    practicePreset: {
      style: "freehand",
      complexity: 4,
      symmetryType: "horizontal",
      rows: 7,
      cols: 7,
    },
  },
];

const levelInfo = [
  {
    level: 1,
    title: "Beginner",
    description: "Start your Kolam journey with basic patterns and techniques",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
    icon: Star,
  },
  {
    level: 2,
    title: "Intermediate",
    description: "Advance to complex patterns and symmetry techniques",
    color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    icon: Star,
  },
  {
    level: 3,
    title: "Advanced",
    description: "Master intricate designs and festival special Kolams",
    color: "bg-primary/10 text-primary",
    icon: Star,
  },
];

function LessonCard({ lesson }: { lesson: Lesson }) {
  const levelData = levelInfo[lesson.level - 1];

  return (
    <Card className="overflow-visible hover-elevate" data-testid={`card-lesson-${lesson.id}`}>
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 font-serif text-lg font-bold text-gold-dark">
              {lessons.filter((l) => l.level === lesson.level).indexOf(lesson) + 1}
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold">{lesson.title}</h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {lesson.duration}
              </div>
            </div>
          </div>
          <Badge variant="outline" className={levelData.color}>
            Level {lesson.level}
          </Badge>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">{lesson.description}</p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="steps" className="border-b-0">
            <AccordionTrigger className="py-2 text-sm hover:no-underline" data-testid={`accordion-lesson-${lesson.id}`}>
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                View {lesson.steps.length} Steps
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {lesson.steps.map((step) => (
                  <div key={step.order} className="flex gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {step.order}
                    </div>
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {lesson.videoId && (
          <div className="mt-4 aspect-video overflow-hidden rounded-md bg-muted">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${lesson.videoId}`}
              title={lesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="border-0"
            />
          </div>
        )}

        {lesson.practicePreset && (
          <Link
            href={`/generator?style=${lesson.practicePreset.style}&complexity=${lesson.practicePreset.complexity}&rows=${lesson.practicePreset.rows}&cols=${lesson.practicePreset.cols}`}
          >
            <Button variant="outline" className="mt-4 w-full gap-2" data-testid={`button-practice-${lesson.id}`}>
              <PlayCircle className="h-4 w-4" />
              Practice This Pattern
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

export default function Learning() {
  const [activeLevel, setActiveLevel] = useState("1");

  const filteredLessons = lessons.filter(
    (lesson) => lesson.level === parseInt(activeLevel)
  );

  return (
    <div className="relative min-h-screen py-8 md:py-12">
      <KolamPatternBg opacity={0.02} />
      <div className="container relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30">
            Step-by-Step Tutorials
          </Badge>
          <h1 className="font-serif text-3xl font-bold md:text-4xl">
            Learn Kolam Art
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Master the beautiful art of Kolam with our structured lessons. From basic
            dot patterns to intricate festival designs, progress at your own pace.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {levelInfo.map((info) => (
            <Card
              key={info.level}
              className={`cursor-pointer overflow-visible transition-all hover-elevate ${
                activeLevel === String(info.level)
                  ? "ring-2 ring-primary ring-offset-2"
                  : ""
              }`}
              onClick={() => setActiveLevel(String(info.level))}
              data-testid={`card-level-${info.level}`}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${info.color}`}
                >
                  {Array.from({ length: info.level }).map((_, i) => (
                    <info.icon key={i} className="h-4 w-4" />
                  ))}
                </div>
                <div>
                  <h3 className="font-serif font-semibold">{info.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {lessons.filter((l) => l.level === info.level).length} lessons
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeLevel} onValueChange={setActiveLevel}>
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="1" className="gap-2" data-testid="tab-level-1">
              <CheckCircle className="h-4 w-4" />
              Beginner
            </TabsTrigger>
            <TabsTrigger value="2" className="gap-2" data-testid="tab-level-2">
              <Star className="h-4 w-4" />
              Intermediate
            </TabsTrigger>
            <TabsTrigger value="3" className="gap-2" data-testid="tab-level-3">
              <Star className="h-4 w-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeLevel} className="mt-0">
            <div className="mb-6">
              <h2 className="font-serif text-2xl font-bold">
                {levelInfo[parseInt(activeLevel) - 1].title} Level
              </h2>
              <p className="text-muted-foreground">
                {levelInfo[parseInt(activeLevel) - 1].description}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>

            {parseInt(activeLevel) < 3 && (
              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  onClick={() => setActiveLevel(String(parseInt(activeLevel) + 1))}
                  className="gap-2"
                  data-testid="button-next-level"
                >
                  Continue to {levelInfo[parseInt(activeLevel)].title} Level
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
