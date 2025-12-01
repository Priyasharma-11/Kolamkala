import { 
  type User, 
  type InsertUser, 
  type ContactMessage, 
  type InsertContactMessage,
  type GeneratedKolam,
  type InsertGeneratedKolam,
  type AnalysisResult,
  type InsertAnalysisResult
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  createGeneratedKolam(kolam: InsertGeneratedKolam): Promise<GeneratedKolam>;
  getGeneratedKolams(): Promise<GeneratedKolam[]>;
  getGeneratedKolam(id: string): Promise<GeneratedKolam | undefined>;
  
  createAnalysisResult(result: InsertAnalysisResult): Promise<AnalysisResult>;
  getAnalysisResults(): Promise<AnalysisResult[]>;
  getAnalysisResult(id: string): Promise<AnalysisResult | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: Map<string, ContactMessage>;
  private generatedKolams: Map<string, GeneratedKolam>;
  private analysisResults: Map<string, AnalysisResult>;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.generatedKolams = new Map();
    this.analysisResults = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const contactMessage: ContactMessage = {
      ...message,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createGeneratedKolam(kolam: InsertGeneratedKolam): Promise<GeneratedKolam> {
    const id = randomUUID();
    const generatedKolam: GeneratedKolam = {
      ...kolam,
      id,
      createdAt: new Date(),
    };
    this.generatedKolams.set(id, generatedKolam);
    return generatedKolam;
  }

  async getGeneratedKolams(): Promise<GeneratedKolam[]> {
    return Array.from(this.generatedKolams.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getGeneratedKolam(id: string): Promise<GeneratedKolam | undefined> {
    return this.generatedKolams.get(id);
  }

  async createAnalysisResult(result: InsertAnalysisResult): Promise<AnalysisResult> {
    const id = randomUUID();
    const analysisResult: AnalysisResult = {
      ...result,
      id,
      createdAt: new Date(),
    };
    this.analysisResults.set(id, analysisResult);
    return analysisResult;
  }

  async getAnalysisResults(): Promise<AnalysisResult[]> {
    return Array.from(this.analysisResults.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getAnalysisResult(id: string): Promise<AnalysisResult | undefined> {
    return this.analysisResults.get(id);
  }
}

export const storage = new MemStorage();
