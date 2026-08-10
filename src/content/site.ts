import type { NavItem } from './types'

/*
 * All homepage copy lives here, not scattered through components.
 *
 * Every figure and project detail restates something Combine already publishes;
 * see README → "What is not real" for provenance and for the few claims that
 * come from internal knowledge rather than a public page.
 */

export const site = {
  name: 'Combine',
  url: 'https://combine.se',
  locale: 'en_GB',
  email: 'contact@combine.se',
  phone: '+46 31 42 10 60',
  address: {
    street: 'Västra Hamngatan 8',
    postalCode: '411 17',
    city: 'Göteborg',
    country: 'SE',
  },
  founded: '2002',
  social: [
    'https://www.linkedin.com/company/combine/',
    'https://www.facebook.com/combinesweden',
    'https://www.instagram.com/combinecontrolsystems/',
  ],
} as const

/*
 * Anchors point only at sections this page actually has. Everything else links
 * to the live page, so nothing here is a dead link and the homepage stays a
 * short route into the deeper site rather than a summary of all of it.
 */
export const primaryNav: NavItem[] = [
  { label: 'Platform', href: '#platform' },
  { label: 'Expertise', href: 'https://combine.se/areas-of-expertise/' },
  { label: 'Work', href: '#work' },
  { label: 'Edge', href: 'https://combine.se/edge/' },
  { label: 'About', href: 'https://combine.se/about-us/' },
]

export const navCta: NavItem = { label: 'Talk to us', href: '#contact' }

/** Career belongs in the footer, not the homepage body. */
export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'Work with us',
    items: [
      { label: 'Areas of expertise', href: 'https://combine.se/areas-of-expertise/' },
      { label: 'Delivery platform', href: '#platform' },
      { label: 'Selected work', href: '#work' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'About', href: 'https://combine.se/about-us/' },
      { label: 'Edge', href: 'https://combine.se/edge/' },
      { label: 'Career', href: 'https://combine.teamtailor.com/' },
    ],
  },
  {
    heading: 'Contact',
    items: [
      { label: 'contact@combine.se', href: 'mailto:contact@combine.se' },
      { label: '+46 31 42 10 60', href: 'tel:+4631421060' },
    ],
  },
]

export const hero = {
  headline: 'Build intelligence into the system, not around it.',
  support:
    'We combine control engineering, data science and production software to move from raw operational data to tools people can rely on.',
  primaryCta: { label: 'See our work', href: '#work' },
  secondaryCta: { label: 'Talk to an engineer', href: '#contact' },
} as const

export const readiness = {
  eyebrow: 'FROM SOURCE TO USE',
  heading: 'Your data has somewhere to go.',
  support:
    'A defined route from source systems to an operational product means the work can begin with your context instead of an empty architecture.',
  input: {
    label: 'Customer input',
    title: 'Operational data',
    detail: 'Sensors · Logs · Video · Documents · System records',
  },
  stages: [
    {
      id: 'process',
      index: '01',
      title: 'Process with confidence',
      detail: 'Ingest, validate and preserve the history of every run.',
    },
    {
      id: 'understand',
      index: '02',
      title: 'Apply system knowledge',
      detail: 'Models, rules, simulation and optimization shaped to the operation.',
    },
    {
      id: 'connect',
      index: '03',
      title: 'Connect the product',
      detail: 'Services, APIs, identity and interface foundations working together.',
    },
    {
      id: 'operate',
      index: '04',
      title: 'Put it in people’s hands',
      detail: 'Monitoring, analysis and decisions in the daily workflow.',
    },
  ],
  closing:
    'The path is established; the valuable work is adapting it to the system, decisions and people around your data.',
} as const

