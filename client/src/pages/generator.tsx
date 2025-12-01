import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Download,
  RefreshCw,
  Save,
  Loader2,
  Palette,
  Maximize2,
  Grid3X3,
  Shuffle,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { KolamPatternBg } from "@/components/kolam-pattern-bg";
import { useToast } from "@/hooks/use-toast";
import type { GeneratorParams, GeneratedKolam } from "@shared/schema";

const styleOptions = [
  { value: "sikku", label: "Sikku (Curved Lines)" },
  { value: "neli", label: "Neli (Floral)" },
  { value: "pulli", label: "Pulli (Dot-based)" },
  { value: "geometric", label: "Geometric" },
  { value: "freehand", label: "Freehand" },
];

const symmetryOptions = [
  { value: "vertical", label: "Vertical" },
  { value: "horizontal", label: "Horizontal" },
  { value: "radial", label: "Radial" },
];

const colorPresets = [
  { name: "Traditional", colors: ["#8B1E3F", "#D8B75A"] },
  { name: "Earth Tones", colors: ["#654321", "#D4A574"] },
  { name: "Festival", colors: ["#FF6B6B", "#4ECDC4", "#FFE66D"] },
  { name: "Monochrome", colors: ["#333333"] },
  { name: "Sunset", colors: ["#FF6B35", "#F7931E", "#FFC107"] },
];

