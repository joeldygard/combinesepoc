# Combine homepage POC brief

## Mandate

Build a production-shaped proof of concept for the complete Combine homepage. It must present Combine as the company that turns physical-system data into working intelligence by combining data science, control engineering, embedded systems, production software, and user-facing products.

The result must not resemble a generic Framer AI template. It should be modern, technical, restrained, specific, and visibly built as one coherent system.

## Architecture decision

Use **Astro + TypeScript**.

- Static generation by default.
- Astro components for all static content.
- React only for the existing hero particle simulation.
- Astro Content Collections for typed cases, articles, capabilities, and authors.
- CSS custom properties for design tokens.
- SSR only for a future route that genuinely requires request-time behavior.
- Keep presentation components independent of any future CMS response shape.

Do not build the page as a hydrated React application.

## Animation decision

**The particle simulation belongs only to the hero. Do not keep it as a persistent background while the user scrolls.**

A permanent animated background would flatten the hierarchy, reduce readability, create visual fatigue, increase mobile cost, and turn the strongest visual idea into generic wallpaper.

Required behavior:

1. Hero is approximately `100svh`.
2. Simulation runs behind the hero only.
3. A quiet dark zone remains behind text.
4. As the next section approaches, particles and connections fade.
5. The hero ends with a hard or subtly angled boundary.
6. The following section is light and static.
7. A static or heavily restrained crop may recur behind the final CTA.
8. No pinned hero and no long scroll-controlled particle sequence.

Simulation requirements:

- Canvas is decorative and `aria-hidden`.
- Pause when offscreen or when the document is hidden.
- Cap device-pixel ratio and particle count.
- Pointer interaction only on fine-pointer devices.
- Simplify behavior on mobile.
- Respect `prefers-reduced-motion`.
- Reduced-motion fallback is a static generated frame or SVG.
- Do not couple simulation state to general page scroll.

## Brand foundation

### Character

- Precise, not sterile
- Technical, not futuristic
- Sharp, not aggressive
- Restrained, not empty
- Confident, not grandiose
- Specific, not slogan-heavy
- Advanced, not animated everywhere

### Position

Primary proposition:

> Combine turns physical-system data into working intelligence.

Supporting proposition:

> We bring data science, control engineering, embedded systems, production software, and user-facing applications into one delivery path.

The visitor must understand that Combine does not stop at a model or proof of concept. It can understand the system, construct and validate the intelligence, deploy it, integrate it, expose it through APIs and interfaces, and support it in operation.

## Writing rules

Prefer:

- Observe
- Model
- Simulate
- Validate
- Predict
- Optimize
- Control
- Deploy
- Audit
- Operate
- Improve

Avoid:

- Unlock
- Harness
- Revolutionize
- Reimagine
- Supercharge
- Empower
- Seamless
- Cutting-edge
- Game-changing
- Transformative
- Next-generation
- Empty uses of “AI-powered”
- “End-to-end” without naming the endpoints

Copy limits:

- Hero headline: 5–11 words
- Hero support: 15–28 words
- Section introduction: 20–45 words
- Capability description: 25–55 words
- Case summary: 30–65 words
- No homepage paragraph over 80 words

## Typeface

Use **Host Grotesk** for display, body, labels, navigation, and product-adjacent UI.

```css
--font-sans: "Host Grotesk", "Helvetica Neue", Arial, sans-serif;
--font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
```

Use monospace only for real technical notation, diagram metadata, measurements, and code.

Suggested weights:

- Hero/display: 650–700
- Section heading: 600–650
- Card heading: 550–600
- Body: 400
- Navigation: 500
- Labels: 500–600
- Metrics: 600

Host Grotesk does not create the identity by itself. Distinction must come from composition, logo-derived geometry, color roles, real technical content, diagrams, imagery, and editing.

## Color

Centralize all values.

```css
:root {
  --color-ink: #0b0b0d;
  --color-ink-soft: #18181b;
  --color-paper: #f5f4f1;
  --color-surface: #ffffff;
  --color-graphite: #2c2c31;
  --color-muted: #73737b;
  --color-hairline: #d8d7d3;

  --color-plum-950: #260b15;
  --color-plum-900: #3c1022;
  --color-plum-800: #57182f;
  --color-plum-700: #782441;
  --color-plum-600: #963253;
  --color-plum-200: #e9b8c8;
  --color-plum-100: #f5dde5;
  --color-plum-50: #fbf2f5;

  --color-signal: #8ceef0;

  --color-text-primary: var(--color-ink);
  --color-text-secondary: var(--color-muted);
  --color-text-inverse: #ffffff;
  --color-surface-default: var(--color-surface);
  --color-surface-subtle: var(--color-paper);
  --color-surface-inverse: var(--color-ink);
  --color-surface-brand: var(--color-plum-700);
  --color-border-subtle: var(--color-hairline);
  --color-action-primary: var(--color-plum-700);
  --color-action-primary-hover: var(--color-plum-800);
}
```

