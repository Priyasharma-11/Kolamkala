import { useState } from "react";
import { Search, Filter, Grid3X3, List, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KolamPatternBg } from "@/components/kolam-pattern-bg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const kolamDataset = [
  { id: 1, name: "Traditional Sikku", style: "sikku", complexity: "Medium", region: "Tamil Nadu", festive: false },
  { id: 2, name: "Pongal Festival Kolam", style: "neli", complexity: "High", region: "Tamil Nadu", festive: true },
  { id: 3, name: "Simple Pulli Grid", style: "pulli", complexity: "Low", region: "Kerala", festive: false },
  { id: 4, name: "Diwali Special", style: "geometric", complexity: "High", region: "Karnataka", festive: true },
  { id: 5, name: "Morning Daily Kolam", style: "sikku", complexity: "Low", region: "Tamil Nadu", festive: false },
  { id: 6, name: "Temple Entrance Design", style: "geometric", complexity: "High", region: "Andhra Pradesh", festive: false },
  { id: 7, name: "Flower Kolam", style: "neli", complexity: "Medium", region: "Tamil Nadu", festive: false },
  { id: 8, name: "Wedding Ceremony Kolam", style: "freehand", complexity: "High", region: "Tamil Nadu", festive: true },
  { id: 9, name: "Basic Dot Pattern", style: "pulli", complexity: "Low", region: "Kerala", festive: false },
  { id: 10, name: "Radial Symmetry Design", style: "geometric", complexity: "Medium", region: "Karnataka", festive: false },
  { id: 11, name: "Interlocking Loops", style: "sikku", complexity: "High", region: "Tamil Nadu", festive: false },
  { id: 12, name: "Peacock Kolam", style: "neli", complexity: "High", region: "Tamil Nadu", festive: true },
  { id: 13, name: "Square Grid", style: "pulli", complexity: "Low", region: "Kerala", festive: false },
  { id: 14, name: "Star Pattern", style: "geometric", complexity: "Medium", region: "Karnataka", festive: false },
  { id: 15, name: "Festival Rangoli", style: "freehand", complexity: "High", region: "Andhra Pradesh", festive: true },
  { id: 16, name: "Daily Simple Kolam", style: "sikku", complexity: "Low", region: "Tamil Nadu", festive: false },
  { id: 17, name: "Lotus Flower", style: "neli", complexity: "Medium", region: "Tamil Nadu", festive: false },
  { id: 18, name: "Hexagonal Pattern", style: "geometric", complexity: "High", region: "Karnataka", festive: false },
  { id: 19, name: "Traditional Pulli", style: "pulli", complexity: "Medium", region: "Kerala", festive: false },
  { id: 20, name: "Harvest Festival Kolam", style: "freehand", complexity: "High", region: "Tamil Nadu", festive: true },
  { id: 21, name: "Continuous Line Art", style: "sikku", complexity: "Medium", region: "Tamil Nadu", festive: false },
  { id: 22, name: "Multi-Petal Flower", style: "neli", complexity: "Medium", region: "Tamil Nadu", festive: false },
  { id: 23, name: "Diamond Grid", style: "pulli", complexity: "Low", region: "Kerala", festive: false },
  { id: 24, name: "Mandala Kolam", style: "geometric", complexity: "High", region: "Karnataka", festive: true },
  { id: 25, name: "New Year Special", style: "freehand", complexity: "High", region: "Andhra Pradesh", festive: true },
  { id: 26, name: "Small Entrance Kolam", style: "sikku", complexity: "Low", region: "Tamil Nadu", festive: false },
  { id: 27, name: "Rose Pattern", style: "neli", complexity: "Medium", region: "Tamil Nadu", festive: false },
  { id: 28, name: "Circular Geometry", style: "geometric", complexity: "Medium", region: "Karnataka", festive: false },
  { id: 29, name: "Traditional Dot Work", style: "pulli", complexity: "Medium", region: "Kerala", festive: false },
  { id: 30, name: "Temple Festival Kolam", style: "geometric", complexity: "High", region: "Tamil Nadu", festive: true },
];

