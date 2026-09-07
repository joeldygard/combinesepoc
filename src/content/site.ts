import type { NavItem } from './types'

export type RouteId =
  | 'home'
  | 'services'
  | 'projects'
  | 'build'
  | 'products'
  | 'insights'
  | 'company'
  | 'contact'

export type RouteDefinition = {
  id: RouteId
  label: string
  path: string
  title: string
  description: string
}

/**
 * Route metadata is kept independent from the browser. An SSG or SSR entry
 * point can use the same table to choose a page, title, canonical URL and
 * navigation state without importing client-only code.
 */
export const routes: Record<RouteId, RouteDefinition> = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    title: 'Combine: AI for the physical world',
    description:
      'Combine builds AI for physical systems, where physics, safety and people set the requirements.',
  },
  services: {
    id: 'services',
    label: 'Services',
    path: '/services/',
    title: 'Services | Combine',
    description:
      'Fixed-price ways to assess the opportunity, audit the data and start with a complete industrial AI team.',
  },
  projects: {
    id: 'projects',
    label: 'Projects',
    path: '/projects/',
    title: 'Projects | Combine',
    description:
      'AI, control and software projects for water, ports, rail infrastructure and marine research.',
  },
  build: {
    id: 'build',
    label: 'How we build',
    path: '/ai-for-the-physical-world/',
    title: 'How we build AI for physical systems | Combine',
    description:
      'Foundation models, machine learning, control engineering and software delivered as one traceable system.',
  },
  products: {
    id: 'products',
    label: 'Products',
    path: '/products/',
    title: 'Products | Combine',
    description:
      'Software owned and built by Combine, including Sympathy for Data.',
  },
  insights: {
    id: 'insights',
    label: 'Insights',
    path: '/insights/',
    title: 'Engineering notes | Combine',
    description:
      'Engineering notes about AI, controls and safety engineering for physical systems.',
  },
  company: {
    id: 'company',
    label: 'Company',
    path: '/company/',
    title: 'Company | Combine',
    description:
      'Combine is a control engineering and AI company with offices in Göteborg, Malmö and Linköping.',
  },
  contact: {
    id: 'contact',
    label: 'Contact',
    path: '/contact/',
    title: 'Talk to an engineer | Combine',
    description:
      'Talk to a Combine engineer about the operation, data or decision that needs to improve.',
  },
}

export const site = {
  name: 'Combine',
  legalName: 'Combine Control Systems AB',
  url: 'https://combine.se',
  locale: 'en_GB',
  email: 'contact@combine.se',
  phone: '+46 31 797 10 12',
  careersUrl: 'https://combine.teamtailor.com/',
  address: {
    street: 'Västra Hamngatan 8',
    postalCode: '411 17',
    city: 'Göteborg',
    country: 'SE',
  },
  offices: ['Göteborg', 'Malmö', 'Linköping'],
  founded: '2002',
  social: [
    'https://www.linkedin.com/company/combine/',
    'https://www.facebook.com/combinesweden',
    'https://www.instagram.com/combinecontrolsystems/',
  ],
} as const

export const primaryNav: (NavItem & { route?: RouteId })[] = [
  { label: 'Services', href: routes.services.path, route: 'services' },
  { label: 'Projects', href: routes.projects.path, route: 'projects' },
  { label: 'How we build', href: routes.build.path, route: 'build' },
  { label: 'Products', href: routes.products.path, route: 'products' },
  { label: 'Insights', href: routes.insights.path, route: 'insights' },
  { label: 'Career', href: site.careersUrl },
]

export const navCta = {
  label: 'Talk to an engineer',
  href: routes.contact.path,
  route: 'contact' as const,
}

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'Work with us',
    items: [
      { label: 'Services', href: routes.services.path },
      { label: 'Projects', href: routes.projects.path },
      { label: 'How we build', href: routes.build.path },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'Products', href: routes.products.path },
      { label: 'Insights', href: routes.insights.path },
      { label: 'Company', href: routes.company.path },
      { label: 'Careers', href: site.careersUrl },
    ],
  },
  {
    heading: 'Contact',
    items: [
      { label: site.email, href: `mailto:${site.email}` },
      { label: site.phone, href: 'tel:+46317971012' },
    ],
  },
]

export const hero = {
  headline: 'AI for the physical world',
  support: 'Where physics, safety and people set the requirements.',
  statement: 'We build AI for physical systems.',
  body:
    'For two decades we have built robust control systems for safety-critical environments in defence, automotive, medtech and critical infrastructure. Machine learning extended what we could do. Modern AI is expanding it further.',
  primaryCta: navCta,
  secondaryCta: { label: 'See our projects', href: routes.projects.path },
} as const

export const serviceEntryPoints = [
  {
    eyebrow: 'Where to start',
    heading: "You've got the data and the mandate. What you don't have is a year.",
    body: 'Five hires, and a year before you know whether it was worth it.',
  },
  {
    eyebrow: 'From pilot to production',
    heading: 'The pilot impressed everyone. Then it stopped there.',
    body:
      'We build the rest: the data plumbing, the deployment and the interface that turn a working model into something people use every day.',
  },
  {
    eyebrow: 'Control and optimisation',
    heading: "You're paying for capacity you can't reach.",
    body:
      'Control engineering and forecasting applied to processes that cost too much energy, run below capacity or fail without warning.',
  },
  {
    eyebrow: 'Safety-critical systems',
    heading: "Nobody will sign off on a system that can't be predicted.",
    body:
      'We keep the learning parts out of the path that has to behave the same way every time.',
  },
] as const