Rules:

- Black and warm white dominate.
- Plum is the brand color and should appear in meaningful fields, actions, metrics, and controlled states.
- Cyan is a signal/sensing color, not the general identity color.
- Do not place `#782441` text on black.
- No decorative rainbow palette.
- No gradients unless a specific visual problem requires one.

## Geometry

Derive one clipped angle or corner treatment from the Combine logo.

Use it sparingly for:

- Primary button edge
- Section marker
- Image crop
- Diagram terminal
- Active navigation indicator

Do not apply it to every component. Do not distort controls or reduce hit areas.

Use small radii:

```css
--radius-small: 0.25rem;
--radius-medium: 0.5rem;
```

Avoid universal pill styling.

## Layout

```css
:root {
  --content-max: 80rem;
  --content-wide: 92rem;
  --text-max: 44rem;
  --gutter: clamp(1.25rem, 4vw, 4rem);
  --section-space: clamp(5rem, 10vw, 10rem);
}
```

Use a 12-column desktop grid.

- Do not center every section.
- Use offset headings and asymmetric case layouts.
- Keep clear alignment lines.
- Use few conventional cards.
- Do not put every concept in a bordered rectangle.
- Alternate dense evidence with open statements.
- Prefer white, off-white, plum, and black sectional fields.

## Homepage structure

Build exactly these eight major sections.

### 1. Hero

Eyebrow:

`AI FOR PHYSICAL SYSTEMS`

Headline:

`Turn real-world data into working intelligence.`

Support:

`We combine data science, control engineering and production software to build systems that can be trusted outside the lab.`

Primary CTA:

`See how we build`

Secondary CTA:

`Talk to an engineer`

Capability rail:

`MODELS · PIPELINES · CONTROL · EDGE · CLOUD · INTERFACES`

Rules:

- Logo is prominent but not the headline.
- Maximum hero copy width: about `820px`.
- Do not use photography.
- Navigation is quiet and rectangular or subtly clipped, not a large pill.
- The simulation surrounds the copy but does not obscure it.

### 2. Evidence strip

Heading:

`Built for systems with real constraints.`

Intro:

`Our work starts with the behavior of the system and ends with something people or machines can actually use.`

Proof blocks:

- `1B+ sensor readings analyzed`
- `5× faster inspection workflow`
- `Production path already established`

Supporting lines:

- Physical modelling and live-capable analysis for water infrastructure.
- Computer vision applied to long-running underwater video archives.
- Reusable pipelines, validation, APIs and interface components reduce repeated delivery work.

Use large typography, rules, and whitespace. No shadowed metric cards.

### 3. System story

Heading:

`Most AI projects stop at a model. We build the system around it.`

Support:

`A useful model still needs reliable data, validation, deployment, integration and an interface. Combine works across that entire path.`

Four stages:

1. `PHYSICAL SYSTEM` — behavior, constraints, sensors, failure modes
2. `DATA & MODELS` — pipelines, simulation, machine learning, validation
3. `OPERATION` — edge, cloud, APIs, control, monitoring
4. `PRODUCT` — dashboards, tools, decisions, automated action

This is the only substantial scroll-linked explanation after the hero.

- It must be understandable without animation.
- Use semantic HTML plus inline SVG.
- Highlight each stage once as a signal travels through.
- Do not pin for more than approximately one viewport.
- Reduced-motion shows the complete diagram immediately.

### 4. Capabilities

Heading:

`The disciplines required to make it work.`

Intro:

`We assemble the right path around the system: from modelling and data acquisition to deployed intelligence and the product people use.`

Use three large groups, not a grid of small cards.

#### Understand the system

- System modelling
- Simulation and digital twins
- System identification
- Sensor fusion
- Control engineering
- Test and validation strategy

#### Build trustworthy intelligence

- Data engineering
- Machine learning
- Computer vision
- Forecasting
- Optimization
- Quality controls and traceability

#### Put it into operation

- Embedded and edge deployment
- Cloud services and APIs
- Real-time integration
- Dashboards and decision tools
- Monitoring
- Maintenance and iteration

