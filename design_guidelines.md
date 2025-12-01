# KolamKala Design Guidelines

## Design Approach
**Hybrid Cultural-Utility Design**: Blend artistic showcase aesthetics (inspired by Behance, Dribbble portfolios) with clean utility patterns (Material Design components) to honor Kolam's cultural significance while maintaining functional clarity.

## Color System
- **Primary**: Maroon `#8B1E3F` (CTAs, active states, emphasis)
- **Accent**: Gold `#D8B75A` (highlights, decorative elements, hover states)
- **Soft Pink**: `#FADBD8` (backgrounds, cards, subtle sections)
- **White**: `#FFFFFF` (primary background, cards)
- **Neutral Grey**: `#6B7280` (body text, secondary elements)
- **Pattern Overlay**: Kolam SVG patterns at 5-8% opacity for section backgrounds

## Typography
- **Headings**: Merriweather (serif) - Bold for H1/H2, Regular for H3/H4
  - H1: 48-56px, H2: 36-40px, H3: 28-32px, H4: 20-24px
- **Body**: Inter (sans-serif) - Regular 16px, Medium for emphasis
- **Captions**: Inter 14px
- Line height: 1.6 for body, 1.2 for headings

## Layout & Spacing
Use Tailwind units: **4, 6, 8, 12, 16, 24** for consistent rhythm
- Section padding: `py-16 md:py-24`
- Component spacing: `gap-8` for grids, `space-y-6` for stacked content
- Container: `max-w-7xl mx-auto px-6`

## Navigation
Sticky header with glass-morphism effect (backdrop-blur, white/90 background)
- Logo left, nav items center-right
- Active state: maroon underline (3px thick, rounded)
- Hover: gold color transition

## Home Page

### Hero Section (80vh)
**Large Hero Image**: Traditional Kolam pattern being drawn (hands creating geometric design on floor), with subtle blur overlay
- Centered headline with gold decorative border accent
- Two-button CTA layout: "Analyze Kolam" (maroon solid) + "Create New" (maroon outline) with blurred backgrounds when over image
- Floating stat badges (e.g., "10K+ Patterns Analyzed") with soft pink backgrounds

### Variety Gallery Grid
3-column grid (1 col mobile, 2 tablet) of Kolam type cards
- Each card: full-bleed image, overlay gradient (bottom-up), type name in white
- Hover: lift effect (shadow-lg), slight scale (1.02)
- Cards include: Sikku, Neli, Pulli, Geometric, Freehand, Colored Kolam

### Features Section
Asymmetric 2-column layout alternating image-text placement
- Left: image, Right: feature content (odd rows)
- Reverse for even rows
- Each feature has icon (maroon), heading, description
- Images show actual Kolam analysis/generation in action

## Analyzer Page
Split-screen layout (60/40)
- **Left**: Upload zone with dashed maroon border, drag-drop icon, file specs
- **Right**: Results panel with tabbed sections (Symmetry, Dots, Pattern, Colors, Metrics)
- Results show original + annotated side-by-side comparison
- Download buttons: maroon solid, gold outline

## Generator Page
Control panel sidebar (30%) + live preview canvas (70%)
- **Sidebar**: Segmented controls for style, sliders for complexity/symmetry, color picker grid, matrix inputs
- **Preview**: SVG canvas with checkerboard background, zoom controls
- Real-time preview updates
- Bottom action bar: Generate, Download SVG/PNG, Save to History

## Learning Module
Level tabs at top (pill-style, maroon active background)
- **Lesson cards**: Numbered badge (gold circle), title, duration, video thumbnail
- Expanded lesson: step-by-step accordion with illustrations
- Embedded YouTube player (16:9 ratio)
- Practice button launches generator with preset

## History Page
Timeline layout with period cards
- Vertical timeline line (maroon, 4px) with circle markers (gold)
- Cards alternate left-right from timeline
- Each card: period image, title, date range, description
- Full-width intro section with ornate Kolam border pattern

## Contact Page
Centered form (max-w-2xl) with two-column layout for name/email
- Soft pink background card with white input fields
- Feedback type: pill buttons (multi-select style)
- FAQ accordion below form
- Optional map/contact details in sidebar

## Components

### Cards
White background, shadow-md, rounded-2xl, p-6
Hover: shadow-xl transition

### Buttons
- Primary: maroon bg, white text, rounded-full, px-8 py-3
- Secondary: maroon outline, maroon text
- Icon buttons: gold on hover
- Buttons over images: backdrop-blur-md with white/20 background

### Form Inputs
White background, grey border, focus: maroon ring
Rounded-lg, p-3

### Progress Indicators
Maroon fill with gold shimmer animation

## Images
1. **Hero**: Hands creating intricate Kolam pattern on traditional floor
2. **Gallery**: High-quality photos of each Kolam type (6 images)
3. **Features**: Screenshots/photos of analyzer showing annotated patterns, generator interface, learning tutorials
4. **History**: Historical Kolam photographs from different eras and regions
5. **Learning**: Step-by-step construction diagrams, tutorial video thumbnails

## Animations
Use sparingly:
- Page transitions: fade-in (300ms)
- Card hovers: scale + shadow (200ms)
- Loading: maroon spinner with gold accent
- Canvas updates: smooth morphing (SVG SMIL)

## Responsive Breakpoints
- Mobile: Single column, stacked layouts
- Tablet (768px): 2-column grids, side-by-side where appropriate
- Desktop (1024px): Full multi-column, split-screen for tools