import type { NavItem, StackLayer } from './types'

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
  headline: 'Build intelligence into the system — not beside it.',
  support:
    'We combine control engineering, data science and production software to move from raw operational data to tools people can rely on.',
  primaryCta: { label: 'See our work', href: '#work' },
  secondaryCta: { label: 'Talk to an engineer', href: '#contact' },
} as const

export const platform = {
  eyebrow: 'WHAT YOU INHERIT',
  heading: 'The pipeline is ready. You bring the data.',
  support:
    'Your data flows through Combine\'s modular pipeline with validation, auditability, and reproducibility built in to a bespoke solution for your system.',

  stack: [

    /* 
    "WE'RE READY"
    I want the first section to signal that the whole system is ready for the customer, all that's missing is the data.
    */

    {
      id: 'data',
      label: 'YOUR OPERATIONAL DATA',
      parts: ['Sensors', 'Logs', 'Video', 'Documents', 'System records'],
    },

    /*
    "WE'RE FAST"
    The second section gets into what makes Combine's pipeline fast: Accelerator and CTP
    */

    {
      id: 'accelerator',
      label: 'ACCELERATOR',
      parts: ['Ingest', 'Validate', 'Process', 'Record', 'Reproduce'],
      owned: true,
    },

    /*
    "BECAUSE WE'RE EXPERIENCED"
    The third section is about the experience Combine has in building systems that work, and how that experience is built into the pipeline.
    */

    {
      id: 'logic',
      label: 'PROJECT LOGIC',
      parts: ['Models', 'Rules', 'Simulation', 'Optimization'],
    },

    /*
    "JUST LOOK AT OUR RESULTS"
    The final sales section is about the results Combine has achieved for its customers in the past; Ocean Data, Redemptor, and Smart Water. 
    */
    {
      id: 'ctp',
      label: 'COMBINE TECHNOLOGY PLATFORM',
      parts: ['APIs', 'Authentication', 'Dashboards', 'Reusable UI components'],
      owned: true,
    },
    /* 
    "COME JOIN US ON THE EDGE"
    Call to action.
    */
    {
      id: 'application',
      label: 'YOUR APPLICATION',
      parts: ['Monitoring', 'Analysis', 'Decisions', 'Operational workflows'],
    },
  ] satisfies StackLayer[],

  /*
   * Traceability is a property of the processing layer, not a pipeline stage.
   * Worded as inspectable and reproducible rather than "auditable", which would
   * imply formal compliance certification.
   */
  traceability:
    'Each run records its inputs, configuration, processing steps and outputs, so a result can be inspected and reproduced later.',

  closing:
    'Only the two middle-and-outer layers are ours to reuse. The model, the integration and the workflow are yours, and they are where the project time goes.',
  cta: {
    label: 'How the platform works',
    href: 'https://combine.se/blog/combine-technology-platform-the-way-to-quicker-and-better-maintained-projects/',
  },
} as const



/*
 * Company facts are the ones Combine publishes in its own site footer: founded
 * 2002, roughly 60 employees, HQ in Göteborg. The three area descriptions are
 * adapted from combine.se's own wording for each discipline.
 */
export const experience = {
  eyebrow: 'SINCE 2002',
  heading: 'Two decades of systems that had to keep running.',
  support:
    'Combine has worked where control engineering, data science and embedded software meet since 2002. Sixty engineers in Göteborg — and the people who model the physical behaviour are the ones who write the production code.',
  facts: [
    { value: '2002', label: 'founded' },
    { value: '60', label: 'engineers' },
    { value: 'Göteborg', label: 'one office' },
  ],
  disciplines: [
    {
      id: 'control',
      title: 'Control Systems',
      detail:
        'Scalable, future-proof solutions built on a solid understanding of the mathematical and physical properties of your system.',
      href: 'https://combine.se/control-system-solutions/',
    },
    {
      id: 'data',
      title: 'Data Science & AI',
      detail:
        'Machine learning, edge AI, data engineering, advanced analytics and visualisation — from first model to production.',
      href: 'https://combine.se/data-science-ai-solutions/',
    },
    {
      id: 'embedded',
      title: 'Embedded Systems',
      detail:
        'The software services needed for a complete embedded system, designed for simplicity and ease of use.',
      href: 'https://combine.se/embedded-systems-solutions/',
    },
  ],
  links: [
    { label: 'Areas of expertise', href: 'https://combine.se/areas-of-expertise/' },
    { label: 'Engineering notes on Edge', href: 'https://combine.se/edge/' },
    { label: 'About Combine', href: 'https://combine.se/about-us/' },
  ] satisfies NavItem[],
} as const

export const work = {
  eyebrow: 'SELECTED WORK',
  heading: 'Systems we have put to work.',
  cta: { label: 'See all work', href: 'https://combine.se/cases/' },
} as const


export const finalCta = {
  eyebrow: 'GET IN TOUCH',
  headline: 'Bring us the system, data or decision that needs to work better.',
  support:
    'We can help determine what is needed—from better data and system understanding to a model, integration or complete operational application.',
  primaryCta: { label: 'Talk to an engineer', href: 'mailto:contact@combine.se' },
  secondary: 'contact@combine.se',
} as const