Each group may use a meaningful SVG stand-in. Avoid icon grids.

### 5. Accelerator / delivery platform

Use a plum field.

Heading:

`The production path is already built.`

Support:

`Our delivery platform provides the repeatable parts every serious AI product needs: ingestion, validation, traceability, deployment, APIs and production-ready interface components.`

Secondary support:

`We adapt the models and application to your system instead of rebuilding the delivery machinery from scratch.`

Pipeline:

`INGEST → VALIDATE → TRAIN → AUDIT → DEPLOY → OBSERVE → PRESENT`

Features:

- Repeatable data pipelines
- Automated quality checks
- Auditable model and data history
- Deployment interfaces
- Monitoring hooks
- Reusable dashboard components
- Consistent API integration
- Product-oriented frontend delivery

CTA:

`Explore the delivery platform`

Important: do not imply that Accelerator is a universal no-code product or a one-click solution. Present it as proven delivery infrastructure and reusable engineering foundations.

Use a real architecture-style SVG. No fake cloud clip art, fake code windows, or meaningless dashboards.

### 6. Selected work

Heading:

`Working intelligence, in context.`

Use three primary cases.

#### Ocean data

Title:

`Twenty years of underwater video became a working biodiversity dataset.`

Summary:

`Computer vision and an end-to-end analysis system reduced a specialist inspection workflow to one-fifth of the manual time.`

Tags:

`COMPUTER VISION · DATA PIPELINES · USER WORKFLOW`

Placeholder:

Underwater SVG frame with annotation boxes, species markers, and a timeline.

#### Wastewater

Title:

`A billion sensor readings turned into live-capable infrastructure insight.`

Summary:

`Physical-system modelling and AI were combined to estimate flows, detect overflow conditions and design analyses suitable for eventual real-time operation.`

Tags:

`SENSOR DATA · PHYSICAL MODELLING · REAL-TIME ANALYSIS`

Placeholder:

Flow-network SVG with pump nodes, signal traces, and one overflow state.

#### ACHT

Title:

`Operational data at sea, connected to decisions on board.`

Summary:

`A proof-of-concept model and API combined loading plans, pump logs, voyage reports and product data inside an existing maritime operations product.`

Tags:

`MARITIME · OPTIMIZATION · API INTEGRATION`

Placeholder:

Vessel cross-section with tank blocks, pump/valve routes, and API output panel.

Layout:

- One featured case
- Two secondary cases in an asymmetric grid
- No carousel
- No hover-hidden content
- Mobile stacks all cases

CTA:

`See all work`

### 7. Edge / technical writing

Heading:

`Notes from the systems we work on.`

Intro:

`Engineering articles, project findings and practical methods from control systems, data science, embedded software and deployed AI.`

Use one featured article and three compact listings. Show:

- Title
- Excerpt where appropriate
- Discipline
- Author
- Published date
- Reading time

POC titles:

- What a billion sensor readings reveal about wastewater systems
- Designing AI analysis for eventual real-time operation
- From data to decisions at sea
- Why simulation should come before drone hardware

Use an editorial list, not a wall of cards.

CTA:

`Read Edge`

### 8. Final CTA

Black field.

Eyebrow:

`READY WHEN THE SYSTEM IS`

Headline:

`You have the problem. We have the path to a working product.`

Support:

`Bring us the system, the data or the decision that needs to improve.`

Primary CTA:

`Talk to an engineer`

Secondary:

`contact@combine.se`

Use a static or very low-motion crop of the particle motif. No pointer interaction.

## Navigation

Desktop:

- Capabilities
- Platform
- Work
- Edge
- About
- Talk to us

Career belongs in the footer or About and links to Teamtailor.

Behavior:

- Transparent over hero.
- Solid after leaving hero.
- Sticky is acceptable.
- No elaborate scroll animation.
- Mobile menu is server-rendered HTML with minimal enhancement.

## Motion hierarchy

1. Hero simulation
2. One contained system-flow explanation
3. Navigation and control state feedback
4. Restrained section entrance
5. Everything else static

Do not use:

- Scroll-jacking
- Character-by-character heading animation
- Multiple pinned sections
- Marquees
- Mouse-following buttons
- Magnetic CTAs
- Tilt cards
- Continuous animation behind every section
- Entry animation on every card
- Animated counters on repeated entry

## Images and POC stand-ins

Use:

- Inline SVG diagrams
- Neutral image blocks with specific labels
- Wireframe dashboard fragments
- Data plots represented as SVG
- Abstracted physical-system illustrations

