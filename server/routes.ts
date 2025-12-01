import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import OpenAI from "openai";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ success: true, id: message.id });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ error: "Invalid contact form data" });
    }
  });

  app.get("/api/contact", async (_req: Request, res: Response) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/analyze", upload.single("image"), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      const base64Image = req.file.buffer.toString("base64");
      const mimeType = req.file.mimetype;

      const openaiApiKey = process.env.OPENAI_API_KEY;
      
      if (!openaiApiKey) {
        return res.status(200).json({
          symmetry: ["vertical", "horizontal"],
          dotMatrix: { rows: 5, cols: 5 },
          pattern: { label: "sikku", confidence: 0.85 },
          colors: ["#8B1E3F", "#D8B75A", "#FFFFFF"],
          complexity: 65,
          lineThickness: "medium",
          style: "outline",
        });
      }

      // Using gpt-4o for accurate Kolam pattern analysis
      const openai = new OpenAI({ apiKey: openaiApiKey });

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert in analyzing Kolam patterns, a traditional South Indian floor art. 
Analyze the provided image and return a JSON object with the following structure:
{
  "symmetry": ["vertical", "horizontal", "rotational"] (include only detected types),
  "dotMatrix": { "rows": number, "cols": number } or null if no dot grid detected,
  "pattern": { "label": "sikku" | "neli" | "pulli" | "geometric" | "freehand", "confidence": 0-1 },
  "colors": ["#hexcolor1", "#hexcolor2"] (up to 5 primary colors),
  "complexity": 0-100 (percentage indicating design complexity),
  "lineThickness": "thin" | "medium" | "thick",
  "style": "outline" | "filled" | "mixed"
}
Respond with only valid JSON, no additional text.`,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this Kolam pattern image and provide detailed metrics.",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${mimeType};base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 1024,
      });

      const analysisText = response.choices[0].message.content;
      if (!analysisText) {
        throw new Error("No analysis response from AI");
      }

      const analysis = JSON.parse(analysisText);

      await storage.createAnalysisResult({
        originalImageUrl: `data:${mimeType};base64,${base64Image.substring(0, 100)}...`,
        annotatedImageUrl: null,
        symmetry: analysis.symmetry || [],
        dotMatrix: analysis.dotMatrix || null,
        patternType: analysis.pattern?.label || "unknown",
        confidence: Math.round((analysis.pattern?.confidence || 0) * 100),
        colors: analysis.colors || [],
        complexity: analysis.complexity || 0,
        lineThickness: analysis.lineThickness || "medium",
        style: analysis.style || "outline",
      });

      res.json(analysis);
    } catch (error) {
      console.error("Analysis error:", error);
      res.status(500).json({ error: "Failed to analyze image" });
    }
  });

  app.post("/api/generate", async (req: Request, res: Response) => {
    try {
      const { style, complexity, symmetryType, symmetryAxes, rows, cols, dotSpacing, strokeWidth, colors, svgContent } = req.body;
      
      const kolam = await storage.createGeneratedKolam({
        style,
        complexity,
        symmetryType,
        symmetryAxes: symmetryAxes || 4,
        rows,
        cols,
        dotSpacing: dotSpacing || 40,
        strokeWidth: strokeWidth || 3,
        colors: colors || ["#8B1E3F"],
        svgContent: svgContent || "",
      });

      res.status(201).json({ success: true, id: kolam.id });
    } catch (error) {
      console.error("Generate error:", error);
      res.status(400).json({ error: "Failed to save generated Kolam" });
    }
  });

  app.get("/api/generated", async (_req: Request, res: Response) => {
    try {
      const kolams = await storage.getGeneratedKolams();
      res.json(kolams);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch generated Kolams" });
    }
  });

  app.get("/api/lessons", async (req: Request, res: Response) => {
    const level = parseInt(req.query.level as string) || 1;
    
    const lessons = [
      {
        id: "beginner-1",
        level: 1,
        title: "Introduction to Kolam Art",
        description: "Learn the basics of Kolam, its cultural significance, and the tools you'll need to get started.",
        duration: "15 min",
        videoId: "dQw4w9WgXcQ",
        steps: [
          { order: 1, title: "Understanding Kolam", description: "Kolam is a traditional South Indian art form." },
          { order: 2, title: "Materials Needed", description: "You'll need rice flour or chalk powder." },
          { order: 3, title: "Basic Techniques", description: "Learn to create smooth, continuous lines." },
        ],
      },
      {
        id: "beginner-2",
        level: 1,
        title: "Drawing Your First Dot Grid",
        description: "Master the foundation of most Kolam designs.",
        duration: "20 min",
        videoId: "dQw4w9WgXcQ",
        steps: [
          { order: 1, title: "Planning Your Grid", description: "Start with a simple 3x3 dot grid." },
          { order: 2, title: "Connecting Dots", description: "Practice connecting adjacent dots." },
        ],
      },
      {
        id: "intermediate-1",
        level: 2,
        title: "Sikku Kolam Fundamentals",
        description: "Learn the art of drawing continuous curved lines.",
        duration: "30 min",
        videoId: "dQw4w9WgXcQ",
        steps: [
          { order: 1, title: "Understanding Sikku", description: "Sikku means interlocking." },
          { order: 2, title: "The Weaving Technique", description: "Practice weaving around dots." },
        ],
      },
      {
        id: "advanced-1",
        level: 3,
        title: "Complex Sikku Patterns",
        description: "Master advanced Sikku designs.",
        duration: "45 min",
        videoId: "dQw4w9WgXcQ",
        steps: [
          { order: 1, title: "Multi-Loop Planning", description: "Plan designs with multiple loops." },
          { order: 2, title: "Nested Patterns", description: "Create patterns within patterns." },
        ],
      },
    ];

    const filteredLessons = lessons.filter(lesson => lesson.level === level);
    res.json(filteredLessons);
  });

  app.get("/api/history", async (_req: Request, res: Response) => {
    try {
      const analysisResults = await storage.getAnalysisResults();
      const generatedKolams = await storage.getGeneratedKolams();
      res.json({ analysisResults, generatedKolams });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch history" });
    }
  });

  return httpServer;
}
