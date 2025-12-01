import { Calendar, MapPin, BookOpen, Lightbulb, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KolamPatternBg } from "@/components/kolam-pattern-bg";
import type { HistoryPeriod } from "@shared/schema";

import historicalImage from "@assets/generated_images/historical_kolam_tradition.png";
import templeImage from "@assets/generated_images/temple_kolam_heritage.png";
import mandalaImage from "@assets/generated_images/iconic_kolam_mandala_design..png";
import elegantImage from "@assets/generated_images/elegant_intricate_white_kolam_pattern_on_a_rich_maroon_background_with_gold_accents..png";
import minimalistImage from "@assets/generated_images/minimalist_pastel_pink_background_with_subtle_white_geometric_kolam_patterns..png";

const historyPeriods: HistoryPeriod[] = [
  {
    id: "origins",
    title: "Ancient Origins",
    dateRange: "3000 BCE - 500 BCE",
    description:
      "Kolam's roots trace back to the Indus Valley Civilization, where geometric floor decorations were part of daily rituals. Archaeological evidence suggests that similar patterns were used in religious and domestic spaces.",
    image: historicalImage,
  },
  {
    id: "sangam",
    title: "Sangam Period",
    dateRange: "300 BCE - 300 CE",
    description:
      "During the Sangam era, Kolam became integral to Tamil culture. Literary works from this period describe women drawing intricate designs at dawn as part of their daily routine and spiritual practice.",
    image: elegantImage,
  },
  {
    id: "chola",
    title: "Chola Dynasty Era",
    dateRange: "300 CE - 1200 CE",
    description:
      "The Chola period saw Kolam evolve into a sophisticated art form. Temple complexes featured elaborate stone carvings inspired by Kolam patterns, and the art became associated with prosperity and divine blessing.",
    image: templeImage,
  },
  {
    id: "vijayanagara",
    title: "Vijayanagara Empire",
    dateRange: "1336 CE - 1646 CE",
    description:
      "Under Vijayanagara rule, Kolam flourished as an art form. Royal patronage led to the development of new styles and techniques, with competitions held during festivals.",
    image: mandalaImage,
  },
  {
    id: "colonial",
    title: "Colonial Period",
    dateRange: "1600 CE - 1947 CE",
    description:
      "Despite colonial pressures, Kolam remained a resilient symbol of cultural identity. Women continued the tradition, passing knowledge through generations and adapting designs to contemporary contexts.",
    image: minimalistImage,
  },
  {
    id: "modern",
    title: "Modern Revival",
    dateRange: "1947 CE - Present",
    description:
      "Post-independence, Kolam experienced a cultural revival. Today, it's celebrated as an intangible heritage, with artists combining traditional techniques with contemporary themes and digital tools.",
  },
];

const kolamTypes = [
  {
    name: "Sikku Kolam",
    description:
      "Continuous curved lines that weave around dots without lifting the drawing instrument. Also known as 'Kambi Kolam' or line Kolam.",
    characteristics: ["Single continuous line", "Interlocking loops", "No intersections"],
  },
  {
    name: "Pulli Kolam",
    description:
      "Designs created by connecting dots in a grid pattern. The dots serve as anchors for straight or curved lines.",
    characteristics: ["Dot-based foundation", "Geometric patterns", "Symmetrical designs"],
  },
  {
    name: "Neli Kolam",
    description:
      "Floral and nature-inspired designs featuring petals, leaves, and organic curves radiating from a center point.",
    characteristics: ["Floral motifs", "Radial symmetry", "Decorative elements"],
  },
  {
    name: "Padi Kolam",
    description:
      "Step-pattern Kolams representing rice granaries, symbolizing prosperity and abundance in the household.",
    characteristics: ["Staircase patterns", "Prosperity symbol", "Festival special"],
  },
];

const mathematicalConcepts = [
  {
    title: "Symmetry Groups",
    description:
      "Kolam designs often exhibit dihedral symmetry (Dn), combining rotational and reflective properties. Most traditional designs use D4 or D8 symmetry.",
  },
  {
    title: "Graph Theory",
    description:
      "Sikku Kolams can be analyzed as Eulerian graphs, where the line passes through each edge exactly once, forming a closed loop.",
  },
  {
    title: "Fractals",
    description:
      "Some complex Kolams exhibit self-similar patterns at different scales, demonstrating fractal-like properties in their construction.",
  },
  {
    title: "Topology",
    description:
      "The continuous line patterns in Sikku Kolam relate to topological concepts like knot theory and the study of connected spaces.",
  },
];