Every placeholder must communicate intended content.

Bad:

`[IMAGE]`

Good:

`SVG: wastewater network with pump nodes, signal lines and overflow state`

## Accessibility

Target WCAG 2.2 AA.

Required:

- Semantic landmarks
- One `h1`
- Logical heading hierarchy
- Skip link
- Keyboard-accessible navigation
- Visible focus states
- 44px minimum control target
- No information conveyed by color alone
- Decorative canvas hidden from assistive technology
- Textual equivalents for informative diagrams
- Reduced-motion support
- Correct state contrast
- Visible form labels
- No disabled zoom
- Test at 200% zoom

## Performance

- Complete content exists in static HTML.
- JavaScript is limited to interactive islands.
- No full-page React hydration.
- No animation library unless native CSS/WAAPI is inadequate.
- Optimize all images and specify dimensions.
- Avoid autoplay video.
- Self-host Host Grotesk in production if licensing permits.
- Preload only the font needed above the fold.
- Pause offscreen canvas work.
- Cap DPR and particle count.
- Target LCP below 2.5 seconds on a representative mobile connection.
- Avoid layout shift.
- No third-party trackers in the POC.

## SEO groundwork

Every page supports:

- Title
- Description
- Canonical URL
- Open Graph metadata
- Social image
- Robots directives
- Language
- Published and modified dates where applicable

Prepare JSON-LD helpers for:

- Organization
- WebSite
- BreadcrumbList
- Article / BlogPosting
- Service
- Person for real author pages

Prepare:

- Sitemap
- RSS for Edge
- `robots.txt`
- Canonical helper
- Social-image defaults
- Per-page social-image overrides
- Redirect mapping for existing Combine URLs

Do not invent ratings, reviews, awards, or business data.

## Content architecture

Create typed collections:

- `cases`
- `articles`
- `capabilities`
- `authors`
- `sitePages`

Normalize content before presentation:

`local content → normalized domain model → components`

Later:

`Sanity content → normalized domain model → components`

Do not couple page components to Sanity-specific fields.

Suggested case model:

```ts
type CaseStudy = {
  title: string;
  slug: string;
  summary: string;
  client?: string;
  industries: string[];
  capabilities: string[];
  result?: string;
  resultLabel?: string;
  featured: boolean;
  featuredOrder?: number;
  heroImage?: ImageMetadata;
  heroAlt?: string;
  publishedAt: Date;
  updatedAt?: Date;
  seo: {
    title?: string;
    description: string;
    image?: ImageMetadata;
  };
};
```

Suggested article model:

```ts
type Article = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: Date;
  updatedAt?: Date;
  readingTime?: number;
  featured: boolean;
  heroImage?: ImageMetadata;
  heroAlt?: string;
  seo: {
    title?: string;
    description: string;
    image?: ImageMetadata;
  };
};
```

## Project structure

```text
src/
├── assets/
├── components/
│   ├── base/
│   ├── layout/
│   ├── home/
│   │   ├── Hero.astro
│   │   ├── HeroSimulation.tsx
│   │   ├── EvidenceStrip.astro
│   │   ├── SystemStory.astro
│   │   ├── CapabilitiesSection.astro
│   │   ├── PlatformSection.astro
│   │   ├── SelectedWork.astro
│   │   ├── EdgeSection.astro
│   │   └── FinalCta.astro
│   ├── cases/
│   ├── articles/
│   └── seo/
├── content/
│   ├── cases/
│   ├── articles/
│   ├── capabilities/
│   └── authors/
├── layouts/
├── lib/
│   ├── content/
│   ├── seo/
│   └── motion/
├── pages/
│   ├── index.astro
│   ├── capabilities/
│   ├── platform/
│   ├── work/
│   ├── edge/
│   ├── about/
│   ├── contact/
│   ├── rss.xml.ts
│   └── robots.txt.ts
└── styles/
    ├── tokens.css
    ├── global.css
    └── typography.css
```

## Agent coding rules

1. No raw colors outside token definitions.
2. No arbitrary component spacing without justification.
3. Astro components by default.
4. React only for genuine interaction.
5. Do not hydrate static content.
6. Keep copy in content or page data, not scattered through components.
7. Use semantic HTML before ARIA.
8. Define all interactive states.
9. Define accessibility behavior for every image and diagram.
10. Do not create a universal Card and force all content into it.
11. Do not add Tailwind unless explicitly approved.
12. Do not add a full animation library for simple transitions.
13. Keep dependencies minimal.
14. Do not use lorem ipsum.
15. Do not fabricate client logos, testimonials, metrics, awards, or claims.
16. Do not over-abstract the POC.
17. Components must support explicit light/dark variants where needed.
18. Generated lists require stable ordering.
19. Content must work without client JavaScript.
20. Treat this brief as the source of truth.