function generateKolamSVG(params: GeneratorParams): string {
  const {
    style,
    complexity,
    symmetryType,
    symmetryAxes,
    rows,
    cols,
    dotSpacing,
    strokeWidth,
    colors,
  } = params;

  const width = cols * dotSpacing + dotSpacing;
  const height = rows * dotSpacing + dotSpacing;
  const centerX = width / 2;
  const centerY = height / 2;

  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">`;
  svgContent += `<rect width="100%" height="100%" fill="transparent"/>`;

  const dots: { x: number; y: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = (c + 0.5) * dotSpacing + dotSpacing / 2;
      const y = (r + 0.5) * dotSpacing + dotSpacing / 2;
      dots.push({ x, y });
    }
  }

  dots.forEach((dot) => {
    svgContent += `<circle cx="${dot.x}" cy="${dot.y}" r="${strokeWidth}" fill="${colors[0] || '#8B1E3F'}"/>`;
  });

  const pathColor = colors[0] || "#8B1E3F";
  const secondaryColor = colors[1] || colors[0] || "#D8B75A";

  if (style === "sikku") {
    for (let i = 0; i < dots.length - 1; i++) {
      if ((i + 1) % cols !== 0 && i + cols < dots.length) {
        const current = dots[i];
        const right = dots[i + 1];
        const below = dots[i + cols];
        const controlX = (current.x + right.x + below.x) / 3 + (Math.random() - 0.5) * dotSpacing * 0.3 * complexity;
        const controlY = (current.y + right.y + below.y) / 3 + (Math.random() - 0.5) * dotSpacing * 0.3 * complexity;
        svgContent += `<path d="M ${current.x} ${current.y} Q ${controlX} ${controlY} ${right.x} ${right.y}" 
          fill="none" stroke="${pathColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
        svgContent += `<path d="M ${current.x} ${current.y} Q ${controlX} ${controlY} ${below.x} ${below.y}" 
          fill="none" stroke="${secondaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
      }
    }
  } else if (style === "neli") {
    const petalSize = dotSpacing * 0.4 * (1 + complexity * 0.2);
    dots.forEach((dot, index) => {
      if (index % (Math.max(1, 4 - complexity)) === 0) {
        const petals = 4 + Math.floor(complexity);
        for (let p = 0; p < petals; p++) {
          const angle = (p / petals) * Math.PI * 2;
          const endX = dot.x + Math.cos(angle) * petalSize;
          const endY = dot.y + Math.sin(angle) * petalSize;
          const ctrlX = dot.x + Math.cos(angle + 0.3) * petalSize * 1.5;
          const ctrlY = dot.y + Math.sin(angle + 0.3) * petalSize * 1.5;
          svgContent += `<path d="M ${dot.x} ${dot.y} Q ${ctrlX} ${ctrlY} ${endX} ${endY}" 
            fill="none" stroke="${p % 2 === 0 ? pathColor : secondaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
        }
      }
    });
  } else if (style === "pulli") {
    for (let i = 0; i < dots.length; i++) {
      const current = dots[i];
      const rightOffset = i + 1;
      const belowOffset = i + cols;
      const diagOffset = i + cols + 1;

      if (rightOffset < dots.length && (i + 1) % cols !== 0) {
        svgContent += `<line x1="${current.x}" y1="${current.y}" x2="${dots[rightOffset].x}" y2="${dots[rightOffset].y}" 
          stroke="${pathColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
      }
      if (belowOffset < dots.length) {
        svgContent += `<line x1="${current.x}" y1="${current.y}" x2="${dots[belowOffset].x}" y2="${dots[belowOffset].y}" 
          stroke="${pathColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
      }
      if (complexity >= 3 && diagOffset < dots.length && (i + 1) % cols !== 0) {
        svgContent += `<line x1="${current.x}" y1="${current.y}" x2="${dots[diagOffset].x}" y2="${dots[diagOffset].y}" 
          stroke="${secondaryColor}" stroke-width="${strokeWidth * 0.7}" stroke-linecap="round" stroke-dasharray="${strokeWidth * 2}"/>`;
      }
    }
  } else if (style === "geometric") {
    const radius = Math.min(centerX, centerY) * 0.8;
    const sides = symmetryAxes || 6;
    for (let layer = 1; layer <= complexity; layer++) {
      const layerRadius = radius * (layer / complexity);
      let polygonPoints = "";
      for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * layerRadius;
        const y = centerY + Math.sin(angle) * layerRadius;
        polygonPoints += `${x},${y} `;
      }
      svgContent += `<polygon points="${polygonPoints.trim()}" fill="none" stroke="${layer % 2 === 0 ? pathColor : secondaryColor}" 
        stroke-width="${strokeWidth}" stroke-linejoin="round"/>`;
    }
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
      const endX = centerX + Math.cos(angle) * radius;
      const endY = centerY + Math.sin(angle) * radius;
      svgContent += `<line x1="${centerX}" y1="${centerY}" x2="${endX}" y2="${endY}" 
        stroke="${pathColor}" stroke-width="${strokeWidth * 0.5}" stroke-linecap="round"/>`;
    }
  } else if (style === "freehand") {
    const numCurves = 5 + complexity * 3;
    for (let i = 0; i < numCurves; i++) {
      const startDot = dots[Math.floor(Math.random() * dots.length)];
      const endDot = dots[Math.floor(Math.random() * dots.length)];
      const ctrl1X = (startDot.x + endDot.x) / 2 + (Math.random() - 0.5) * dotSpacing * 2;
      const ctrl1Y = (startDot.y + endDot.y) / 2 + (Math.random() - 0.5) * dotSpacing * 2;
      const ctrl2X = (startDot.x + endDot.x) / 2 + (Math.random() - 0.5) * dotSpacing * 2;
      const ctrl2Y = (startDot.y + endDot.y) / 2 + (Math.random() - 0.5) * dotSpacing * 2;
      svgContent += `<path d="M ${startDot.x} ${startDot.y} C ${ctrl1X} ${ctrl1Y} ${ctrl2X} ${ctrl2Y} ${endDot.x} ${endDot.y}" 
        fill="none" stroke="${i % 2 === 0 ? pathColor : secondaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
    }
  }

  if (symmetryType === "radial" && symmetryAxes > 1) {
    svgContent += `<circle cx="${centerX}" cy="${centerY}" r="${strokeWidth * 2}" fill="${pathColor}"/>`;
  }

  svgContent += "</svg>";
  return svgContent;
}

export default function Generator() {
  const { toast } = useToast();
  const svgContainerRef = useRef<HTMLDivElement>(null);

  const [params, setParams] = useState<GeneratorParams>({
    style: "sikku",
    complexity: 3,
    symmetryType: "vertical",
    symmetryAxes: 4,
    rows: 5,
    cols: 5,
    dotSpacing: 50,
    strokeWidth: 2,
    colors: ["#8B1E3F", "#D8B75A"],
  });

  const [svgContent, setSvgContent] = useState<string>("");
  const [selectedColorPreset, setSelectedColorPreset] = useState<string>("Traditional");
  const [savedPatterns, setSavedPatterns] = useState<GeneratedKolam[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const svg = generateKolamSVG(params);
    setSvgContent(svg);
  }, [params]);

  useEffect(() => {
    // Load saved patterns
    fetch("/api/generated")
      .then(res => res.json())
      .then(data => setSavedPatterns(data))
      .catch(console.error);
  }, []);

  const handleStyleChange = (value: string) => {
    setParams((prev) => ({
      ...prev,
      style: value as GeneratorParams["style"],
    }));
  };

  const handleSymmetryChange = (value: string) => {
    setParams((prev) => ({
      ...prev,
      symmetryType: value as GeneratorParams["symmetryType"],
    }));
  };

  const handleColorPresetChange = (name: string) => {
    const preset = colorPresets.find((p) => p.name === name);
    if (preset) {
      setSelectedColorPreset(name);
      setParams((prev) => ({ ...prev, colors: preset.colors }));
    }
  };

  const handleRandomize = () => {
    const randomStyle = styleOptions[Math.floor(Math.random() * styleOptions.length)].value as GeneratorParams["style"];
    const randomSymmetry = symmetryOptions[Math.floor(Math.random() * symmetryOptions.length)].value as GeneratorParams["symmetryType"];
    const randomPreset = colorPresets[Math.floor(Math.random() * colorPresets.length)];
    
    setParams({
      style: randomStyle,
      complexity: Math.floor(Math.random() * 5) + 1,
      symmetryType: randomSymmetry,
      symmetryAxes: Math.floor(Math.random() * 11) + 2,
      rows: Math.floor(Math.random() * 7) + 3,
      cols: Math.floor(Math.random() * 7) + 3,
      dotSpacing: Math.floor(Math.random() * 41) + 30,
      strokeWidth: Math.floor(Math.random() * 4) + 1,
      colors: randomPreset.colors,
    });
    setSelectedColorPreset(randomPreset.name);
    toast({
      title: "Pattern randomized",
      description: "A completely new design has been generated!",
    });
  };

  const handleRegenerate = () => {
    const svg = generateKolamSVG(params);
    setSvgContent(svg);
    toast({
      title: "Design regenerated",
      description: "A new variation has been created with your settings.",
    });
  };

  const handleSavePattern = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...params, svgContent }),
      });
      
      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Pattern saved",
          description: "Your design has been saved to your library!",
        });
        // Refresh saved patterns
        const updated = await fetch("/api/generated");
        setSavedPatterns(await updated.json());
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save pattern",
        variant: "destructive",
      });
    }
    setIsSaving(false);
  };

  const handleLoadPattern = (pattern: GeneratedKolam) => {
    setParams({
      style: pattern.style as GeneratorParams["style"],
      complexity: pattern.complexity,
      symmetryType: pattern.symmetryType as GeneratorParams["symmetryType"],
      symmetryAxes: pattern.symmetryAxes || 4,
      rows: pattern.rows,
      cols: pattern.cols,
      dotSpacing: pattern.dotSpacing || 50,
      strokeWidth: pattern.strokeWidth || 2,
      colors: pattern.colors,
    });
    toast({
      title: "Pattern loaded",
      description: "Previous design has been restored!",
    });
  };

  const handleDownloadSVG = () => {
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kolam-${params.style}-${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "SVG downloaded",
      description: "Your Kolam design has been saved as an SVG file.",
    });
  };

  const handleDownloadPNG = () => {
    const svgElement = svgContainerRef.current?.querySelector("svg");
    if (!svgElement) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const pngUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = `kolam-${params.style}-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
      toast({
        title: "PNG downloaded",
        description: "Your Kolam design has been saved as a PNG file.",
      });
    };

    img.src = url;
  };

  return (
    <div className="relative min-h-screen py-8 md:py-12">
      <KolamPatternBg opacity={0.02} />
      <div className="container relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30">
            Interactive Designer
          </Badge>
          <h1 className="font-serif text-3xl font-bold md:text-4xl">
            Kolam Pattern Generator
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Create beautiful Kolam designs with customizable styles, complexity,
            and symmetry. Export your creations as SVG or PNG.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <Card data-testid="card-controls">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <Grid3X3 className="h-5 w-5 text-primary" />
                  Design Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Style</Label>
                  <Select value={params.style} onValueChange={handleStyleChange}>
                    <SelectTrigger data-testid="select-style">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      {styleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Complexity: {params.complexity}</Label>
                  <Slider
                    value={[params.complexity]}
                    onValueChange={([value]) =>
                      setParams((prev) => ({ ...prev, complexity: value }))
                    }
                    min={1}
                    max={5}
                    step={1}
                    data-testid="slider-complexity"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Symmetry Type</Label>
                  <RadioGroup
                    value={params.symmetryType}
                    onValueChange={handleSymmetryChange}
                    className="flex gap-4"
                  >
                    {symmetryOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                          data-testid={`radio-symmetry-${option.value}`}
                        />
                        <Label htmlFor={option.value} className="cursor-pointer text-sm">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {params.symmetryType === "radial" && (
                  <div className="space-y-2">
                    <Label>Symmetry Axes: {params.symmetryAxes}</Label>
                    <Slider
                      value={[params.symmetryAxes]}
                      onValueChange={([value]) =>
                        setParams((prev) => ({ ...prev, symmetryAxes: value }))
                      }
                      min={2}
                      max={12}
                      step={1}
                      data-testid="slider-axes"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Rows: {params.rows}</Label>
                    <Slider
                      value={[params.rows]}
                      onValueChange={([value]) =>
                        setParams((prev) => ({ ...prev, rows: value }))
                      }
                      min={3}
                      max={9}
                      step={1}
                      data-testid="slider-rows"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Columns: {params.cols}</Label>
                    <Slider
                      value={[params.cols]}
                      onValueChange={([value]) =>
                        setParams((prev) => ({ ...prev, cols: value }))
                      }
                      min={3}
                      max={9}
                      step={1}
                      data-testid="slider-cols"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Dot Spacing: {params.dotSpacing}px</Label>
                  <Slider
                    value={[params.dotSpacing]}
                    onValueChange={([value]) =>
                      setParams((prev) => ({ ...prev, dotSpacing: value }))
                    }
                    min={30}
                    max={70}
                    step={5}
                    data-testid="slider-spacing"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Stroke Width: {params.strokeWidth}px</Label>
                  <Slider
                    value={[params.strokeWidth]}
                    onValueChange={([value]) =>
                      setParams((prev) => ({ ...prev, strokeWidth: value }))
                    }
                    min={1}
                    max={5}
                    step={0.5}
                    data-testid="slider-stroke"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Color Palette
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {colorPresets.map((preset) => (
                      <Button
                        key={preset.name}
                        variant={selectedColorPreset === preset.name ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleColorPresetChange(preset.name)}
                        className="gap-1"
                        data-testid={`button-color-${preset.name.toLowerCase().replace(" ", "-")}`}
                      >
                        <div className="flex gap-0.5">
                          {preset.colors.map((color, i) => (
                            <div
                              key={i}
                              className="h-3 w-3 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-actions">
              <CardContent className="flex flex-col gap-3 pt-6">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleRandomize}
                    variant="default"
                    className="gap-2"
                    data-testid="button-randomize"
                  >
                    <Shuffle className="h-4 w-4" />
                    Randomize
                  </Button>
                  <Button
                    onClick={handleRegenerate}
                    variant="outline"
                    className="gap-2"
                    data-testid="button-regenerate"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Regenerate
                  </Button>
                </div>
                <Button
                  onClick={handleSavePattern}
                  disabled={isSaving}
                  variant="secondary"
                  className="w-full gap-2"
                  data-testid="button-save"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Save to Library"}
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleDownloadSVG}
                    className="gap-2"
                    data-testid="button-download-svg"
                  >
                    <Download className="h-4 w-4" />
                    SVG
                  </Button>
                  <Button
                    onClick={handleDownloadPNG}
                    variant="outline"
                    className="gap-2"
                    data-testid="button-download-png"
                  >
                    <Download className="h-4 w-4" />
                    PNG
                  </Button>
                </div>
              </CardContent>
            </Card>

            {savedPatterns.length > 0 && (
              <Card data-testid="card-saved-patterns">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-serif text-lg">
                    <FolderOpen className="h-5 w-5 text-primary" />
                    Saved Patterns ({savedPatterns.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 max-h-64 overflow-y-auto">
                  {savedPatterns.slice(0, 10).map((pattern, idx) => (
                    <Button
                      key={pattern.id}
                      onClick={() => handleLoadPattern(pattern)}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto py-2"
                      data-testid={`button-load-pattern-${idx}`}
                    >
                      <div className="flex-1">
                        <div className="font-medium capitalize">{pattern.style} Kolam</div>
                        <div className="text-xs text-muted-foreground">
                          {pattern.rows}x{pattern.cols} • Level {pattern.complexity}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {pattern.colors.slice(0, 3).map((color, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-2">
            <Card className="sticky top-24" data-testid="card-preview">
              <CardHeader>
                <CardTitle className="flex items-center justify-between font-serif text-lg">
                  <span className="flex items-center gap-2">
                    <Maximize2 className="h-5 w-5 text-primary" />
                    Preview
                  </span>
                  <Badge variant="secondary" className="font-normal">
                    {params.style.charAt(0).toUpperCase() + params.style.slice(1)} • Level {params.complexity}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  ref={svgContainerRef}
                  className="flex min-h-[400px] items-center justify-center rounded-md bg-white p-4 dark:bg-gray-900"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                  }}
                >
                  <div
                    className="max-w-full"
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
