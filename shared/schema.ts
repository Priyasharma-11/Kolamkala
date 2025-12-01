import { pgTable, text, varchar, integer, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Contact/Feedback messages
export const contactMessages = pgTable("contact_messages", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  feedbackType: text("feedback_type").notNull(), // bug, suggestion, praise, other
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Generated Kolam designs saved to history
export const generatedKolams = pgTable("generated_kolams", {
  id: varchar("id", { length: 36 }).primaryKey(),
  style: text("style").notNull(), // sikku, neli, pulli, geometric, freehand
  complexity: integer("complexity").notNull(), // 1-5
  symmetryType: text("symmetry_type").notNull(), // vertical, horizontal, radial
  symmetryAxes: integer("symmetry_axes").default(4),
  rows: integer("rows").notNull(),
  cols: integer("cols").notNull(),
  dotSpacing: integer("dot_spacing").default(40),
  strokeWidth: integer("stroke_width").default(3),
  colors: text("colors").array().notNull(),
  svgContent: text("svg_content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertGeneratedKolamSchema = createInsertSchema(generatedKolams).omit({
  id: true,
  createdAt: true,
});

export type InsertGeneratedKolam = z.infer<typeof insertGeneratedKolamSchema>;
export type GeneratedKolam = typeof generatedKolams.$inferSelect;

// Analysis results
export const analysisResults = pgTable("analysis_results", {
  id: varchar("id", { length: 36 }).primaryKey(),
  originalImageUrl: text("original_image_url").notNull(),
  annotatedImageUrl: text("annotated_image_url"),
  symmetry: text("symmetry").array(), // vertical, horizontal, rotational
  dotMatrix: jsonb("dot_matrix"), // { rows: number, cols: number }
  patternType: text("pattern_type"), // sikku, neli, pulli, geometric, freehand
  confidence: integer("confidence"), // 0-100
  colors: text("colors").array(),
  complexity: integer("complexity"), // 0-100
  lineThickness: text("line_thickness"), // thin, medium, thick
  style: text("style"), // outline, filled
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAnalysisResultSchema = createInsertSchema(analysisResults).omit({
  id: true,
  createdAt: true,
});

export type InsertAnalysisResult = z.infer<typeof insertAnalysisResultSchema>;
export type AnalysisResult = typeof analysisResults.$inferSelect;

// TypeScript interfaces for frontend use
export interface KolamType {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Lesson {
  id: string;
  level: number; // 1, 2, 3
  title: string;
  description: string;
  duration: string;
  steps: LessonStep[];
  videoId?: string;
  practicePreset?: GeneratorPreset;
}

export interface LessonStep {
  order: number;
  title: string;
  description: string;
  image?: string;
}

export interface GeneratorPreset {
  style: string;
  complexity: number;
  symmetryType: string;
  rows: number;
  cols: number;
}

export interface HistoryPeriod {
  id: string;
  title: string;
  dateRange: string;
  description: string;
  image?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

// Generator parameters
export interface GeneratorParams {
  style: 'sikku' | 'neli' | 'pulli' | 'geometric' | 'freehand';
  complexity: number; // 1-5
  symmetryType: 'vertical' | 'horizontal' | 'radial';
  symmetryAxes: number; // for radial, 2-12
  rows: number;
  cols: number;
  dotSpacing: number;
  strokeWidth: number;
  colors: string[];
}

// Analysis response
export interface AnalysisResponse {
  symmetry: string[];
  dotMatrix: { rows: number; cols: number } | null;
  pattern: { label: string; confidence: number };
  colors: string[];
  complexity: number;
  lineThickness: string;
  style: string;
  annotatedImageUrl?: string;
}

// Users table (keeping original)
export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