## Responsive testing

Test at:

- 360px
- 390px
- 768px
- 1024px
- 1440px
- 1920px

Rules:

- Content-driven breakpoints.
- No critical hover interactions.
- No horizontal overflow.
- SVG diagrams transform or stack when illegible.
- Particle density scales by capability.
- Use modern viewport units deliberately.
- Navigation must survive longer Swedish or English labels.

## POC deliverables

1. Complete responsive homepage
2. Astro TypeScript project
3. Existing particle simulation integrated as a React island
4. Static reduced-motion fallback
5. Header and mobile menu
6. All eight homepage sections
7. Central design tokens
8. Typed local content collections
9. Three case entries
10. Four article entries
11. SEO component and homepage JSON-LD
12. Sitemap and RSS groundwork
13. Meaningful SVG stand-ins
14. Accessible focus and navigation behavior
15. README covering setup, build, content editing, architecture, and CMS migration
16. No console errors
17. No broken links
18. No layout overflow at required widths

## Acceptance criteria

Visual:

- One coherent design system.
- Hero is distinctive but not omnipresent.
- Dark and light fields have deliberate rhythm.
- Host Grotesk is consistent.
- Plum is meaningful, not scattered decoration.
- Logo geometry recurs sparingly.
- Few conventional cards.
- No generic AI brains, robots, glowing hands, fake terminals, or meaningless charts.

Content:

- What Combine does is clear in the first viewport.
- Proof follows immediately.
- Control and embedded capability strengthen the AI story.
- Accelerator explains production readiness.
- Cases contain physical context, method, and result.
- The same promise is not repeated under several headings.
- Careers does not consume homepage space.

Technical:

- Static build passes.
- Main content is in generated HTML.
- Only justified islands hydrate.
- Content schemas validate.
- Metadata is complete.
- Reduced motion works.
- Canvas stops when hidden or offscreen.
- Keyboard navigation works.
- No critical accessibility failures.
- CMS migration does not require rewriting presentation components.

## Implementation order

1. Bootstrap Astro TypeScript.
2. Add React integration only for the hero.
3. Establish tokens, reset, typography, and layout primitives.
4. Build base layout, SEO, header, and footer.
5. Integrate the simulation with lifecycle and accessibility controls.
6. Build all static sections with typed temporary data.
7. Move cases and articles into Content Collections.
8. Add meaningful SVG placeholders.
9. Implement responsive behavior.
10. Add reduced-motion behavior.
11. Add JSON-LD, sitemap, RSS, and robots groundwork.
12. Audit headings, links, contrast, focus, overflow, and shipped JavaScript.
13. Document architecture and future CMS mapping.
14. Remove repeated or generic AI copy.

## Compact agent prompt

```text
Build the complete Combine homepage POC described in
docs/combine-homepage-brief.md. Treat the brief as the source of truth.

Use Astro and TypeScript. Render all content statically by default. Use React
only for the existing hero particle simulation. Do not hydrate the full page.

The hero simulation belongs only to the hero. Fade it out at the boundary; do
not keep it as a persistent page background. Add a static reduced-motion
fallback and stop canvas work when hidden or offscreen.

Use Host Grotesk. Use black, warm white, neutral gray, Combine Plum #782441, and
restrained cyan used only as a signal color. Centralize values as tokens.

Build all eight homepage sections, typed local content collections, semantic
HTML, responsive layouts, accessibility behavior, SEO metadata,
Organization/WebSite JSON-LD, sitemap groundwork, and RSS groundwork.

Use meaningful inline SVG or wireframe stand-ins where final imagery is absent.
Do not fabricate logos, testimonials, metrics, awards, or client claims.

Avoid generic AI-page patterns: no persistent animation, scroll-jacking,
animation on every section, logo marquee, rounded-card wall, fake terminal,
generic AI imagery, or slogan-heavy copy.

Before completing, verify:
- static build passes
- content exists without client JavaScript
- only justified islands hydrate
- reduced motion works
- keyboard navigation works
- headings are logical
- no horizontal overflow at 360, 390, 768, 1024, 1440, or 1920px
- no console errors
- README explains setup, content editing, architecture, and CMS migration
```
