# KolamKala - AI-Assisted Kolam Analyzer & Generator

## Overview

KolamKala is a modern web application dedicated to the traditional South Indian art form of Kolam. The platform provides AI-powered tools for analyzing Kolam patterns, generating new designs, and learning the art through structured tutorials. The application serves as both an educational resource and a creative tool for exploring this culturally significant geometric art form.

The application features:
- **Kolam Analyzer**: Upload and analyze Kolam images using OpenAI's vision API to detect symmetry, patterns, and structural elements
- **Kolam Generator**: Create custom SVG-based Kolam designs with configurable parameters (style, complexity, symmetry, colors)
- **Learning Module**: Interactive step-by-step tutorials organized by difficulty level
- **History & Context**: Educational content about Kolam's cultural heritage and evolution
- **Contact System**: User feedback and inquiry management

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: React with TypeScript, Vite build system, Wouter for routing

**UI Framework**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling

**Design System**: 
- Custom color palette inspired by traditional Kolam aesthetics (maroon primary, gold accents, soft pink backgrounds)
- Typography: Merriweather serif for headings, Inter sans-serif for body text
- Glassmorphism navigation with sticky header
- Responsive grid layouts (mobile-first approach)

**State Management**: 
- TanStack Query (React Query) for server state management
- React hooks for local component state
- No global state management library (kept simple with Query and Context)

**Key Architectural Decisions**:
- **Component-based architecture**: Reusable UI components in `client/src/components/ui/`
- **Page-based routing**: Each major feature as a separate page (`/analyzer`, `/generator`, `/learning`, etc.)
- **Separation of concerns**: Business logic separated from presentation (hooks, utils, API calls)
- **Type safety**: TypeScript throughout with shared types from backend schema
- **Asset management**: Static images stored in `attached_assets/` directory

### Backend Architecture

**Technology Stack**: Express.js with TypeScript, HTTP server for API endpoints

**API Design**:
- RESTful API structure with `/api/*` prefix
- File upload handling via Multer middleware (for image analysis)
- JSON request/response format for data exchange
- CORS enabled for development

**Data Storage Strategy**:
- **Development**: In-memory storage implementation (`MemStorage` class)
- **Production**: PostgreSQL via Neon serverless driver (configured but not actively used yet)
- **ORM**: Drizzle ORM with schema definitions in `shared/schema.ts`
- Schema supports: contact messages, generated Kolam designs, analysis results

**Key Architectural Decisions**:
- **Modular routing**: Route handlers separated in `server/routes.ts`
- **Static file serving**: Vite-built frontend served from Express in production
- **Development setup**: Vite dev server in middleware mode with HMR
- **Build process**: Custom build script bundles server with allowlisted dependencies to reduce cold start times
- **Error handling**: Centralized logging with request/response tracking

### AI Integration

**OpenAI Vision API**: Used for Kolam pattern analysis
- Analyzes uploaded images for symmetry, dot patterns, complexity
- Provides descriptive feedback on Kolam characteristics
- Falls back to mock data if API key not configured
- Base64 image encoding for API transmission

**Generator Algorithm**: Client-side SVG generation
- Programmatic creation of Kolam patterns based on parameters
- Supports multiple styles: Sikku, Neli, Pulli, Geometric, Freehand
- Configurable symmetry types: vertical, horizontal, radial
- Color customization with preset palettes

### Database Schema

**Tables** (Drizzle ORM schema):

1. **contact_messages**: User feedback and inquiries
   - Fields: id, name, email, subject, message, feedbackType, createdAt
   - Purpose: Store user communications and feedback

2. **generated_kolams**: Saved Kolam designs
   - Fields: id, style, complexity, symmetryType, symmetryAxes, rows, cols, dotSpacing, strokeWidth, colors, svgContent, createdAt
   - Purpose: History of user-generated designs

3. **analysis_results**: Kolam image analysis data
   - Fields: id, imagePath, symmetryType, dotMatrix, complexity, colorPalette, description, createdAt
   - Purpose: Store AI analysis results for uploaded images

**Schema Design Rationale**: 
- Keeps design parameters separate from visual content (SVG)
- Enables querying by style, complexity, or other attributes
- Timestamps for temporal analysis and sorting

### Build & Deployment

**Development**:
- Concurrent Vite dev server with Express backend
- Hot module replacement for frontend changes
- TypeScript compilation on-the-fly via tsx

**Production Build**:
- Frontend: Vite bundles to `dist/public/`
- Backend: esbuild bundles server to `dist/index.cjs`
- Dependency bundling: Critical packages bundled, others externalized
- Single server serves both API and static assets

**Configuration**:
- Environment variables: `DATABASE_URL`, `OPENAI_API_KEY`
- Tailwind config with custom theme extensions
- Path aliases: `@/` (client), `@shared/` (shared types), `@assets/` (images)

## External Dependencies

### Third-Party Services

**OpenAI API**:
- Purpose: Computer vision analysis of Kolam images
- Integration: Direct API calls via OpenAI SDK
- Fallback: Mock responses when API key unavailable

**Neon Database** (PostgreSQL):
- Purpose: Production data persistence
- Integration: Via `@neondatabase/serverless` driver
- Connection: Serverless-optimized PostgreSQL client
- Migration: Drizzle Kit for schema management

### Key Libraries

**Frontend**:
- **React 18**: UI framework
- **TanStack Query**: Server state synchronization
- **Radix UI**: Headless accessible component primitives
- **Tailwind CSS**: Utility-first styling
- **Wouter**: Lightweight routing (alternative to React Router)
- **react-dropzone**: Drag-and-drop file uploads
- **react-hook-form + Zod**: Form validation

**Backend**:
- **Express**: HTTP server framework
- **Multer**: Multipart form data handling (file uploads)
- **Drizzle ORM**: Type-safe database queries
- **connect-pg-simple**: PostgreSQL session store (configured but not actively used)

**Development Tools**:
- **Vite**: Fast frontend build tool
- **esbuild**: Fast JavaScript bundler for server
- **tsx**: TypeScript execution
- **Drizzle Kit**: Database migrations and introspection

### Design Resources

**Fonts** (Google Fonts):
- Merriweather: Serif font for headings and cultural authenticity
- Inter: Sans-serif for body text and UI elements

**Generated Images**:
- AI-generated Kolam pattern examples stored in `attached_assets/`
- Used throughout the UI for visual reference and styling