export default function History() {
  return (
    <div className="relative min-h-screen">
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0">
          <img
            src={historicalImage}
            alt="Historical Kolam tradition"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />
        </div>
        <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 border-gold/30 bg-gold/20 text-white">
              Cultural Heritage
            </Badge>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">
              The Rich History of{" "}
              <span className="text-gold">Kolam Art</span>
            </h1>
            <p className="mt-6 text-lg text-white/90">
              Discover the fascinating journey of Kolam through millennia - from ancient
              Dravidian traditions to modern artistic expression. This sacred art form
              continues to connect generations and communities across South India.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <KolamPatternBg opacity={0.02} />
        <div className="container relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12">
            <Badge variant="outline" className="mb-4 border-primary/30">
              <Calendar className="mr-2 h-3 w-3" />
              Timeline
            </Badge>
            <h2 className="font-serif text-3xl font-bold">
              Evolution Through the Ages
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Trace the development of Kolam from ancient temple rituals to contemporary
              artistic expression across different periods of South Indian history.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 hidden h-full w-1 rounded-full bg-primary/20 md:left-1/2 md:-ml-0.5 md:block" />

            <div className="space-y-12">
              {historyPeriods.map((period, index) => (
                <div
                  key={period.id}
                  className={`relative flex flex-col gap-4 md:flex-row md:gap-8 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                  data-testid={`timeline-period-${period.id}`}
                >
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 hidden h-4 w-4 rounded-full border-4 border-primary bg-background md:left-1/2 md:-ml-2 md:block" style={{ top: "1.5rem" }} />

                  <div className="md:w-1/2">
                    <Card className="overflow-visible hover-elevate">
                      <CardContent className="p-6">
                        <Badge variant="secondary" className="mb-3">
                          {period.dateRange}
                        </Badge>
                        <h3 className="font-serif text-xl font-semibold">
                          {period.title}
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                          {period.description}
                        </p>
                        {period.image && (
                          <img
                            src={period.image}
                            alt={period.title}
                            className="mt-4 rounded-md object-cover"
                          />
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-accent/30 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12">
            <Badge variant="outline" className="mb-4 border-primary/30">
              <MapPin className="mr-2 h-3 w-3" />
              Cultural Significance
            </Badge>
            <h2 className="font-serif text-3xl font-bold">
              Meaning and Symbolism
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Kolam is more than decorative art - it carries deep spiritual, social,
              and environmental significance in South Indian culture.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-visible hover-elevate" data-testid="card-significance-spiritual">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl">🕉️</span>
                </div>
                <h3 className="font-serif text-lg font-semibold">Spiritual Practice</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Drawing Kolam at dawn is a form of meditation, inviting positive energy
                  and divine blessings into the home. The act itself is considered a form
                  of worship.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-visible hover-elevate" data-testid="card-significance-environmental">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl">🌿</span>
                </div>
                <h3 className="font-serif text-lg font-semibold">Environmental Harmony</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Traditional rice flour Kolams feed ants and small creatures, reflecting
                  the principle of coexistence with nature and daily charity to all beings.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-visible hover-elevate" data-testid="card-significance-social">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl">👪</span>
                </div>
                <h3 className="font-serif text-lg font-semibold">Social Bonding</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Kolam creation is traditionally passed from mother to daughter, serving
                  as a vehicle for cultural transmission and strengthening family bonds.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-visible hover-elevate" data-testid="card-significance-identity">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-serif text-lg font-semibold">Home Identity</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A Kolam at the entrance welcomes guests and signifies that the
                  household is awake and ready to receive visitors. An absent Kolam
                  may indicate illness or mourning.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-visible hover-elevate" data-testid="card-significance-festivals">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl">🎉</span>
                </div>
                <h3 className="font-serif text-lg font-semibold">Festival Celebrations</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Special occasions like Pongal, Diwali, and weddings feature elaborate
                  Kolams with vibrant colors, often created collaboratively by communities.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-visible hover-elevate" data-testid="card-significance-prosperity">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-serif text-lg font-semibold">Prosperity Symbol</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  The intricate patterns are believed to trap negative energies outside
                  while inviting Lakshmi, the goddess of wealth and prosperity, into the
                  home.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <KolamPatternBg opacity={0.02} />
        <div className="container relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12">
            <Badge variant="outline" className="mb-4 border-primary/30">
              <BookOpen className="mr-2 h-3 w-3" />
              Types
            </Badge>
            <h2 className="font-serif text-3xl font-bold">
              Traditional Kolam Styles
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Each Kolam type has unique characteristics, techniques, and cultural
              associations. Understanding these styles is essential for mastering the art.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {kolamTypes.map((type, index) => (
              <Card key={type.name} className="overflow-visible hover-elevate" data-testid={`card-type-${index}`}>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-semibold">{type.name}</h3>
                  <p className="mt-2 text-muted-foreground">{type.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {type.characteristics.map((char) => (
                      <Badge key={char} variant="secondary">
                        {char}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent/30 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12">
            <Badge variant="outline" className="mb-4 border-primary/30">
              <Lightbulb className="mr-2 h-3 w-3" />
              Mathematics
            </Badge>
            <h2 className="font-serif text-3xl font-bold">
              Mathematical Foundations
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Beyond its artistic beauty, Kolam embodies sophisticated mathematical
              principles that have attracted the attention of researchers worldwide.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {mathematicalConcepts.map((concept) => (
              <Card key={concept.title} className="overflow-visible hover-elevate" data-testid={`card-math-${concept.title.toLowerCase().replace(" ", "-")}`}>
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gold/20 text-lg font-bold text-gold-dark">
                    Σ
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold">{concept.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {concept.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