export const platform = {
  eyebrow: 'ACCELERATOR + CTP',
  heading: 'A shorter route through the repeatable work.',
  support:
    'Two reusable engineering foundations carry the delivery machinery while the model, integration and workflow are shaped around your operation.',
  foundations: [
    {
      id: 'accelerator',
      index: '01',
      title: 'Accelerator',
      role: 'Data and model execution',
      detail:
        'A consistent route through ingestion and processing, with the information needed to inspect and reproduce a result.',
      parts: ['Ingest', 'Validate', 'Process', 'Record', 'Reproduce'],
    },
    {
      id: 'ctp',
      index: '02',
      title: 'CTP',
      role: 'Product and integration foundation',
      detail:
        'Established building blocks for the services and interfaces that turn project logic into a maintainable product.',
      parts: ['APIs', 'Identity', 'Dashboards', 'UI foundations'],
    },
  ],
  specific: {
    eyebrow: 'SHAPED FOR EACH OPERATION',
    heading: 'The parts that should be bespoke stay bespoke.',
    detail:
      'System models, rules, integrations and the working interface are developed around the customer’s constraints.',
    parts: ['Models', 'Rules', 'Simulation', 'Optimization', 'Operational workflows'],
  },
  traceability:
    'Inputs, configuration, processing steps and outputs remain connected, so a result can be inspected and reproduced later.',
  cta: {
    label: 'Explore the delivery platform',
    href: 'https://combine.se/blog/combine-technology-platform-the-way-to-quicker-and-better-maintained-projects/',
  },
} as const



/*
 * Company facts are the ones Combine publishes in its own site footer: founded
 * 2002, roughly 60 employees, HQ in Göteborg. The three area descriptions are
 * adapted from combine.se's own wording for each discipline.
 */
export const experience = {
  eyebrow: 'BUILT INTO THE METHOD',
  heading: 'What we learn in one demanding system strengthens the next.',
  support:
    'Since 2002, Combine has worked where control engineering, data science and embedded software meet. That accumulated judgement is carried forward in the checks, conventions and production foundations used on every build.',
  facts: [
    { value: '2002', label: 'founded' },
    { value: '60', label: 'engineers' },
    { value: 'Göteborg', label: 'one office' },
  ],
  practices: [
    {
      id: 'behaviour',
      index: '01',
      title: 'Begin with physical behaviour',
      detail:
        'Constraints, failure modes and measurable behaviour define what the data and models need to represent.',
      carriedInto: 'Project logic',
    },
    {
      id: 'evidence',
      index: '02',
      title: 'Keep the evidence connected',
      detail:
        'Validation and run history make it possible to understand how an output was produced and reproduce it later.',
      carriedInto: 'Accelerator',
    },
    {
      id: 'operation',
      index: '03',
      title: 'Design for daily operation',
      detail:
        'Deployment, integration and the working interface are considered with the model—not after it.',
      carriedInto: 'CTP + application',
    },
  ],
  disciplines: [
    {
      label: 'Control systems',
      href: 'https://combine.se/control-system-solutions/',
    },
    {
      label: 'Data science & AI',
      href: 'https://combine.se/data-science-ai-solutions/',
    },
    {
      label: 'Embedded systems',
      href: 'https://combine.se/embedded-systems-solutions/',
    },
  ] satisfies NavItem[],
} as const

export const work = {
  eyebrow: 'PROVEN IN OPERATION',
  heading: 'Different systems. Outcomes you can point to.',
  support:
    'Marine research, rail maintenance and wastewater operations each demanded a different solution—and the same commitment to making it useful in context.',
  cta: { label: 'See all work', href: 'https://combine.se/cases/' },
} as const


export const finalCta = {
  eyebrow: 'WHAT COMES NEXT',
  headline: 'Bring the next hard system into reach.',
  support:
    'Start with the operation, the data or the decision that needs to improve. We will help trace a credible path to something people can use.',
  primaryCta: { label: 'Start a conversation', href: 'mailto:contact@combine.se' },
  secondaryCta: { label: 'Read our engineering notes', href: 'https://combine.se/edge/' },
  email: 'contact@combine.se',
} as const
