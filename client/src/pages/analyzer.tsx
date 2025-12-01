import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import {
  Upload,
  Image as ImageIcon,
  Loader2,
  Download,
  Eye,
  Layers,
  Grid3X3,
  Palette,
  Activity,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { KolamPatternBg } from "@/components/kolam-pattern-bg";
import { apiRequest } from "@/lib/queryClient";
import type { AnalysisResponse } from "@shared/schema";

export default function Analyzer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);

  const analyzeMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Analysis failed");
      }
      return response.json() as Promise<AnalysisResponse>;
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setAnalysisResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const handleAnalyze = () => {
    if (selectedFile) {
      analyzeMutation.mutate(selectedFile);
    }
  };

  const handleDownloadReport = () => {
    if (analysisResult) {
      const report = JSON.stringify(analysisResult, null, 2);
      const blob = new Blob([report], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "kolam-analysis-report.json";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="relative min-h-screen py-8 md:py-12">
      <KolamPatternBg opacity={0.02} />
      <div className="container relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30">
            AI-Powered Analysis
          </Badge>
          <h1 className="font-serif text-3xl font-bold md:text-4xl">
            Kolam Pattern Analyzer
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Upload a Kolam image and our AI will analyze symmetry, detect patterns,
            extract colors, and provide detailed insights about your design.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <Card data-testid="card-upload">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  {...getRootProps()}
                  className={`cursor-pointer rounded-md border-2 border-dashed p-8 text-center transition-colors ${
                    isDragActive
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/30 hover:border-primary/50"
                  }`}
                  data-testid="dropzone-upload"
                >
                  <input {...getInputProps()} data-testid="input-file" />
                  {selectedImage ? (
                    <div className="space-y-4">
                      <img
                        src={selectedImage}
                        alt="Selected Kolam"
                        className="mx-auto max-h-48 rounded-md object-contain"
                      />
                      <p className="text-sm text-muted-foreground">
                        Click or drag to replace
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {isDragActive
                            ? "Drop the image here"
                            : "Drag and drop or click to upload"}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          JPG or PNG, max 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {selectedImage && (
                  <Button
                    className="mt-4 w-full gap-2"
                    onClick={handleAnalyze}
                    disabled={analyzeMutation.isPending}
                    data-testid="button-analyze"
                  >
                    {analyzeMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4" />
                        Analyze Pattern
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>

            {analysisResult && (
              <Card data-testid="card-actions">
                <CardContent className="flex flex-col gap-3 pt-6">
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={handleDownloadReport}
                    data-testid="button-download-report"
                  >
                    <Download className="h-4 w-4" />
                    Download Report (JSON)
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-3">
            {analyzeMutation.isPending && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="mt-4 font-medium">Analyzing your Kolam...</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This may take a few moments
                  </p>
                  <Progress className="mt-6 w-48" value={66} />
                </CardContent>
              </Card>
            )}

            {analysisResult && !analyzeMutation.isPending && (
              <Card data-testid="card-results">
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Analysis Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="symmetry">
                    <TabsList className="mb-4 w-full justify-start">
                      <TabsTrigger value="symmetry" data-testid="tab-symmetry">
                        <Layers className="mr-2 h-4 w-4" />
                        Symmetry
                      </TabsTrigger>
                      <TabsTrigger value="dots" data-testid="tab-dots">
                        <Grid3X3 className="mr-2 h-4 w-4" />
                        Dots
                      </TabsTrigger>
                      <TabsTrigger value="pattern" data-testid="tab-pattern">
                        <Eye className="mr-2 h-4 w-4" />
                        Pattern
                      </TabsTrigger>
                      <TabsTrigger value="colors" data-testid="tab-colors">
                        <Palette className="mr-2 h-4 w-4" />
                        Colors
                      </TabsTrigger>
                      <TabsTrigger value="metrics" data-testid="tab-metrics">
                        <Activity className="mr-2 h-4 w-4" />
                        Metrics
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="symmetry" className="space-y-4">
                      <h3 className="font-medium">Detected Symmetry</h3>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.symmetry.length > 0 ? (
                          analysisResult.symmetry.map((sym) => (
                            <Badge key={sym} variant="secondary" className="gap-1">
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                              {sym}
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="outline" className="gap-1">
                            <XCircle className="h-3 w-3 text-muted-foreground" />
                            No symmetry detected
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Symmetry analysis checks for vertical, horizontal, and rotational
                        patterns in your Kolam design.
                      </p>
                    </TabsContent>

                    <TabsContent value="dots" className="space-y-4">
                      <h3 className="font-medium">Dot Matrix Detection</h3>
                      {analysisResult.dotMatrix ? (
                        <div className="grid grid-cols-2 gap-4">
                          <Card>
                            <CardContent className="p-4 text-center">
                              <p className="text-3xl font-bold text-primary">
                                {analysisResult.dotMatrix.rows}
                              </p>
                              <p className="text-sm text-muted-foreground">Rows</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 text-center">
                              <p className="text-3xl font-bold text-primary">
                                {analysisResult.dotMatrix.cols}
                              </p>
                              <p className="text-sm text-muted-foreground">Columns</p>
                            </CardContent>
                          </Card>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">
                          No dot grid pattern detected. This may be a freehand design.
                        </p>
                      )}
                    </TabsContent>

                    <TabsContent value="pattern" className="space-y-4">
                      <h3 className="font-medium">Pattern Classification</h3>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-2xl font-bold capitalize text-primary">
                                {analysisResult.pattern.label}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Detected Pattern Type
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">
                                {Math.round(analysisResult.pattern.confidence * 100)}%
                              </p>
                              <p className="text-sm text-muted-foreground">Confidence</p>
                            </div>
                          </div>
                          <Progress
                            className="mt-4"
                            value={analysisResult.pattern.confidence * 100}
                          />
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="colors" className="space-y-4">
                      <h3 className="font-medium">Color Palette</h3>
                      <div className="flex flex-wrap gap-3">
                        {analysisResult.colors.map((color, index) => (
                          <div key={index} className="flex flex-col items-center gap-2">
                            <div
                              className="h-12 w-12 rounded-md border shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                            <code className="text-xs text-muted-foreground">{color}</code>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Primary colors extracted from your Kolam design.
                      </p>
                    </TabsContent>

                    <TabsContent value="metrics" className="space-y-4">
                      <h3 className="font-medium">Design Metrics</h3>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <Card>
                          <CardContent className="p-4 text-center">
                            <p className="text-3xl font-bold text-primary">
                              {analysisResult.complexity}%
                            </p>
                            <p className="text-sm text-muted-foreground">Complexity</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <p className="text-xl font-bold capitalize text-primary">
                              {analysisResult.lineThickness}
                            </p>
                            <p className="text-sm text-muted-foreground">Line Thickness</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <p className="text-xl font-bold capitalize text-primary">
                              {analysisResult.style}
                            </p>
                            <p className="text-sm text-muted-foreground">Style</p>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {!analysisResult && !analyzeMutation.isPending && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <Eye className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">
                    Upload an Image to Analyze
                  </h3>
                  <p className="mt-2 max-w-md text-muted-foreground">
                    Our AI will detect symmetry patterns, classify the Kolam type,
                    extract colors, and provide detailed metrics about your design.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