export const stackLayers = [
  {
    name: 'Foundation models',
    use: 'Perception, forecasting, planning',
  },
  {
    name: 'Classical machine learning',
    use: 'Anomaly detection and optimisation',
  },
  {
    name: 'Control engineering',
    use: 'Model predictive control, state estimation, adaptive control',
  },
  {
    name: 'Software and systems',
    use: 'Data engineering, embedded, PLC, integration',
  },
] as const

/*
 * The project list lives in content/cases.ts now, as the normalized CaseStudy
 * model. It was duplicated here as a flat title/client/industry triple, which
 * is exactly the drift the note at the top of content/types.ts warns about:
 * two sources for one dataset, and the richer one unused.
 */

export const proof = {
  eyebrow: "What you're hiring",
  metrics: [
    { value: '~40', label: 'Engineers', text: false },
    { value: '~20%', label: 'Hold a PhD', text: false },
    { value: '2002', label: 'Founded', text: false },
    // Not a number, so it is not set as one. See .proof-grid__metric--text.
    { value: '9001 · 14001', label: 'ISO certified', text: true },
  ],
  infrastructure:
    'On-premise compute for model training, including air-gapped environments.',
} as const

export const services = {
  headline: 'We start small, and on a fixed price.',
  startingPoint: {
    eyebrow: 'Where to start',
    heading: "You've got the data and the mandate. What you don't have is a year.",
    body:
      "Five hires, and a year before you know whether it was worth it. Starting with us takes one decision, and you can stop after the audit.",
  },
  starts: [
    {
      eyebrow: 'Workshop · fixed price',
      title: 'A day in your office.',
      body:
        "AI for decision makers: what AI is, what your data allows, and what you don't need to do yourselves.",
    },
    {
      eyebrow: 'Audit · fixed price',
      title: 'Before you commit to anything.',
      body:
        "A data audit: what you have, what's missing, and whether it's worth continuing.",
    },
    {
      eyebrow: 'Embedded team',
      title: 'Nothing to recruit.',
      body:
        'The AI Excellence Team arrives with every role and the infrastructure already in place, so there is no function to build before the work can start.',
    },
  ],
  engagements: [
    {
      title: 'Projects and partnerships',
      body:
        'We take responsibility for the outcome, from a defined scope to a long-term development partnership.',
    },
    {
      title: 'Engineers in your team',
      body:
        'Senior specialists working inside your organisation, on your systems and under your process.',
    },
  ],
} as const

export const build = {
  headline: 'Most AI works with text and images.',
  support: 'Ours works with pumps, vehicles, production lines and power.',
  intro:
    "The difference is not the model. It's everything underneath it: the sensors it reads, the controller it hands off to, and the physical limits neither may cross.",
  origin: {
    eyebrow: 'Where we come from',
    heading: 'We added AI to a control engineering company, not the other way round.',
    body:
      'Two decades in defence, automotive, medtech and critical infrastructure, where a wrong output has a physical consequence.',
  },
  traceability: {
    eyebrow: 'Traceability',
    heading: 'The answer has to exist inside the system.',
    body:
      'Inputs, configuration, model versions and outputs stay connected, so a result from two years ago can be found and repeated.',
  },
  platform: {
    eyebrow: 'Combine Technology Platform',
    heading: 'Reproducible by construction.',
    paragraphs: [
      "Our own platform covers the whole chain from raw data to deployed model: lineage, versioning, a model registry, experiment history and drift detection. We don't start from an empty repository.",
      'It runs on premise on our own compute infrastructure, so training and processing stay inside hardware we control rather than on a public cloud.',
      'Every result can be rebuilt from its inputs, which is what makes a system reviewable, maintainable and still trustworthy after the people who built it have moved on.',
    ],
  },
  rarity: {
    eyebrow: 'AI and controls',
    heading: 'AI specialists reach for physics late. Engineering firms treat AI as an add-on.',
    body:
      'We work across all four layers, with roughly one in five of our engineers holding a PhD.',
  },
} as const

export const products = {
  headline: 'We are not only a services company. We build and own software.',
  sympathy: {
    eyebrow: 'Sympathy for Data',
    heading: 'Data analysis you can hand to an auditor.',
    body:
      'A no-code workbench for measurement and process data where any result can be traced back and re-run years later, running on your own machines.',
    cta: { label: 'Explore Sympathy', href: 'https://sympathyfordata.com/' },
  },
} as const

export const finalCta = {
  eyebrow: 'What comes next',
  headline: "Tell us what isn't working.",
  support:
    'Start with the operation, the data or the decision that needs to improve.',
  primaryCta: navCta,
  secondaryCta: {
    label: 'Read our engineering notes',
    href: routes.insights.path,
  },
  email: site.email,
} as const