const styleFilters = [
  { value: "all", label: "All Styles" },
  { value: "sikku", label: "Sikku (Curved)" },
  { value: "neli", label: "Neli (Floral)" },
  { value: "pulli", label: "Pulli (Dot-based)" },
  { value: "geometric", label: "Geometric" },
  { value: "freehand", label: "Freehand" },
];

const complexityFilters = [
  { value: "all", label: "All Complexity" },
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

const regionFilters = [
  { value: "all", label: "All Regions" },
  { value: "Tamil Nadu", label: "Tamil Nadu" },
  { value: "Kerala", label: "Kerala" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
];

export default function Gallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [styleFilter, setStyleFilter] = useState("all");
  const [complexityFilter, setComplexityFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [festiveOnly, setFestiveOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedKolam, setSelectedKolam] = useState<typeof kolamDataset[0] | null>(null);

  const filteredData = kolamDataset.filter((kolam) => {
    const matchesSearch = kolam.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStyle = styleFilter === "all" || kolam.style === styleFilter;
    const matchesComplexity = complexityFilter === "all" || kolam.complexity === complexityFilter;
    const matchesRegion = regionFilter === "all" || kolam.region === regionFilter;
    const matchesFestive = !festiveOnly || kolam.festive;

    return matchesSearch && matchesStyle && matchesComplexity && matchesRegion && matchesFestive;
  });

  const generatePlaceholderSVG = (id: number, style: string) => {
    const colors = [
      ["#8B1E3F", "#D8B75A"],
      ["#654321", "#D4A574"],
      ["#FF6B6B", "#4ECDC4"],
      ["#333333", "#666666"],
      ["#FF6B35", "#F7931E"],
    ];
    const colorSet = colors[id % colors.length];
    const size = 200;
    const center = size / 2;

    let content = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">`;
    content += `<rect width="100%" height="100%" fill="#FEFEFE"/>`;

    if (style === "sikku") {
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const x1 = center + Math.cos(angle) * 60;
        const y1 = center + Math.sin(angle) * 60;
        const x2 = center + Math.cos(angle + Math.PI / 2) * 60;
        const y2 = center + Math.sin(angle + Math.PI / 2) * 60;
        content += `<path d="M ${x1} ${y1} Q ${center} ${center} ${x2} ${y2}" fill="none" stroke="${colorSet[0]}" stroke-width="3"/>`;
      }
    } else if (style === "neli") {
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const x = center + Math.cos(angle) * 50;
        const y = center + Math.sin(angle) * 50;
        content += `<circle cx="${x}" cy="${y}" r="15" fill="none" stroke="${colorSet[i % 2]}" stroke-width="2"/>`;
      }
      content += `<circle cx="${center}" cy="${center}" r="20" fill="none" stroke="${colorSet[0]}" stroke-width="3"/>`;
    } else if (style === "pulli") {
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          const x = 40 + c * 30;
          const y = 40 + r * 30;
          content += `<circle cx="${x}" cy="${y}" r="3" fill="${colorSet[0]}"/>`;
          if (c < 4) {
            content += `<line x1="${x}" y1="${y}" x2="${x + 30}" y2="${y}" stroke="${colorSet[1]}" stroke-width="2"/>`;
          }
          if (r < 4) {
            content += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 30}" stroke="${colorSet[1]}" stroke-width="2"/>`;
          }
        }
      }
    } else if (style === "geometric") {
      const sides = 6;
      for (let layer = 1; layer <= 3; layer++) {
        const radius = 30 * layer;
        let points = "";
        for (let i = 0; i < sides; i++) {
          const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius;
          points += `${x},${y} `;
        }
        content += `<polygon points="${points.trim()}" fill="none" stroke="${colorSet[layer % 2]}" stroke-width="2"/>`;
      }
    } else {
      for (let i = 0; i < 10; i++) {
        const x1 = Math.random() * size;
        const y1 = Math.random() * size;
        const x2 = Math.random() * size;
        const y2 = Math.random() * size;
        const ctrl = Math.random() * size;
        content += `<path d="M ${x1} ${y1} Q ${ctrl} ${ctrl} ${x2} ${y2}" fill="none" stroke="${colorSet[i % 2]}" stroke-width="2" opacity="0.5"/>`;
      }
    }

    content += `</svg>`;
    return `data:image/svg+xml;base64,${btoa(content)}`;
  };

  return (
    <div className="relative min-h-screen py-8 md:py-12">
      <KolamPatternBg opacity={0.02} />
      <div className="container relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30">
            Kolam Pattern Library
          </Badge>
          <h1 className="font-serif text-3xl font-bold md:text-4xl">
            Kolam Gallery
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Explore our collection of {kolamDataset.length} traditional and contemporary
            Kolam patterns from across South India. Filter by style, complexity, and region.
          </p>
        </div>

        <Card className="mb-8" data-testid="card-filters">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search patterns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                    data-testid="input-search"
                  />
                </div>
              </div>

              <Select value={styleFilter} onValueChange={setStyleFilter}>
                <SelectTrigger data-testid="select-style-filter">
                  <SelectValue placeholder="Style" />
                </SelectTrigger>
                <SelectContent>
                  {styleFilters.map((filter) => (
                    <SelectItem key={filter.value} value={filter.value}>
                      {filter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={complexityFilter} onValueChange={setComplexityFilter}>
                <SelectTrigger data-testid="select-complexity-filter">
                  <SelectValue placeholder="Complexity" />
                </SelectTrigger>
                <SelectContent>
                  {complexityFilters.map((filter) => (
                    <SelectItem key={filter.value} value={filter.value}>
                      {filter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger data-testid="select-region-filter">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  {regionFilters.map((filter) => (
                    <SelectItem key={filter.value} value={filter.value}>
                      {filter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant={festiveOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFestiveOnly(!festiveOnly)}
                  className="gap-2"
                  data-testid="button-festive-filter"
                >
                  <Filter className="h-4 w-4" />
                  Festival Only
                </Button>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredData.length} of {kolamDataset.length} patterns
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  data-testid="button-view-grid"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  data-testid="button-view-list"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredData.map((kolam) => (
              <Card
                key={kolam.id}
                className="group overflow-hidden hover-elevate cursor-pointer"
                onClick={() => setSelectedKolam(kolam)}
                data-testid={`card-kolam-${kolam.id}`}
              >
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={generatePlaceholderSVG(kolam.id, kolam.style)}
                    alt={kolam.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-serif font-semibold">{kolam.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="capitalize text-xs">
                      {kolam.style}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {kolam.complexity}
                    </Badge>
                    {kolam.festive && (
                      <Badge className="text-xs">Festival</Badge>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{kolam.region}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredData.map((kolam) => (
              <Card
                key={kolam.id}
                className="overflow-hidden hover-elevate cursor-pointer"
                onClick={() => setSelectedKolam(kolam)}
                data-testid={`card-kolam-list-${kolam.id}`}
              >
                <CardContent className="flex gap-4 p-4">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded bg-gray-50">
                    <img
                      src={generatePlaceholderSVG(kolam.id, kolam.style)}
                      alt={kolam.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-semibold">{kolam.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{kolam.region}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="secondary" className="capitalize">
                        {kolam.style}
                      </Badge>
                      <Badge variant="outline">{kolam.complexity}</Badge>
                      {kolam.festive && <Badge>Festival</Badge>}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredData.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No patterns found matching your filters. Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>

      <Dialog open={!!selectedKolam} onOpenChange={() => setSelectedKolam(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {selectedKolam?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedKolam && (
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-md bg-gray-50">
                <img
                  src={generatePlaceholderSVG(selectedKolam.id, selectedKolam.style)}
                  alt={selectedKolam.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Style</p>
                  <p className="mt-1 capitalize">{selectedKolam.style}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Complexity</p>
                  <p className="mt-1">{selectedKolam.complexity}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Region</p>
                  <p className="mt-1">{selectedKolam.region}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <p className="mt-1">{selectedKolam.festive ? "Festival" : "Daily"}</p>
                </div>
              </div>
              <Button className="w-full gap-2" data-testid="button-download-kolam">
                <Download className="h-4 w-4" />
                Download Pattern
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
